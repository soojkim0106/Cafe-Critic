#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, g, session
from flask_restful import Resource
from functools import wraps

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

        id = request.view_args.get("id")
        record = db.session.get(path_dict.get(request.endpoint), id)
        key_name = "user" if request.endpoint == "userbyid" else "cat"
        setattr(g, key_name, record)
        
def login_required(func):
    @wraps(func)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return {"message": "You must be logged in!"}, 422
        return func(*args, **kwargs)
    return decorated_function

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Cats(Resource):
    def get(self):
        try:
            serialized_cats = cats_schema.dump(Cat.query)
            return serialized_cats, 200
        
        except Exception as e:
            return {"error": str(e)}, 400    
        
class CatById(Resource):
    @login_required
    def get(self,id):
        try:
            # cat = db.session.get(Cat, id)
            
            # return cat.to_dict(), 200
            return cat_schema.dump(g.cat), 200
        
        except Exception as e:
            return {"error": str(e)}, 400
    
    def patch(self,id):
        if g.cat:
            try:
                data = (request.json)
                
                updated_cat = cat_schema.load(data, instance=g.cat, partial=True)
                db.session.commit()
                return cat_schema.dump(updated_cat), 200
            except Exception as e:
                    db.session.rollback()
                    return {"error": str(e)}, 400
        else:
                return {"error": f"Cat not {id} found"}, 404
    
    def delete(self, id):
        try:
            if g.cat:
                db.session.delete(g.cat)
                db.session.commit()
                return {}, 204
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 404

        

    #! For ADMIN to look
class Users(Resource):
    def get(self):
        try:
            # users = [user.to_dict() for user in User.query]
            # return users, 200
            
            serialized_users = users_schema.dump(User.query)
            return serialized_users, 200
        
        except Exception as e:
            return {"error": str(e)}, 400


class UserById(Resource):
    def get(self,id):
        try:
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

@app.route("/signup", methods=["POST"])
def signup():
    try: 
        data = request.json
        user = User(username=data.get("username"), email=data.get("email"))
        user.password_hash = data.get("password")
        db.session.add(user)
        db.session.commit()
        session["user_id"] = user.id
        return user.to_dict(), 201
    
    except Exception as e:
        db.session.rollback()
        return {"message": str(e)}, 422

@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.json
        user = User.query.filter_by(username=data.get("username")).first()
        if user and user.authenticate(data.get("password")):
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
        raise e

@app.route("/me", methods=["GET"])
def check_session():
    try:
        if "user_id" in session:
            user = db.session.get(User, session.get("user_id"))
            return user.to_dict(), 200
        else:
            return {"message": "Please log in first!"}, 400
    except Exception as e:
        return {"error": str(e)}

api.add_resource(Cats, "/cats")
api.add_resource(CatById, "/cats/<int:id>")
api.add_resource(Users, "/users")
api.add_resource(UserById, "/users/<int:id>")

if __name__ == '__main__':
    app.run(port=5555, debug=True)

