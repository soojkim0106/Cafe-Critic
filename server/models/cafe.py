from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from config import flask_bcrypt, db
import re

class Cafe(db.Model, SerializerMixin):
    __tablename__ = "cafes"
    
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable=False, unique=True)
    address = db.Column(db.String, nullable=False, unique=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())