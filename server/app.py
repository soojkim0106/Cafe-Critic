#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Subject, Answer, Card_Deck, Question, Question_Card

# Views go here!
class Users(Resource):
    def post(self):
        data= request.get_json()
        user = User(username=data['username'], password_hash=data['password'],email=data['email'], grade_level=data['grade_level'])
        db.session.add(user)
        db.session.commit()
        session['user_id'] = user.id
        return make_response({'user':user.to_dict()}, 201)


api.add_resource(Users, '/api/v1/register') 

@app.route('/api/v1/authorized')
def authorized():
    try:
        user = User.query.filter_by(id=session.get('user_id')).first()
        return make_response(user.to_dict(), 200)
    except: 
        return make_response({'error': " User not Found"}, 404)

@app.route('/api/v1/logout', methods = ['DELETE'])
def logout():
    session['user_id'] = None
    return make_response({}, 201)

@app.route('/api/v1/login', methods=['POST'])
def login():
    data = request.get_json()
    try:
        user = User.query.filter_by(username=data['username']).first()
        # import ipdb; ipdb.set_trace()
        if user.authenticate(data['password']):
            session['user_id']=user.id
            return make_response({'user': user.to_dict()}, 201)
    except:
        return make_response({'error': 'not a user'}, 401)

class Subjects(Resource):
    def get(self):
        subjects = [subject.to_dict() for subject in Subject.query.all()]
        return make_response(subjects, 200)


api.add_resource(Subjects, '/api/v1/home')
class Question_Cards(Resource):
    def get(self):
        question_cards = [card_deck.to_dict() for card_deck in Question_Card.query.all()]
        return make_response(question_card, 200)

api.add_resource(Question_Cards, '/api/v1/question_card')
@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

