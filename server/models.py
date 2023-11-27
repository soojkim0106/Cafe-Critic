from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!
class User(db.Model,SerializerMixin):
    __tablename__='users'

    id=db.Column(db.Integer,primary_key=True)
    name=db.Column(db.String)
    membership_type=db.Column(db.String)

class Gym_location(db.Model,SerializerMixin):
    __tablename__='gym locations'

    id=db.Column(db.Integer,primary_key=True)
    Location=db.Column(db.String)
    number_of_machines=db.Column(db.Integer)
