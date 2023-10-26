from config import app
# from models import db, User, Closet, ClothingItem
from new_models import db, User, ClothingItem, Item_User_Association
from faker import Faker
import random 

if __name__ == "__main__":
    fake = Faker()

    with app.app_context():
        
           
        print("starting seed...")
        
        print("deleting old seed...")
        
        User.query.delete()
        ClothingItem.query.delete()
        Item_User_Association.query.delete()
        print("Creating users...")
        
        user_list = []
        for _ in range(1):
            new_user = User(name=fake.name(),
                            username=fake.first_name(),
                            password=fake.word())
            user_list.append(new_user)
        db.session.add_all(user_list)
        db.session.commit()
        
        
        print("Creating clothing items...")

        clothing_items_list = []
        for _ in range(10):
            new_clothing_item = ClothingItem(name=fake.name(),
                                             image_url=fake.url(),
                                             category=fake.company(),
                                             tags=fake.word())
            clothing_items_list.append(new_clothing_item)
        db.session.add_all(clothing_items_list)
        db.session.commit()