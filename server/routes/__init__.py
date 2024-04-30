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

@app.errorhandler(NotFound)
def not_found(error):
    return {"error": error.description}, 404

@app.before_request
def before_request():
    path_dict = {"userbyid": User, "cafebyid": Cafe, "reviewbyid": Review, "commentbyid": Comment}
    if request.endpoint in path_dict:
        id = request.view_args.get("id")
        record = db.session.get(path_dict.get(request.endpoint), id)
        key_name_dict = {"userbyid": "user", "cafebyid": "cafe", "reviewbyid": "review", "commentbyid": "comment"}

        key_name = key_name_dict.get(request.endpoint)
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