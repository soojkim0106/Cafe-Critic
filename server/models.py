from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates


from config import db

# Models go here!
class User(db.Model,SerializerMixin):
    __tablename__='users'

    id=db.Column(db.Integer,primary_key=True)
    name=db.Column(db.String)
    membership_type=db.Column(db.String)
    goal=db.Column(db.String)
    
    #add relationships
    assignments=db.relationship('Assignment', back_populates='user')
    exercise=association_proxy('assignments','exercise')
    reviews=db.relationship('Review', back_populates='users', cascade='all, delete-orphan')
    reviews_gymLo=association_proxy('gym_locations', 'reviews')

class GymLocation(db.Model,SerializerMixin):
    __tablename__='gym locations'

    id=db.Column(db.Integer, primary_key=True)
    location=db.Column(db.String, nullable=False)
    number_of_machines=db.Column(db.Integer)
    #relationships a gym location has many reviews
    reviews=db.relationship('Review', back_populates='gym_locations', cascade='all, delete-orphan')
    reviews_user=association_proxy('user', 'reviews')

    machines=db.relationship('Machines', back_populates='gym_location')
    trainers=db.relationship('Trainer', back_populates='gym_location')

class Exercise(db.Model,SerializerMixin):
    __tablename__='exercises'

    id=db.Column(db.Integer,primary_key=True)
    exercise_type=db.Column(db.String) #example:cardio
    exercise=db.Column(db.String)#example:Pushups
    #add relationships
    assignments=db.relationship('Assignment', back_populates='exercise')
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


class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id=db.Column(db.Integer, primary_key=True)
    body=db.Column(db.String)
    created_at=db.Column(db.DateTime, server_default=db.func.now())
    updated_at=db.Column(db.DateTime, onupdate=db.func.now(), nullable=True)

    user_id=db.Column(db.Integer,db.ForeignKey('users.id'))
    gym_location_id=db.Column(db.Integer,db.ForeignKey('gym locations.id'))
    # relationships
    users=db.relationship('User', back_populates='reviews')
    gym_locations=db.relationship('GymLocation', back_populates='reviews')

class Machines(db.Model, SerializerMixin):
    __tablename__= 'machines'
    id=db.Column(db.Integer, primary_key=True)
    machine_name=db.Column(db.String)

    gym_locations_id=db.Column(db.Integer, db.ForeignKey('gym locations.id'))

    #relationship A Gym location has many machines
    gym_location=db.relationship('GymLocation', back_populates='machines') 


class Trainer(db.Model, SerializerMixin):
    __tablename__= 'trainers'
    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String)

    gym_locations_id=db.Column(db.Integer, db.ForeignKey('gym locations.id'))

    #relationship A Gym location has many trainers
    gym_location=db.relationship('GymLocation', back_populates='trainers') 
