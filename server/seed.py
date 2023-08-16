#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
import csv


# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Trip, Place

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        Place.query.delete()
        db.session.commit()

        with open('seed.csv', newline='', encoding='utf-8') as seed_file:
            rows = [row for row in csv.reader(seed_file, delimiter=',', quotechar='"')]

            places = []
            for i in range(1,len(rows)):
                place = Place(
                    city = rows[i][0],
                    state = rows[i][1],
                    country = rows[i][2],
                    image = rows[i][3]
                )
                places.append(place)
            db.session.add_all(places)
            db.session.commit()
