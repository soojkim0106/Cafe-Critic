#!/usr/bin/env python3

# Standard library imports
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask import Flask, make_response, jsonify, request, session
from flask_cors import CORS
import os
from models import User, Stock, Portfolio, Expense, TotalExpense
from config import app, db, api

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.jsonify_compatibility = False
app.secret_key = 'Thisismysecretkey#48'

CORS(app)

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class ClearSession(Resource):
    def delete(self):
        session['user_id'] = None

        return {}, 204
    
api.add_resource(ClearSession, '/clear_session')

class Signup(Resource):
    def post(self):
        username = request.get_json()['newUsername']
        password = request.get_json()['newPassword']

        if username and password:
            new_user = User(username=username)
            new_user.password_hash = password
            db.session.add(new_user)
            db.session.commit()

            session['user_id'] = new_user.id

            return new_user.to_dict(), 201
        return {'error': '422 Unprocessable Entity'}, 422
    
api.add_resource(Signup, '/signup')

class CheckSession(Resource):
    def get(self):
        if session.get('user_id'):
            user = User.query.filter(User.id == session['user_id']).first()
            return user.to_dict(), 200
        else:
            return {}, 401
        
api.add_resource(CheckSession, '/check_session')

class GetCurrentUser(Resource):
    def get(self):
        if 'user_id' in session:
            current_user = User.query.get(session['user_id'])
            if current_user:
                return jsonify(current_user.to_dict()), 200
            return jsonify({'error': 'User not authenticated'}), 401

api.add_resource(GetCurrentUser, '/api/user')

class Login(Resource):
    def post(self):

        username = request.get_json()['username']
        password = request.get_json()['password']

        user = User.query.filter(User.username == username).first()

        if user.authenticate(password):

            session['user_id'] = user.id
            return user.to_dict(), 200

        return {'error': '401 Unauthorized'}, 401
    
api.add_resource(Login, '/login')


class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return {}, 204
api.add_resource(Logout, '/logout')

class Expenses(Resource):
    def get(self):
        if 'user_id' in session:
            user_id = session['user_id']
            expenses = [expense.to_dict(rules=('-users'))for expense in Expense.query.filter(Expense.user_id==user_id)]
            return make_response(expenses, 200)
        else:
            return make_response({'error':'Not allowed'}, 401)
    
    def post(self):
        fields = request.get_json()
        try:
            expense = Expense(
                name=fields['name'],
                description=fields['description'],
                cost=float(fields['cost']),
                user_id=fields['user_id'],
            )
            db.session.add(expense)
            db.session.commit()
            return make_response(expense.to_dict(), 201)
        except ValueError as e:
            return make_response({'error': e.__str__()}, 400)
        
api.add_resource(Expenses, '/expenses')

class ExpenseById(Resource):
    def patch(self, id):
        expense = Expense.query.filter(Expense.id==id).one_or_none()
        if expense is None:
            return make_response({'error':'Expense not found'}, 404)
        
        data = request.get_json()
        for field, value in data.items():
            if hasattr(expense, field):
                setattr(expense, field, value)
        
        db.session.commit()
        return make_response(expense.to_dict(), 202)
    
    def delete(self, id):
        expense = Expense.query.filter(Expense.id==id).one_or_none()
        if expense is None:
            return make_response({'error':'expense not found'}, 404)
        db.session.delete(expense)
        db.session.commit()
        return make_response({}, 204)
        
api.add_resource(ExpenseById, '/expenses/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

