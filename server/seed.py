from your_flask_app import db, User, Closet, ClothingItem
from faker import Faker

# Initialize Faker for generating fake user data
fake = Faker()

# Function to seed the database 🌱
def seed_database():
    # Create and add users 👤
    users_data = []

    for _ in range(3):
        user_data = {
            "username": fake.user_name(),
            "email": fake.email(),
            "password": "password1",  # You can set a common password for fake users
        }
        users_data.append(user_data)

    for user_data in users_data:
        user = User(**user_data)
        db.session.add(user)

    # Create and add closets 🚪
    closets_data = [
        {"user_id": 1, "name": "User 1's Closet"},
        {"user_id": 2, "name": "User 2's Closet"},
        {"user_id": 3, "name": "User 3's Closet"},
    ]

    for closet_data in closets_data:
        closet = Closet(**closet_data)
        db.session.add(closet)

    # Create and add clothing items 👗👟👒
    clothing_items_data = [
        {"name": "Blue Jeans", "description": "Classic blue jeans", "category": "Pants", "closet_id": 1, "color": "Blue", "fabric": "Denim", "size": "32x34"},
        {"name": "Running Shoes", "description": "Comfortable running shoes", "category": "Shoes", "closet_id": 1, "color": "Gray", "fabric": "Mesh", "size": "9"},
        {"name": "Sun Hat", "description": "Wide-brimmed sun hat", "category": "Hats", "closet_id": 2, "color": "Beige", "fabric": "Straw", "size": "One size"},
        # Add more clothing items with color, fabric, and size for different users and closets
    ]

    for item_data in clothing_items_data:
        clothing_item = ClothingItem(**item_data)
        db.session.add(clothing_item)

    # Commit the changes to the database 🚀
    db.session.commit()

if __name__ == "__main__":
    # Initialize your Flask app and database 🌐
    from your_flask_app import create_app

    app = create_app()
    with app.app_context():
        # Call the seed_database function to populate the database 🌿
        seed_database()
