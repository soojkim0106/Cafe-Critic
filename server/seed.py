from config import app
from models import db, User, Closet, ClothingItem
from faker import Faker
import random 



if __name__ == "__main__":
    fake = Faker()

    with app.app_context():
        
           
        print("starting seed...")
        
        
        print("deleting old seed...")
        
        User.query.delete()
        ClothingItem.query.delete()
        Closet.query.delete()
        
        print("creating user")
        
        user_list = []
        
        for _ in range(5):
            
            new_user = User(name=fake.name(), 
                            username = fake.first_name(),
                            password = fake.word())
            
            user_list.append(new_user)
            db.session.add_all(user_list)
            db.session.commit()
        
        print("creating clothing item...")
        
        clothinglist = []
        
        for _ in range(10):
            
            new_clothing = ClothingItem(name = fake.name(),
                                        image_url = fake.url(),
                                        category = fake.company(),
                                        tags = fake.word())
            
            clothinglist.append(new_clothing)
            db.session.add_all(clothinglist)
            db.session.commit()
        
        
        print("creating closet...")
    
        closetlist = []
    
        for _ in range(5):
            
            new_closet = Closet(user = random.choice(user_list), clothingitem = random.choice(clothinglist))
            
            closetlist.append(new_closet)
            db.session.add_all(closetlist)
            db.session.commit()