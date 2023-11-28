from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!
class User(db.Model,SerializerMixin):
    __tablename__='users'

    id=db.Column(db.Integer,primary_key=True)
    name=db.Column(db.String)
    membership_type=db.Column(db.String)
    goal=db.Column(db.String)
    #add relationships
    assignments=db.relationship('Assignment',back_populates='user')
    exercise=association_proxy('assignments','exercise')

class Gym_location(db.Model,SerializerMixin):
    __tablename__='gym locations'

    id=db.Column(db.Integer,primary_key=True)
    location=db.Column(db.String)
    number_of_machines=db.Column(db.Integer)#how many machines does the gym have?

class Exercise(db.Model,SerializerMixin):
    __tablename__='exercises'

    id=db.Column(db.Integer,primary_key=True)
    exercise_type=db.Column(db.String) #example:cardio
    exercise=db.Column(db.String)#example:Pushups
    #add relationships
    assignments=db.relationship('Assignment',back_populates='exercise')
    user=association_proxy('assignments','user')

#assigns exercises to user
class Assignment(db.Model,SerializerMixin):
    __tablename__='assignments'

    #assignmenmts will be created by a form using post
    id=db.Column(db.Integer,primary_key=True)
    user_id=db.Column(db.Integer,db.ForeignKey('users.id'))
    user_goal=db.Column(db.String)
    exercise_id=db.Column(db.Integer,db.ForeignKey('exercises.id'))
    #add relationships
    user=db.relationship('User',back_populates='assignments')
    exercise=db.relationship('Exercise',back_populates='assignments')
