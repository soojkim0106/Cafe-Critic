#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, g
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models.user import User
from models.cat import Cat
from models.adopt_foster import AdoptFoster

from schemas.cat_schema import CatSchema
from schemas.adopt_foster_schema import AdoptFosterSchema


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

