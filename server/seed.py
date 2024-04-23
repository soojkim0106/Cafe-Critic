#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from config import db
from models.user import User
from models.cafe import Cafe
from models.review import Review
from models.comment import Comment

if __name__ == '__main__':
    # fake = Faker()
    with app.app_context():
        
        Review.query.delete()
        Recipe.query.delete()
        User.query.delete()
        Cafe.query.delete()
        
        print("Starting seed...")
        # Seed code goes here!
