from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from config import db
from config import flask_bcrypt
import re

class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    email = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    # relationship
    
    cafes = association_proxy("reviews", "cafe")
    reviews = db.relationship("Review", back_populates="user", cascade="all, delete-orphan")
    comments = db.relationship("Comment", back_populates="user", cascade="all, delete-orphan")
    
    # serialization
    
    serialize_rules = ("-_password_hash", "-reviews.user", "-comments.user", )
    
    def __repr__(self):
        return f"<User {self.id}: {self.username} | {self.email}>"
    
    # password hashing
    @hybrid_property
    def password_hash(self):
        raise AttributeError("You cannot view password!")
    
    @password_hash.setter
    def password_hash(self, new_password):
        if len(new_password) < 5:
            raise ValueError("Password must be at least 5 characters")
        elif not re.search(r"[$&+,:;=?@#|'<>.-^*()%!]",new_password):
            raise ValueError('Password must contain special characters')
        elif not re.search(r"[A-Z]",new_password):
            raise ValueError('Password must contain at least one capital letter')
        elif not re.search(r"[a-z]",new_password):
            raise ValueError('Password must contain at least one lowercase letter')
        elif not re.search(r"[0-9]",new_password):
            raise ValueError('Password must contain at least one number')
        else: 
            hashed_password = flask_bcrypt.generate_password_hash(new_password).decode('utf-8')
            self._password_hash = hashed_password

    def authenticate(self, password):
        return flask_bcrypt.check_password_hash(self._password_hash, password)
    
    # model validation
    @validates("username")
    def validate_username(self, _, username):
        if not isinstance(username, str):
            raise TypeError("Username must be a string!")
        elif len(username) > 20:
            raise ValueError("Username must be less than 20 characters")
        return username