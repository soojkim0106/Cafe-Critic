#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Gym_location, Exercise, Assignment

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Deleting date...")
        User.query.delete()
        Gym_location.query.delete()
        Exercise.query.delete()
        Assignment.query.delete()
        print("Starting seed...")
        # Seed code goes here!
        print('Making users')
        u1=User(name=fake.name(),membership_type='starter',goal='get big')
        u2=User(name=fake.name(),membership_type='starter',goal='get big')
        u3=User(name=fake.name(),membership_type='Pro',goal='get lean')
        u4=User(name=fake.name(),membership_type='Pro',goal='Tone up')
        users=[u1,u2,u3,u4]

        print('Making Gym Locations')

        g1=Gym_location(location=fake.address(),number_of_machines=12)
        g2=Gym_location(location=fake.address(),number_of_machines=12)
        g3=Gym_location(location=fake.address(),number_of_machines=12)
        g4=Gym_location(location=fake.address(),number_of_machines=12)
        gyms=[g1,g2,g3,g4]

        print('Making exercises')
        
        e1=Exercise(exercise_type="Cardio",exercise='Running')
        e2=Exercise(exercise_type="Cardio",exercise='Jump Rope')
        e3=Exercise(exercise_type="Strength",exercise='Weight lifting')
        e4=Exercise(exercise_type="Power",exercise='delayed lifts')

        exer=[e1,e2,e3,e4]

        print('making assignments')

        a1=Assignment(user_id=1,user_goal='get big',exercise_id=3)
        a2=Assignment(user_id=2,user_goal='get big',exercise_id=4)
        a3=Assignment(user_id=3,user_goal='get lean',exercise_id=2)
        a4=Assignment(user_id=4,user_goal='tone up',exercise_id=1)
        assignments=[a1,a2,a3,a4]
        db.session.add_all(assignments)
        db.session.add_all(exer)
        db.session.add_all(gyms)
        db.session.add_all(users)
        db.session.commit()

        print('seeding done!')
    
