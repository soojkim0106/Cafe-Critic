#!/usr/bin/env python3

# Standard library imports
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask import Flask, make_response, jsonify, request, session, render_template
from flask_cors import CORS
import os
from models import User, Stock, Portfolio, Expense, TotalExpense
from config import app, db, api

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.jsonify_compatibility = False
app.secret_key = 'Thisismysecretkey#48'

CORS(app)

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)


class ClearSession(Resource):
    def delete(self):
        session['user_id'] = None

        return {}, 204
    
api.add_resource(ClearSession, '/clear_session')

class Signup(Resource):
    def post(self):
        username = request.get_json()['newUsername']
        password = request.get_json()['newPassword']

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

class GetCurrentUser(Resource):
    @classmethod
    def get(self):
        if 'user_id' in session:
            current_user = User.query.get(session['user_id'])
            if current_user:
                return jsonify(current_user.to_dict()), 200
            return jsonify({'error': 'User not authenticated'}), 401

api.add_resource(GetCurrentUser, '/api/user')

class UpdateStockBudget(Resource):
    def patch(self):
        data = request.get_json()
        user_id = session.get('user_id')
        if user_id: 
            user = User.query.get(user_id)
            if user:
                new_budget = data.get('stock_budget')
                if new_budget is not None:
                    user.stock_budget = new_budget
                    db.session.commit()
                    return {'message':'User stock budget updated successfully'}, 202
                else: 
                    return {'error':'Missing or invalid stock budget'}, 400
            else:
                return {'error': 'User not found'}, 404
        else:
            return {'error':'User not authenticated'}, 401
    
api.add_resource(UpdateStockBudget, '/api/user')

class UpdateExpenseBudget(Resource):
    def patch(self):
        data = request.get_json()
        user_id = session.get('user_id')
        if user_id: 
            user = User.query.get(user_id)
            if user:
                new_budget = data.get('expense_budget')
                if new_budget is not None:
                    user.expense_budget = new_budget
                    db.session.commit()
                    return {'message':'User expense budget updated successfully'}, 202
                else: 
                    return {'error':'Missing or invalid expense budget'}, 400
            else:
                return {'error': 'User not found'}, 404
        else:
            return {'error':'User not authenticated'}, 401
    
api.add_resource(UpdateExpenseBudget, '/api/user/expense')


class Login(Resource):
    def post(self):

        username = request.get_json()['username']
        password = request.get_json()['password']

        user = User.query.filter(User.username == username).first()

        if user.authenticate(password):

            session['user_id'] = user.id
            return user.to_dict(), 200

        return {'error': '401 Unauthorized'}, 401
    
api.add_resource(Login, '/login')


class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return {}, 204
api.add_resource(Logout, '/logout')

class Expenses(Resource):
    def get(self):
        if 'user_id' in session:
            user_id = session['user_id']
            expenses = [expense.to_dict(rules=('-users'))for expense in Expense.query.filter(Expense.user_id==user_id)]
            return make_response(expenses, 200)
        else:
            return make_response({'error':'Not allowed'}, 401)
    
    def post(self):
        fields = request.get_json()
        try:
            expense = Expense(
                name=fields['name'],
                description=fields['description'],
                cost=float(fields['cost']),
                user_id=fields['user_id'],
            )
            db.session.add(expense)
            db.session.commit()
            return make_response(expense.to_dict(), 201)
        except ValueError as e:
            return make_response({'error': e.__str__()}, 400)
        
api.add_resource(Expenses, '/expenses')

class ExpenseById(Resource):
    
    def delete(self, id):
        expense = Expense.query.filter(Expense.id==id).one_or_none()
        if expense is None:
            return make_response({'error':'expense not found'}, 404)
        db.session.delete(expense)
        db.session.commit()
        return make_response({}, 204)
    
    def patch(self, id):
        expense = Expense.query.get(id)
        if not expense:
            return make_response({'error': 'Expense not found'}, 404)
        data = request.get_json()
        if 'cost' in data:
            data['cost'] = float(data['cost'])
        for field, value in data.items():
            if hasattr(expense, field):
                setattr(expense, field, value)
        db.session.commit()
        return make_response(expense.to_dict(), 202)
        
api.add_resource(ExpenseById, '/expenses/<int:id>')

class ExpensesByUserId(Resource):
    def get(self, user_id=None):
        expenses = Expense.query.filter(Expense.user_id == user_id).all()
        if not expenses:
            return make_response({'error':'Expense not found'}, 404)
        expense_data = [expense.to_dict() for expense in expenses]
        return make_response(expense_data, 200)
    
api.add_resource(ExpensesByUserId, '/expenses/<int:user_id>')

class Stocks(Resource):
    def get(self):
        stocks = [stock.to_dict(rules=('-portfolios', '-users'))for stock in Stock.query.all()]
        return make_response(stocks, 200)

api.add_resource(Stocks, '/stocks')

class StocksById(Resource):
    def patch(self, id):
        stock = Stock.query.filter(Stock.id==id).one_or_none()
        if stock is None:
            return make_response({'error':'Stock not found'}, 404)
        
        data = request.get_json()
        for field, value in data.items():
            if hasattr(stock, field):
                setattr(stock, field, value)

        db.session.commit()
        return make_response(stock.to_dict(), 202)
    
    def get(self, id):
        stock = Stock.query.filter(Stock.id == id).one_or_none()
        if stock is None:
            return make_response({'error':'stock not found'}, 404)
        return make_response(stock.to_dict(), 200)
        
api.add_resource(StocksById, '/stocks/<int:id>')
        

class Portfolios(Resource):
    def post(self):
        fields = request.get_json()
        try:
            portfolio = Portfolio(
                quantity=fields['quantity'],
                purchase_value=fields['purchase_value'],
                user_id=fields['user_id'],
                stock_id=fields['stock_id']
            )
            
            db.session.add(portfolio)
            db.session.commit()
            return make_response(portfolio.to_dict(), 201)
        except ValueError as e:
            return make_response({'error': e.__str__()}, 400)
        
    # def get(self):
    #     if 'user_id' in session:
    #         user_id = session['user_id']
    #         portfolios = [portfolio.to_dict(rules=('-users'))for portfolio in Portfolio.query.filter(Portfolio.user_id==user_id)]
    #         return make_response(portfolios, 200)
    #     else:
    #         return make_response({'error':'Not allowed'}, 401)

    def get(self):
        portfolios = [portfolio.to_dict(rules=('-users', '-stocks')) for portfolio in Portfolio.query.all()]
        return make_response(portfolios, 200)
        


api.add_resource(Portfolios, '/portfolios')

class PortfolioByUserId(Resource):
    def get(self, user_id=None):
        portfolios = Portfolio.query.filter(Portfolio.user_id == user_id).all()
        if not portfolios:
            return make_response({'error':'Portfolio not found'}, 404)
        portfolio_data = [portfolio.to_dict() for portfolio in portfolios]
        return make_response(portfolio_data, 200)
    
api.add_resource(PortfolioByUserId, '/portfolios/<int:user_id>')

class PortfolioById(Resource):
    
    def delete(self, id):
        portfolio = Portfolio.query.filter(Portfolio.id==id).one_or_none()
        if portfolio is None:
            return make_response({'error':'portfolio not found'}, 404)
        db.session.delete(portfolio)
        db.session.commit()
        return make_response({}, 204)
    
    
        
api.add_resource(PortfolioById, '/portfolios/<int:id>')





if __name__ == '__main__':
    app.run(port=5555, debug=True)

