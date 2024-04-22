from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from config import flask_bcrypt, db

class Review(db.Model, SerializerMixin):
    __tablename__ = "reviews"
    
    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    cafe_id = db.Column(db.Integer, db.ForeignKey("cafes.id"))
    body = db.Column(db.String, nullable=False)
    good_description = db.Column(db.String, nullable=False)
    bad_description = db.Column(db.String, nullable=False)
    star_rating = db.Column(db.String, nullable=False)
    liked = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())