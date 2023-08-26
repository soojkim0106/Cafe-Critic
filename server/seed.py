#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Book, Recipe

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        User.query.delete()
        Book.query.delete()
        Recipe.query.delete()
        db.session.commit()

        # mark = User(username = 'Mark')
        # mark.password_hash = 'idgaf123'
        # bfast = Book(category = 'Breakfast', user_id = mark.id)
        # image = 
        # recipe = Recipe(description = 'Figure it out', user_id = mark.id, image = ?)
