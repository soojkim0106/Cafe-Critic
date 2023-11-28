from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db


class Park(db.Model, SerializerMixin):
    __tablename__ = 'parks'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    location = db.Column(db.String)

    def __repr__(self):
        return f'<Park {self.name}>'

class Neighborhood(db.Model, SerializerMixin):
    __tablename__ = "neighborhoods"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    def __repr__(self):
        return f'<Neighborhood {self.name}>'