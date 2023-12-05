# server/models.py

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

from config import db, metadata


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)

    # Relationship mapping the user to related comments
    comments = db.relationship(
        'Comment', back_populates="user", cascade='all, delete-orphan')

    # Relationship mapping user to related posts
    posts = db.relationship(
        'Post', uselist=False, back_populates='user', cascade='all, delete-orphan')

    def __repr__(self):
        return f'<User {self.id}, {self.name} />'


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String)

    # Foreign key to store the user id
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    # Relationship mapping post to related user
    user = db.relationship('User', back_populates='posts')
    comments = db.relationship('Comment', back_populates='post')

    def __repr__(self):
        return f'<Post {self.id}, {self.description} />'


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String)

    # Foreign key to store the user id
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))

    # Relationship mapping the review to related user
    user = db.relationship('User', back_populates="comments")
    post = db.relationship('Post', back_populates="comments")

    def __repr__(self):
        return f'<Review {self.id}, {self.comment} />'