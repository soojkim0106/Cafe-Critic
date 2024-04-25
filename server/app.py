#!/usr/bin/env python3

from flask import request, g, session, send_file
from flask_restful import Resource
from functools import wraps
from werkzeug.exceptions import NotFound
import os
from config import app, db, api

from models.user import User
from models.review import Review
from models.cafe import Cafe
from models.comment import Comment

from schemas.cafe_schema import cafe_schema, cafes_schema
from schemas.comment_schema import comment_schema, comments_schema
from schemas.review_schema import review_schema, reviews_schema
from schemas.user_schema import user_schema, users_schema


# Views go here!

@app.errorhandler(NotFound)
def not_found(error):
    return {"error": error.description}, 404

@app.before_request
def before_request():
    path_dict = {"userbyid": User, "cafebyid": Cafe, "reviewbyid": Review}
    if request.endpoint in path_dict:

        id = request.view_args.get("id")
        record = db.session.get(path_dict.get(request.endpoint), id)
        key_name = "user" if request.endpoint == "userbyid" else "cafe"
        if request.endpoint == 'commentbyid':
            key_name = "comment"
        elif request.endpoint == 'reviewbyid':
            key_name = "review"
        setattr(g, key_name, record)
        
def login_required(func):
    @wraps(func)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return {"message": "Denied! You must log in first!"}, 422
        return func(*args, **kwargs)
    return decorated_function

@app.route("/images/<path:image_path>")
def get_image(image_path):
    image_folder = './cafe_logo'
    full_path = os.path.join(image_folder, image_path)
    return send_file(full_path, mimetype='image/jpeg, image/png') 


class Users(Resource):
    def get(self):
        try:
            serialized_users = users_schema.dump(User.query)
            return serialized_users, 200
        
        except Exception as e:
            return {"error": str(e)}, 400
        
    def post(self):
        try:
            data = (
                request.get_json()
            )
            user = user_schema.load(
                data
            )
            db.session.add(user)
            db.session.commit()  
            return user_schema.dump(user), 201
        except Exception as e:
            db.session.rollback()
            return {"message": str(e)}, 422
class UserById(Resource):
    @login_required
    def get(self,id):
        try:
            print(g.user)
            print(user_schema.dump(g.user))
            if g.user:
                return user_schema.dump(g.user), 200
        except Exception as e:
            return {"error": str(e)}, 400
    
    def patch(self,id):
        if g.user:
            try:
                data = (request.json)
                
                updated_user = user_schema.load(data, instance=g.user, partial=True)
                db.session.commit()
                return user_schema.dump(updated_user), 200
            except Exception as e:
                    db.session.rollback()
                    return {"error": str(e)}, 400
        else:
                return {"error": f"User not {id} found"}, 404
    
    def delete(self,id):
        try:
            if g.user:
                db.session.delete(g.user)
                db.session.commit()
                return {}, 204
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 404
        
class Me(Resource):
    @login_required
    def get(self):
        try:
            if "user_id" in session:
                user = db.session.get(User, session.get("user_id"))
                return user.to_dict(), 200
            else:
                return {"message": "Please log in first!"}, 400
        except Exception as e:
            return {"error": str(e)}
    
    # def patch(self):
    #     if "user_id" in session and g.user:
    #             try:
    #                     data = (request.json)
    #                     updated_user = user_schema.load(data, instance=g.user, partial=True)
    #                     db.session.commit()
    #                     return user_schema.dump(updated_user), 200
    #             except Exception as e:
    #                     db.session.rollback()
    #                     return {"error": str(e)}, 400
    #     else:
    #             return {"error": f"User not found"}, 404
    
    # def delete(self):
    #     try:
    #         if "user_id" in session and g.user:
    #             db.session.delete(g.user)
    #             db.session.commit()
    #             return {}, 204
    #     except Exception as e:
    #         db.session.rollback()
    #         return {"error": str(e)}, 404

@app.route("/signup", methods=["POST"])
def signup():
    try: 
        data = request.json
        user = user_schema.load(data, partial=True)
        db.session.add(user)
        db.session.commit()
        session["user_id"] = user.id
        return user_schema.dump(user), 201
    
    except Exception as e:
        db.session.rollback()
        return {"message": str(e)}, 422

@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.json
        user = User.query.filter_by(username=data.get("username")).first()
        if user and user.authenticate(data.get("password_hash")):
            session["user_id"] = user.id
            return user.to_dict(), 200
        else:
            return {"message": "You have the wrong username or password"}, 422
        
    except Exception as e:
        return {"error": str(e)}, 422

@app.route("/logout", methods=["DELETE"])
def logout():
    try:
        if "user_id" in session:
            del session["user_id"]
        return {}, 204
    except Exception as e:
        db.session.rollback()
        raise e
class Cafes(Resource):
    @login_required
    def get(self):
        try:
            serialized_cafes = cafes_schema.dump(Cafe.query)
            return serialized_cafes, 200
        except Exception as e:
            return {"error": str(e)}, 400
        
class CafeById(Resource):
    def get(self,id):
        try:
            return cafe_schema.dump(g.cafe), 200
        
        except Exception as e:
            return {"error": str(e)}, 400
        
class Review(Resource):
    def get(self):
        try:
            serialized_reviews = reviews_schema.dump(Review.query)
            return serialized_reviews, 200
        except Exception as e:
            return {"error": str(e)}, 400
    
    def post(self):
        try:
            data = request.json
            user_id = session.get('user_id')
            cafe_id = data.get('cafe_id')
            review = Review(user_id=user_id, cafe_id=cafe_id)
            db.session.add(review)
            db.session.commit()
            return review_schema.dump(review), 201
        except Exception as e:
            db.session.rollback()
            return {"message": str(e)}, 422

class ReviewById(Resource):
    def patch(self,id):
        if g.review:
            try:
                data = request.json
                
                updated_review = review_schema.load(data, instance=g.review, partial=True)
                db.session.commit()
                return review_schema(updated_review), 200
            except Exception as e:
                db.session.rollback()
                return {"error": str(e)}, 404
        else:
            return {"error": F"Review {id} not found"}
    
    def delete(self):
        try:
            if g.review:
                db.session.delete(g.review)
                db.session.commit()
                return {}, 204
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 404

class Comments(Resource):
    @login_required
    def post(self):
        try:
            data = request.json
            comment = comment_schema.load(data)
            db.session.add(comment)
            db.session.commit()
            return comment_schema.dump(comment), 201
        except Exception as e:
            db.session.rollback()
            return {"message": str(e)}, 422

class CommentById(Resource):
    @login_required
    def patch(self,id):
        if g.comment:
            try:
                data = request.json
                updated_comment = comment_schema.load(data, instance=g.comment, partial=True)
                db.session.commit()
                return comment_schema.dump(updated_comment), 200
            except Exception as e:
                db.session.rollback()
                return {"error": str(e)}, 400
        else:
            return {"error": f"Comment {id} not found"}, 404
    
    def delete(self, id):
        try:
            if g.comment:
                db.session.delete(g.comment)
                db.session.commit()
                return {}, 204
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 404

api.add_resource(Users, "/users")
api.add_resource(UserById,"/users/<int:id>")
api.add_resource(Me, "/me")
api.add_resource(Cafes, "/cafes")
api.add_resource(CafeById, "/cafes/<int:id>")
api.add_resource(Review, "/reviews")
api.add_resource(ReviewById, "/reviews/<int:id>")
api.add_resource(Comments, "/comments")
api.add_resource(CommentById, "/comments/<int:id>")

if __name__ == '__main__':
    app.run(port=5555, debug=True)

