from .user import User
from .review import Review

from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from config import db

class Comment(db.Model):
    __tablename__ = "comments"
    
    id = db.Column(db.Integer, primary_key = True)
    body = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    review_id = db.Column(db.Integer, db.ForeignKey("reviews.id"))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    # relationship
    
    user = db.relationship("User", back_populates="comments")
    review = db.relationship("Review", back_populates="comments")
    
    # serialization
    
    # serialize_rules = ("-user.comments", "-review.comments")
    
    def __repr__(self):
        return f"<Comment {self.id}: {self.body} | written by: {self.user_id} for review {self.review_id}>"
    
    # model Validation
    @validates("body")
    def validate_body(self, _, body):
        if not isinstance(body, str):
            raise TypeError("Body must be a string!")
        elif len(body) >= 150:
            raise ValueError("Body cannot be longer than 150 characters")
        return body
    
    @validates("user_id")
    def validate_user_id(self, _, user_id):
        if not isinstance(user_id, int):
            raise TypeError("User ids must be an integer")
        elif user_id < 1:
            raise ValueError(f"{user_id} has to be a positive integer")
        elif not db.session.get(User, user_id):
            raise ValueError(f"{user_id} has to correspond to an existing user")
        return user_id
    
    @validates("review_id")
    def validate_review_id(self, _, review_id):
        if not isinstance(review_id, int):
            raise TypeError("Review ids must be an integer")
        elif review_id < 1:
            raise ValueError(f"{review_id} has to be a positive integer")
        elif not db.session.get(Review, review_id):
            raise ValueError(f"{review_id} has to correspond to an existing review")
        return review_id