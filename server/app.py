#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, g, session
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models.user import User
from models.cat import Cat
from models.adopt_foster import AdoptFoster

from schemas.user_schema import UserSchema
from schemas.cat_schema import CatSchema
from schemas.adopt_foster_schema import AdoptFosterSchema


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Cats(Resource):
    def get(self):
        try:
            cats = [cat.to_dict() for cat in Cat.query]
            return cats, 200
        
        except Exception as e:
            return {"error": str(e)}, 400    
        
class CatById(Resource):
    def get(self,id):
        try:
            cat = db.session.get(Cat, id)
            
            return cat.to_dict(), 200
        
        except Exception as e:
            return {"error": str(e)}, 400

# class User(Resource):
#     #! For ADMIN to look
#     def get(self):
#         pass


# class UserById(Resource):
#     def get(self,id):
#         pass
    
#     def patch(self,id):
#         pass
    
#     def delete(self,id):
#         pass

# @app.route("/signup", method=["POST"])
# def signup():
#     pass

# @app.route("/login", method=["POST"])
# def login():
#     pass

# @app.route("/logout", method=["DELETE"])
# def logout():
#     pass

# @app.route("/me", method=["GET"])
# def check_session():
#     pass

api.add_resource(Cats, "/cats")
api.add_resource(CatById, "/cats/<int:id>")
# api.add_resource(User, "/users")
# api.add_resource(UserById, "/users/<int:id>")

if __name__ == '__main__':
    app.run(port=5555, debug=True)

