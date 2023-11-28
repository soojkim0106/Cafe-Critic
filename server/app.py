#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from models import Park
from flask_migrate import Migrate
from flask import Flask,request, make_response
from flask_restful import Resource, Api
import os

# Local imports
from config import app, db, api
# Add your model imports


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

