#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from config import app, db
# from app_setup import db
from models import User
from models import Post
from models import Comment



fake = Faker()

def create_users():
    users = []
    for _ in range(10):
        # pw_hash = flask_bcrypt.generate_password_hash("password").decode("utf-8")
        c = User(
            first_name=fake.first_name(),
            # last_name=fake.last_name(),
            # email=fake.email(),
            # phone_number=fake.phone_number(),
            # address=fake.address(),
            # is_employee=fake.boolean(chance_of_getting_true=20),
        )
        # c.password = "password"
        users.append(c)

    return users



def create_posts(users):
    posts = []
    for _ in range(20):
        p = Post(
            user_id=rc([user.id for user in users]),
            description = fake.sentence()
        )
        posts.append(p)

    return posts



def create_comments(users, posts):
    comments = []

    for _ in range(40):
        c = Comment(
            user_id=rc([user.id for user in users]),
            post_id=rc([post.id for post in posts]),
            comment = fake.sentence()
        )
        comments.append(c)

    return comments



if __name__ == '__main__':

    with app.app_context():
        print("Clearing db...")
        # User.query.delete()
        # Post.query.delete()
        # Comment.query.delete()
        
        print("Creating tables...")
        db.create_all()

        print("Seeding users...")
        users = create_users()
        db.session.add_all(users)
        db.session.commit()

        print("Seeding posts...")
        posts = create_posts(users)
        db.session.add_all(posts)
        db.session.commit()

        print("Seeding comments...")
        comments = create_comments(users, posts)
        db.session.add_all(comments)
        db.session.commit()

        print("Seeding complete!!!")
        
print("Flask app and SQLAlchemy imported in seed.py.")