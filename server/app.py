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

from schemas.user_schema import user_schema, users_schema
from schemas.cat_schema import cat_schema, cats_schema
from schemas.adopt_foster_schema import adopt_foster_schema, adopt_fosters_schema


# Views go here!

@app.before_request
def before_request():
    path_dict = {"userbyid": User, "catbyid": Cat}
    if request.endpoint in path_dict:
        id = request.view.arg.get("id")
        record = db.session.get(path_dict.get(request.endpoint), id)
        key_name = "user" if request.endpoint == "uerbyid" else "cat"
        setattr(g, key_name, record)

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Cats(Resource):
    def get(self):
        try:
            # cats = [cat.to_dict() for cat in Cat.query]
            serialized_cats = cats_schema.dump(Cat.query)
            return serialized_cats, 200
        
        except Exception as e:
            return {"error": str(e)}, 400    
        
class CatById(Resource):
    def get(self,id):
        try:
            # cat = db.session.get(Cat, id)
            
            # return cat.to_dict(), 200
            return cat_schema.dump(g.cat), 200
        
        except Exception as e:
            return {"error": str(e)}, 400

    #! For ADMIN to look
class Users(Resource):
    def get(self):
        try:
            users = [user.to_dict() for user in User.query]
            return users, 200
        except Exception as e:
            return {"error": str(e)}, 400


class UserById(Resource):
    def get(self,id):
        try:
            user = db.session.get(User, id)
            return user.to_dict(), 200
        except Exception as e:
            return {"error": str(e)}, 400
    
    def patch(self,id):
        if user := db.session.get(User, id):
            try:
                data = request.json
                for attr, value in data.items():
                    setattr(user, attr, value)
                db.session.commit()
                return user.to_dict(), 202
            except Exception as e:
                db.session.rollback()
                return {"error": str(e)}, 400
        else:
            return {"error": "User not found"}, 404
    
    def delete(self,id):
        try:
            user = db.session.get(User, id)
            db.session.delete(user)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 404

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
api.add_resource(Users, "/users")
api.add_resource(UserById, "/users/<int:id>")

if __name__ == '__main__':
    app.run(port=5555, debug=True)

