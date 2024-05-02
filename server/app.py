#!/usr/bin/env python3

from flask import request, g, session, send_file
from flask_restful import Resource
from functools import wraps
from werkzeug.exceptions import NotFound
import os
from config import app, db, api

from models.user import User
from schemas.user_schema import user_schema, users_schema

from config import app, db, api, oauth, url_for, redirect, google
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
# from routes.auth.google_auth import GoogleAuth


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
        if 'unique' not in str(e):
            return {"message": str(e)}, 422
        if 'UNIQUE constraint failed: users.username' in str(e):
            return {"message": "Username already exists"}, 400
        if 'UNIQUE constraint failed: users.email' in str(e):
            return {"message": "Email already exists"}, 400

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

# @app.route('/reviews/<int:id>/likes', methods=['GET'])
# def get_likes(id):
#     review = Reviews.query.get(id)
#     if review is None:
#         return ({'error': 'Review not found'}), 404
#     return ({'likes': review.likes}), 200
# @app.route('/googleauth')
# def googleauth():
#     google = oauth.create_client('google')
#     redirect_uri = url_for('authorize', _external=True)
#     return google.authorize_redirect(redirect_uri)

@app.route('/authorize')
def authorize():
    google = oauth.create_client('google')  # create the google oauth client
    token = google.authorize_access_token()  # Access token from google (needed to get user info)
    resp = google.get('userinfo')  # userinfo contains stuff u specificed in the scrope
    user_info = resp.json()
    user = oauth.google.userinfo()  # uses openid endpoint to fetch user info
    # session['username'] = user_info['username']
    session['email'] = user_info['email']
    return redirect('/')

@app.route("/")
def hello_world():
    email = dict(session).get('email')
    # username = dict(session).get('username')
    return f"Hello, {email}!"

@app.route('/googleauthlogout')
def googleauthlogout():
    for key in list(session.keys()):
        session.pop(key)
    return redirect('/')


api.add_resource(Users, "/users")
api.add_resource(UserById,"/users/<int:id>")
api.add_resource(Me, "/me")
api.add_resource(Cafes, "/cafes")
api.add_resource(CafeById, "/cafes/<int:id>")
api.add_resource(Reviews, "/reviews")
api.add_resource(ReviewById, "/reviews/<int:id>")
# api.add_resource(ReviewById, "/reviews/<int:id>/likes")
api.add_resource(Comments, "/comments")
api.add_resource(CommentById, "/comments/<int:id>")
api.add_resource(GoogleAuth, "/googleauth")

if __name__ == '__main__':
    app.run(port=5555, debug=True)

