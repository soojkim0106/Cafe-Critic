from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from config import db

class Cafe(db.Model, SerializerMixin):
    __tablename__ = "cafes"
    
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False, unique=True)
    image = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    # relationship
    users = association_proxy("reviews", "user")
    reviews = db.relationship("Review", back_populates="review", cascade="all, delete-orphan")
    
    # serialization
    
    serialize_rules = ("-reviews.cafe",)
    
    def __repr__(self):
        return f"<Cafe {self.id}: {self.name} | {self.address}>"
    
    # model Validation
    @validates("name")
    def validate_name(self, _, name):
        if not isinstance(name, str):
            raise TypeError("Name must be a string!")
        elif not (2 < len(name)):
            raise ValueError("Name must be at least 2 characters")
        return name
    
    @validates("address")
    def validate_address(self, _, address):
        if not isinstance(address, str):
            raise TypeError("Address must be a string!")
        elif not (10 < len(address)):
            raise ValueError("Address must be at least 10 characters")
        return address