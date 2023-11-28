#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource
from flask import Flask, request, make_response

# Local imports
from config import app, db, api
# Add your model imports
from models import db, GymLocation, Trainer

@app.route('/gym_locations', Method='GET')
def gym_locations():
    all_gym_locations=[location.to_dict() for location in GymLocation.query.all()]
    return make_response(all_gym_locations, 200)

@app.route('/gym_locations/<int:id>', Method='GET')
def gym_locations(id):
    gym_Id=GymLocation.query.filter_by(id = id).first()
    if not gym_Id:
        return make_response({'error':'Gym location does not exist'}, 404)
    return make_response(gym_Id.to_dict(), 200)

@app.route('/trainers', Method='GET')
def trainers():
    all_trainers=[trainer.to_dict() for trainer in Trainer.query.all()]
    return make_response(all_trainers, 200)

@app.route('/trainers/<int:id>', Method='GET')
def trainers(id):
    trainer_Id=Trainer.query.filter_by(id = id).first()
    if not trainer_Id:
        return make_response({'error':'Trainer does not exist'}, 404)
    return make_response(trainer_Id.to_dict(), 200)

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

