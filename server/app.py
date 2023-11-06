 
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

# from models import db, User, Closet, ClothingItem
from new_models import db, User, ClothingItem, Closet
from config import app, db

# ---------------HOMEPAGE-----------------

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

@app.get('/collection')
def get_clothingitems_by_id(id):
    try:
        clothingitem = ClothingItem.query.filter(ClothingItem.id == id).first()
        return clothingitem.to_dict(), 200
    except:
        return {'error': 'clothing item does not exist'}, 404

# ----------------POST CLOTHING ITEM----------------

@app.post('/collection')
def post_closet():
    
        # creating a python object inside of the request
        # create a new closet object
        # give the closet object the attributes from the incoming json request ; closet object not clothing object
        # closet obj has 2 attributes: item id and user id
                # "item_id": 7,
                # "user_id": 3
        # take that information and create new python instance/obj with 
        # nature of the foreignkeys creates the relationship
        
       
    #    closet_object = Closet({ 
    #                 "item_id": 7,
    #                 "user_id": 3
    #             })
    
    
        data = request.json
        # print(data['user_id'])
    
        closet_object = Closet(
                        item_id = data['item_id'],
                        user_id = data['user_id']
                        )
       
        db.session.add(closet_object)
        db.session.commit()

        return jsonify({'message': 'Clothing item added successfully'}), 201

    
    

# @app.post('/cars')
# def create_cars():
    
#     data = request.json
    
    # owner = Owner.query.filter(Owner.id == data['owner_id']).first
    # dealership = Dealership.query.filter(Dealership.id == data['dealership_id']).first
    
#     new_car = Car(make = data['make'], 
#                   data_sold = data['date_sold'], 
#                   model = data['model'], 
#                   owner = owner, 
#                   dealership = dealership)
    
#     db.session.add_all(new_car)
#     db.session.commit()
    
#     return new_car.to_dict(), 201
    
# ----------------GET CLOSET(favourited items) BY USER ID----------------

# @app.route('/closets')
# def get_closet(user_id):
#     user_id_to_add = 2
#     USER_ID_MATCH = Closet.user_id == user_id_to_add
#     FAVOURITED_MATCHES = Closet.favorited == True
#     favourited_items_in_closet = Closet.query.filter(USER_ID_MATCH, FAVOURITED_MATCHES).all()


@app.get('/closet/<int:user_id>')
def get_closet(user_id):
    # Get the user_id from the URL parameter and use it to filter all closet for favorited items
    USER_ID_MATCH = Closet.user_id == user_id
    items_in_closet = Closet.query.filter(USER_ID_MATCH).all()
    
    # Check if any favorited items were found
    if items_in_closet:
        result = [item.item_object.to_dict() for item in items_in_closet]
        return jsonify(result), 200
    else:
        return {'error': 'No favourited items found for this user.'}, 404
    
# ----------------PROTOTYPE PATCH CLOSET----------------

@app.patch('/closet/<int:id>')
def patch_closet(id):
    
    req = request.json
    
    user_id = request.json['user_id']
    item_id = request.json['item_id']
    
    print("REQUEST:", req)
    print("USER:", user_id)
    print("ITEM:", item_id)
    """ Prototyping Route to Add Item to Closet """
    # IDs for Parsing Association to Add to Closet
    # TODO: Change it so it takes in a item ID and user ID from the frontend 
    #       and sets these two values to whatever those IDs are.
    #       Will need `request.data` or `request.json` or some shit.
    # item_id_to_add, user_id_to_add = 6, 2

    # # Filter All Associations by Item and User IDs
    ITEM_ID_MATCH = Closet.item_id == item_id
    USER_ID_MATCH = Closet.user_id == user_id
    matching_association = Closet.query.filter(ITEM_ID_MATCH, USER_ID_MATCH).first()
    # print("\n\n")
    print(matching_association.id)
    setattr(matching_association, "favourited", True) 
    # `matching_association.favourited = True`
    db.session.add(matching_association)
    db.session.commit()
    # print("\n\n")
    return '<h1>WE DID IIIIIIT</h1>'

       
    
     
    
# ----------------GET CLOSET----------------
# @app.get('/closets')
# def get_closet():
#     # print("yeeeeee")
#     users_id = 1
#     try:
#         ALL_CLOTHING_BY_USER = Closet.user_id == users_id
#         closeted_items = Closet.query.filter(ALL_CLOTHING_BY_USER)
#         print(closeted_items)
#         return '<h1>hai</h1>'
#         # print("whooooo")
#         return closeted_items.to_dict(), 200
#     except:
#         return {'error': 'closet items do not exist'}, 404
    # closetitems = Closet.query.all()
    # for closetitem in closetitems:
    #     print(closetitem.to_dict())
    # return jsonify([closetitem.to_dict() for closetitem in closetitems])


# ----------------GET CLOSET by id----------------
# @app.get('/closets/<int:id>')
# def get_closet_by_id(id):
#     closets = Closet.query.filter(Closet.user_id == 1).all()
#     for closet in closets:
#         return jsonify([closet.to_dict()]), 201
    
# ----------------POST CLOTHING ITEMS TO CLOSET----------------

# @app.post('/closets')
# def creating_closet():
    # data = request.json
    
    # if there is an existing closet
    # existingclosets = Closet.query.filter(Closet.user_id == 1).first()
    # for existingcloset
        
    
    # add the item to that closet
    
    # new users:
    # if there isnt an existing closet, create new closet and add item
    
    
    # new_closet = Closet(user_id = 1, 
    #                     clothingitem_id=data['id'])
    
    
    # db.session.add(new_closet)
    # db.session.commit()
    
    # return new_closet.to_dict(), 201
   


# ----------------DELETE FROM CLOSET----------------


if __name__ == '__main__':
    app.run(port=5555, debug=True)
