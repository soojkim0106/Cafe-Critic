#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from config import db
from models.user import User
from models.cat import Cat
from models.adopt_foster import AdoptFoster


if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
       with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        User.query.delete()
        Cat.query.delete()
        AdoptFoster.query.delete()

        c1 = Cat(
            name="Whiskers",
            age=7,
            gender="Male",
            breed="Persian",
            temperament="Calm",
            image= "https://as1.ftcdn.net/v2/jpg/02/36/99/22/1000_F_236992283_sNOxCVQeFLd5pdqaKGh8DRGMZy7P4XKm.jpg",
            good_with_children=True,
            good_with_animal=True,
            availability=True,
            fixed=True
        )
        c2 = Cat(
            name="Mittens",
            age=3,
            gender="Female",
            breed="Siamese",
            temperament="Playful",
            image= "https://as2.ftcdn.net/v2/jpg/03/03/62/45/1000_F_303624505_u0bFT1Rnoj8CMUSs8wMCwoKlnWlh5Jiq.jpg",
            good_with_children=True,
            good_with_animal=False,
            availability=True,
            fixed=True
        )
        c3 = Cat(
            name="Pickles",
            age=5,
            gender="Female",
            breed="Maine Coon",
            temperament="Friendly",
            image= "https://as2.ftcdn.net/v2/jpg/02/66/72/41/1000_F_266724172_Iy8gdKgMa7XmrhYYxLCxyhx6J7070Pr8.jpg",
            good_with_children=False,
            good_with_animal=True,
            availability=True,
            fixed=True
        )
        c4 = Cat(
            name="Socks",
            age=2,
            gender="Male",
            breed="Scottish Fold",
            temperament="Timid",
            image= "https://as1.ftcdn.net/v2/jpg/02/97/99/50/1000_F_297995004_KIRJlI4JXoOGdnk6fj8NMTC9Xvt7b5Im.jpg",
            good_with_children=True,
            good_with_animal=True,
            availability=True,
            fixed=True
        )
        cats = [c1, c2, c3, c4]
        db.session.add_all(cats)
        db.session.commit()
        
        print("Completed seeding...")