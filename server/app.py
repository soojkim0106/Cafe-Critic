 
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from models import db, User, Closet, ClothingItem
from config import app, db

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

# ----------------GET USER----------------

@app.get('/users')
def get_users():
    
    users = User.query.all()
    return [user.to_dict() for user in users]

# ----------------POST USER----------------

@app.post('/users')
def create_user():
    pass
    # data = request.json
    
# ----------------GET ALL CLOTHING ITEMS----------------

@app.get('/collection')
def get_clothingitems():
    clothingitems = ClothingItem.query.all()
    for clothingitem in clothingitems:
        print(clothingitem.to_dict())
    return jsonify([clothingitem.to_dict() for clothingitem in clothingitems])

# ----------------GET CLOTHING ITEM BY ID----------------

@app.get('/collection/<int:id>')
def get_clothingitems_by_id(id):
    try:
        clothingitem = ClothingItem.query.filter(ClothingItem.id == id).first()
        return clothingitem.to_dict(), 200
    except:
        return {'error': 'clothing item does not exist'}, 404

# ----------------GET CLOSET----------------
@app.get('/closets')
def get_closet():
    closetitems = Closet.query.all()
    for closetitem in closetitems:
        print(closetitem.to_dict())
    return jsonify([closetitem.to_dict() for closetitem in closetitems])


# ----------------GET CLOSET by id----------------
@app.get('/closets/<int:id>')
def get_closet_by_id(id):
    closets = Closet.query.filter(Closet.user_id == 1).all()
    for closet in closets:
        return jsonify([closet.to_dict()]), 201
    
# ----------------POST CLOTHING ITEMS TO CLOSET----------------

@app.post('/closets')
def creating_closet():
    data = request.json
    
    # if there is an existing closet
    # existingclosets = Closet.query.filter(Closet.user_id == 1).first()
    # for existingcloset
        
    
    # add the item to that closet
    
    # new users:
    # if there isnt an existing closet, create new closet and add item
    
    
    new_closet = Closet(user_id = 1, 
                        clothingitem_id=data['id'])
    
    
    db.session.add(new_closet)
    db.session.commit()
    
    return new_closet.to_dict(), 201
   




# ----------------DELETE FROM CLOSET----------------


if __name__ == '__main__':
    app.run(port=5555, debug=True)
