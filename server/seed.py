#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Local imports
from config import db
from app import app
from models.user import User
from models.comment import Comment
from models.cafe import Cafe
from models.review import Review

with app.app_context():
        
    Review.query.delete()
    Comment.query.delete()
    User.query.delete()
    Cafe.query.delete()
    print("Deleting initial tables...")
    
    u1 = User(
        username="test",
        email="test@email.com",
        _password_hash="this1Spassword"
    )
    u2 = User(
        username="sooj",
        email="sooj@email.com",
        _password_hash="this1Spassword"
    )
    users = [u1, u2]
    db.session.add_all(users)
    db.session.commit()
    
    c1 = Cafe(
        name="The Mill",
        address="736 Divisadero St, San Francisco, CA 94117",
        image="the_mill.png"
    )
    
    c2 = Cafe(
        name="Third Wheel Coffee",
        address="535 Scott St, San Francisco, CA 94117",
        image="default.jpg"
    )
    
    c3 = Cafe(
        name="Matching Half",
        address="1799 McAllister St, San Francisco, CA 94115",
        image="default.jpg"
    )
    
    c4 = Cafe(
        name="Starbucks",
        address="1799 Fulton St, San Francisco, CA 94117",
        image="starbucks.png"
    )
    
    c5 = Cafe(
        name="Komeya No Bento",
        address="3137 Laguna St, San Francisco, CA 94123",
        image="komeya.png"
    )
    
    c6 = Cafe(
        name="Kiss of Matcha",
        address="750 Clement St, San Francisco, CA 94118",
        image="kiss.png"
    )
    
    c7 = Cafe(
        name="Sightglass Coffee",
        address="301 Divisadero St, San Francisco, CA 94117",
        image="sightglass.png"
    )
    
    c8 = Cafe(
        name="Andytown Coffee Roasters",
        address="3655 Lawton St, San Francisco, CA 94122",
        image="andytown.png"
    )
    
    c9 = Cafe(
        name="Ocean Beach Cafe",
        address="734 La Playa St, San Francisco, CA 94121",
        image="oceanbeach.jpg"
    )
    
    c10 = Cafe(
        name="Legion of Honor Cafe",
        address="100 34th Ave, San Francisco, CA 94121",
        image="default.jpg"
    )
    
    cafes = [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10]
    db.session.add_all(cafes)
    db.session.commit()
    
    r1 = Review(
        body="I love this place!",
        good_description="Great coffee",
        bad_description="None",
        star_rating=2, 
        cafe_id=1,
        user_id=1,
    )
    
    db.session.add(r1)
    db.session.commit()
    
    
    print("Completed seeding...")
