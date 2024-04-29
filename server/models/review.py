from .user import User
from .cafe import Cafe

from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from config import db

class Review(db.Model, SerializerMixin):
    __tablename__ = "reviews"
    
    __table_args__ = (db.UniqueConstraint('cafe_id', 'user_id',),)
    
    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    cafe_id = db.Column(db.Integer, db.ForeignKey("cafes.id"))
    body = db.Column(db.String, nullable=False)
    good_description = db.Column(db.String, nullable=False)
    bad_description = db.Column(db.String, nullable=False)
    star_rating = db.Column(db.Integer, nullable=False, default=0)
    liked = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    # relationship
    cafe = db.relationship("Cafe", back_populates="reviews")
    user = db.relationship("User", back_populates="reviews")
    
    comments = db.relationship("Comment", back_populates="review", cascade="all, delete-orphan")

    # serialization
    serialize_rules = ("-user.reviews", "-cafe.reviews",)
    
    # model validation
    
    @validates("body")
    def validate_body(self, _, body):
        if not isinstance(body, str):
            raise TypeError("Body must be a string!")
        elif len(body) >= 150:
            raise ValueError("Body cannot be longer than 150 characters")
        return body
    
    @validates("good_description")
    def validate_good_description(self, _, gd):
        if not isinstance(gd, str):
            raise TypeError("Good description must be a string")
        elif len(gd) >= 150:
            raise ValueError("Good description cannot be longer than 150 characters")
        return gd
    
    @validates("bad_description")
    def validate_good_description(self, _, bd):
        if not isinstance(bd, str):
            raise TypeError("Bad description must be a string")
        elif len(bd) >= 150:
            raise ValueError("Bad description cannot be longer than 150 characters")
        return bd
    
    @validates("star_rating")
    def validate_star_rating(self, _, sr):
        if not isinstance(sr, int):
            raise TypeError("Star rating must be an integer")
        elif (sr >= 5):
            raise ValueError("Star rating muts be in between 1 to 5")
        return sr
        
    @validates("user_id")
    def validate_user_id(self, _, user_id):
        if not isinstance(user_id, int):
            raise TypeError("User ids must be an integer")
        elif user_id < 1:
            raise ValueError(f"{user_id} has to be a positive integer")
        elif not db.session.get(User, user_id):
            raise ValueError(f"{user_id} has to correspond to an existing user")
        return user_id
    
    @validates("cafe_id")
    def validate_user_id(self, _, cafe_id):
        if not isinstance(cafe_id, int):
            raise TypeError("Cafe ids must be an integer")
        elif cafe_id < 1:
            raise ValueError(f"{cafe_id} has to be a positive integer")
        elif not db.session.get(Cafe, cafe_id):
            raise ValueError(f"{cafe_id} has to correspond to an existing cafe")
        return cafe_id