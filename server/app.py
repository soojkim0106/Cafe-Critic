#!/usr/bin/env python3

# Standard library imports
from models import db, Product, Location, Stock
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask import Flask, make_response, jsonify, request
from flask_cors import CORS
from flask.ext.bcrypt import Bcrypt
import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.jsonify_compatibility = False

CORS(app)

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)
bcrypt = Bcrypt(app)

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class ClearSession(Resource):
    def delete(self):
        session['user_id'] = None

        return {}, 204
    
api.add_resource(ClearSession, '/clear_session')

class Signup(Resource):
    def post(self):
        username = request.get_json()['username']
        password = request.get_json()['password']

        if username and password:
            new_user = User(username=username)
            new_user.password_hash = password
            db.session.add(new_user)
            db.session.commit()

            session['user_id'] = new_user.id

            return new_user.to_dict(), 201
        return {'error': '422 Unprocessable Entity'}, 422
    
api.add_resource(Signup, '/signup')

class CheckSession(Resource):
    def get(self):
        if session.get('user_id'):
            user = User.query.filter(User.id == session['user_id']).first()
            return user.to_dict(), 200
        else:
            return {}, 401
        
api.add_resource(CheckSession, '/check_session')

class Login(Resource):
    def post(self):
        username = request.get_json()['username']
        user = User.query.filter(User.username == username)

        password = request.get_json()['password']
        if password == user.password:
            session['user_id'] = user.id
            return user.to_dict()
        if user.authenticate(password):
            session['user_id'] = user.id
            return user.to_dict()

        return {'error':'Invalid username or password'}, 401
    
api.add_resource(Login, '/login')


class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return {}, 204
api.add_resource(Logout, '/logout')
        


if __name__ == '__main__':
    app.run(port=5555, debug=True)

