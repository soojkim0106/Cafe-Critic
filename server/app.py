 
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

# ----------------POST CLOTHING ITEMS TO CLOSET----------------

@app.post('/closet')
def creating_closet():
    data = request.json
    
    new_closet = Closet(user_id = data['user_id'], clothingitem_id=data['clothingitem_id'])
    db.session.add(new_closet)
    db.session.commit()
    
    return new_closet.to_dict(), 201
   
# ----------------GET CLOSET----------------
@app.get('/closet')
def get_closet():
    closetitems = Closet.query.all()
    for closetitem in closetitems:
        print(closetitem.to_dict())
    return jsonify([closetitem.to_dict() for closetitem in closetitems])

# ----------------DELETE FROM CLOSET----------------





if __name__ == '__main__':
    app.run(port=5555, debug=True)
