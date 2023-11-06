from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from config import db


class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String, nullable=False)
    username = db.Column(db.String, nullable = False)
    password = db.Column(db.String, nullable=False)
    
    user_that_selected_the_item = db.relationship("Closet", back_populates="user_object")
    
    def to_dict(self):
        return {
            "user_id": self.id,
            "username": self.username,
            "name": self.name
        }
    
class ClothingItem(db.Model, SerializerMixin):
    __tablename__ = "clothingitems"
    
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String, nullable=False)
    image_url = db.Column(db.String, nullable=False)
    category = db.Column(db.String, nullable=False)
    tags = db.Column(db.String, nullable=False)
    
    items_selected_by_user = db.relationship("Closet", back_populates="item_object")
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "image_url": self.image_url,
            "category": self.category,
            "tags": self.tags
        }
        
class Closet(db.Model):
    """ Association Table for Linking Clothing Items to Users. """
    __tablename__ = "closet_associations"
    
    id = db.Column(db.Integer, primary_key = True)
    item_id = db.Column(db.Integer, db.ForeignKey("clothingitems.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    favourited = db.Column(db.Boolean, nullable=False, default=False)

    item_object = db.relationship("ClothingItem", back_populates="items_selected_by_user")
    user_object = db.relationship("User", back_populates="user_that_selected_the_item")