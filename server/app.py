#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Book, Recipe, recipe_book


# Views go here!

@app.route('/')
def index():
    return '<h1>Phase 4 Project Server</h1>'

class Signup(Resource):

    def post(self):
        username = request.get_json().get('username')
        password = request.get_json().get('password')

        if username and password and not User.query.filter(User.username == username).first():
            new_user = User(username = username)
            new_user.password_hash = password
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id
            return new_user.to_dict(rules=('books',)), 201
        
        return {'error': '422 Unprocessable Entity'}, 422
    

class Login(Resource):

    def post(self):

        data = request.get_json()
        username = data['username']
        password = data['password']

        user = User.query.filter(User.username == username).first()

        if user:
            if user.authenticate(password):
                session['user_id'] = user.id
                return user.to_dict(), 200
        
        return {'error': "Unauthorized"}, 401

class CheckSession(Resource):

    def get(self):
        if session.get('user_id'):
            user = User.query.filter(User.id == session.get('user_id')).first()
            return user.to_dict(), 200
        return {'error': 'Unauthorized'}, 401

class Logout(Resource):

    def delete(self):

        if session.get('user_id'):
            session['user_id'] = None
            return {}, 204
        
        return {'error': 'Unauthorized'}, 401
    
class Books(Resource):

    def get(self):

        if session.get('user_id'):
            books = Book.query.filter(Book.user_id == session['user_id']).all()
            if books:
                return [b.to_dict() for b in books], 200
            return {'error': 'books not found'}, 404
        return {'error': 'Unauthorized'}, 401
    
    def post(self):

        if session.get('user_id'):
            try:
                new_book = Book(
                    category = request.get_json()['category'],
                    user_id = session['user_id']
                )
                db.session.add(new_book)
                db.session.commit()
                return new_book.to_dict(), 201
            except IntegrityError:
                return {'error': 'Could not create book'}, 422
        return {'error': 'Unauthorized'}, 401
    
class BookById(Resource):

    def get(self, id):

        if session.get('user_id'):
            book = Book.query.filter(Book.id == id and Book.user_id == session['user_id']).first()
            if book:
                return book.to_dict(rules = ('recipes')), 200
            return {'error': 'Book not found'}, 404
        return {'error': 'Unauthorized'}, 401
    
    def patch(self, id):

        if session.get('user_id'):
            book = Book.query.filter(Book.user_id == session['user_id'] and Book.id == id).first()
            if book:
                setattr(book, 'category', request.get_json()['category'])
                db.session.add(book)
                db.session.commit()
                return book.to_dict(), 202
            return {'error': 'Book not found'}, 404
        return {'error': 'Unauthorized'}, 401
    
    def delete(self, id):

        if session.get('user_id'):
            book = Book.query.filter(Book.user_id == session['user_id'] and Book.id == id).first()
            if book:
                db.session.delete(book)
                db.session.commit()
                return {'Message': "Book deleted"}, 204 
            return {'error': 'List not found'}, 404
        return {'error': 'Unauthorized'}, 401
    
    def post(self, book_id):

        if session.get('user_id'): 
            book = Book.query.filter(Book.id == book_id)
            recipe = Recipe.query.filter(Recipe.id == request.get_json()['recipe_id']).first()
            if book and recipe:
                if recipe not in book.recipes:
                    book.recipes.append(recipe)
                    db.session.commit()
                    return book.to_dict(rules=('recipes',)), 201
                return {'error': 'Recipe already in book'}, 400
            return {'error': 'book or recipe not found'}, 404
        return {'error': 'unauthorized'}, 401

    
class Recipes(Resource):

    def get(self):

        if session.get('user_id'):
            recipes = Recipe.query.all()
            if recipes:
                return [r.to_dict(rules=('-description')) for r in recipes], 200
            return {'error': 'no recipes found'}
        
        return {'error': 'Unauthorized'}, 401
    
    def post(self):

        if session.get('user_id'):

            try:
                new_recipe = Recipe(
                    description = request.get_json()['description'],
                    image = request.files['image'],
                    user_id = session['user_id']
                )
                db.session.add(new_recipe)
                db.session.commit()
                return new_recipe.to_dict(), 201
            except IntegrityError:
                return {'error': 'Could not create recipe'}, 422
            
# get specific recipe belonging to a book that belongs to a user   
class RecipeByID(Resource):

    def get(self, book_id, recipe_id):

        if session.get('user_id'):
            recipe = Recipe.query.filter(Recipe.books.id == book_id and Recipe.id == recipe_id).first()
            if recipe:
                return recipe.to_dict(rules=('description',)), 200
            return {'error': 'Recipe not found'}, 404
        return {'error': 'Unauthorized'}, 401

    
    def delete(self, book_id, recipe_id):

        if session.get('user_id'): 
            book = Book.query.filter(Book.id == book_id)
            recipe = Recipe.query.filter(Recipe.books.id == book_id and Recipe.id == recipe_id).first()
            if book and recipe:
                if recipe in book.recipes:
                    book.recipes.remove(recipe)
                    db.session.commit()
                    return book.to_dict(rules=('recipes')), 204
                return {'error': 'recipe not in book'}, 400
            return {'error': 'book or recipe not found'}, 404
        return {'error': 'Unauthorized'}, 401


api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Books, '/books', endpoint='books')
api.add_resource(BookById, '/book/<int:id>')
api.add_resource(RecipeByID, '/book/<int:book_id>/recipe/<int:recipe_id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

