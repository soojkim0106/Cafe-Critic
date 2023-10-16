from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    adoptions = db.relationship("Adoption", backref="user")

    serialize_rules = ("-adoptions.user",)

class Pet(db.Model, SerializerMixin):
    __tablename__ = "pets"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    adoptions = db.relationship("Adoption", backref="pet")

    serialize_rules = ("-adoptions.pet",)

class Adoption(db.Model, SerializerMixin):
    __tablename__ = "adoptions"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    pet_id = db.Column(db.Integer, db.ForeignKey("pets.id"))

    serialize_rules = ("-user.adoptions", "-pet.adoptions",)