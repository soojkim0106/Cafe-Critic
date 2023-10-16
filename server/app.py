#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api

# Add your model imports
from models import Pet, User, Adoption

# Views go here!


@app.route("/")
def index():
    return "<h1>getPet Adoption List</h1>"


class UserList(Resource):
    def get(self):
        return_list = [u.to_dict() for u in User.query.all()]
        return make_response(return_list, 200)

    def post(self):
        data = request.get_json()
        try:
            user_hold = User(fname=data["fname"], lname=data["lname"])
            db.session.add(user_hold)
            db.session.commit()
            return make_response(user_hold.to_dict(), 201)
        except:
            return make_response("Failed to create user", 400)


api.add_resource(UserList, "/users")


class PetList(Resource):
    def get(self):
        rtrn_list = [p.to_dict() for p in Pet.query.all()]
        return make_response(rtrn_list, 200)

    def post(self):
        data = request.get_json()
        try:
            pet_hold = Pet(name=data["name"], type=data["type"], breed=data["breed"])
            db.session.add(pet_hold)
            db.session.commit()
            return make_response(pet_hold.to_dict(), 201)
        except:
            return make_response("Failed to create pet", 400)


api.add_resource(PetList, "/pets")


class AdoptionList(Resource):
    def get(self):
        rtrn_list = [a.to_dict() for a in Adoption.query.all()]
        return make_response(rtrn_list, 200)
    
    def post(self):
        data = request.get_json()
        try:
            adopt_hold = Adoption(user_id=int(data["user_id"]), pet_id=int(data["pet_id"]))
            db.session.add(adopt_hold)
            db.session.commit()
            return make_response(adopt_hold.to_dict(), 201)
        except:
            return make_response("Failed to create adoption", 400)

api.add_resource(AdoptionList, "/adoptions")


class UserByID(Resource):
    def get(self, id):
        user_hold = User.query.filter_by(id=id).one_or_none()
        if not user_hold:
            return make_response("Boi not found", 404)
        return make_response(user_hold.to_dict(), 200)
    def delete(self, id):
        user_hold = User.query.filter_by(id=id).one_or_none()
        if not user_hold:
            return make_response("Boi not found", 404)
        db.session.delete(user_hold)
        db.session.commit()
        return make_response("Successful delete",204)


api.add_resource(UserByID, "/users/<int:id>")


class PetByID(Resource):
    def get(self, id):
        pet_hold = Pet.query.filter_by(id=id).one_or_none()
        if not pet_hold:
            return make_response("Good boi not found", 404)
        return make_response(pet_hold.to_dict(), 200)


api.add_resource(PetByID, "/pets/<int:id>")


class AdoptionByID(Resource):
    def get(self, id):
        adopt_hold = Adoption.query.filter_by(id=id).one_or_none()
        if not adopt_hold:
            return make_response("Every good boi deserves a good home", 404)
        return make_response(adopt_hold.to_dict(), 200)

api.add_resource(AdoptionByID, "/adoptions/<int:id>")

if __name__ == "__main__":
    app.run(port=5555, debug=True)
