#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Stock

behaviors = ['steadyUp', 'steadyDown', 'drastic', 'wild', 'moderate']

def seed_stocks():
    fake = Faker()
    stocks = []
    for _ in range(10):
        s = Stock(
            name=fake.company(),
            value= round(randint(1, 1000) + randint(0,99) / 100, 2),
            behavior=rc(behaviors)
        ) 
        stocks.append(s)

    return stocks

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        Stock.query.delete()
        
        stocks = seed_stocks()
        for stock in stocks:
            db.session.add(stock)
        db.session.commit()

        print('Seed finished')