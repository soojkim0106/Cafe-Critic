from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from config import db

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

# -------------------------USER -------------------------
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String, nullable=False)
    
    closets = db.relationship('Closet', back_populates='user')

    serialize_rules = ('-closets.user',)
    
# -------------------------CLOTHINGITEM-------------------------
class ClothingItem(db.Model, SerializerMixin):
    __tablename__ = 'clothingitems'
 
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String, nullable=False)
    category = db.Column(db.String, nullable=False)
    tags = db.Column(db.String, nullable=False)
    
    closets = db.relationship('Closet', back_populates='clothingitem')
    
    serialize_rules = ('-closets.clothingitem')
    
# -------------------------CLOSET (bridge)-------------------------
class Closet(db.Model, SerializerMixin):
    __tablename__ = 'closets'

    id= db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    clothingitem_id = db.Column(db.Integer, db.ForeignKey('clothingitems.id'))

    user = db.relationship('User', back_populates='closets')
    clothingitem = db.relationship('ClothingItem', back_populates='closets')
    
    serialize_rules = ('-user.closets', '-clothingitem.closets',)



# -------------------------WARDROBE-------------------------

#  in the future, i may want to use this as a recommendation engine for users (curated for each client)


# class Wardrobe(db.Model, SerializerMixin):
#     __tablename__ = 'wardrobes'
    
#     id = db.Column(db.Integer, primary_key=True, nullable=False)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
#     user = db.relationship('User', back_populates='wardrobe')
#     clothing_items = db.relationship('ClothingItem', secondary=wardrobe_clothing_items, back_populates='wardrobes')

        


