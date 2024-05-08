#!/usr/bin/env python3

from flask import request, session, jsonify, render_template
from flask_restful import Resource
from functools import wraps
from werkzeug.exceptions import NotFound
from config import app, db, api

from models.user import User
from schemas.user_schema import user_schema

from config import app, db, api
from routes.auth.check_session import Me
from routes.cafe.cafes import Cafes
from routes.cafe.cafe_by_id import CafeById
from routes.comment.comments import Comments
from routes.comment.comment_by_id import CommentById
from routes.review.reviews import Reviews
from routes.review.review_by_id import ReviewById
from routes.user.users import Users
from routes.user.user_by_id import UserById
from routes.auth.google_auth import GoogleAuth


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
        error_message = str(e)
        if 'unique' in error_message:
            if 'UNIQUE constraint failed: users.username' in error_message:
                error_message = "Username already exists"
            if 'UNIQUE constraint failed: users.email' in error_message:
                error_message = "Email already exists"
        return jsonify({"error": error_message}), 422

@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.json
        user = User.query.filter_by(username=data.get("username")).first()
        if user and user.authenticate(data.get("password_hash")):
            session["user_id"] = user.id
            return user_schema.dump(user), 200
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



api.add_resource(Users, "/users")
api.add_resource(UserById,"/users/<int:id>")
api.add_resource(Me, "/me")
api.add_resource(Cafes, "/cafes")
api.add_resource(CafeById, "/cafes/<int:id>")
api.add_resource(Reviews, "/reviews")
api.add_resource(ReviewById, "/reviews/<int:id>")
api.add_resource(Comments, "/comments")
api.add_resource(CommentById, "/comments/<int:id>")
api.add_resource(GoogleAuth, "/googleauth")

#FRONTEND ROUTES
@app.route("/registration")
@app.route("/profile")
@app.route("/")
@app.route("/cafe")
@app.route("/cafe/<int:id>")
@app.route("/review")

def index(id=0):
    return render_template("index.html")

if __name__ == '__main__':
    app.run(port=5555, debug=True)

