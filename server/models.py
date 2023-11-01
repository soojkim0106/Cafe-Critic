from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
import ipdb

from config import db, bcrypt

# Models go here!
class Stock(db.Model, SerializerMixin):
    __tablename__ = 'stocks'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    value = db.Column (db.Float)    

    portfolios = db.relationship('Portfolio', backref='stock', cascade='all, delete-orphan')

    serialize_rules = ('-portfolios.stock', '-users.stocks')

    
    @validates('name')
    def validates_name(self, key, name):
        if not name:
            raise ValueError('Stock must have a name.')
        return name
    
    def __repr__(self):
        return f'<Stock {self.name} ${self.value}'
    
class Expense(db.Model, SerializerMixin):
    __tablename__ = 'expenses'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)
    cost = db.Column(db.Float)
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    serialize_rules=("-user",)

    @validates('cost')
    def validates_cost(self, key, cost):
        if not isinstance(cost, float) or cost < 0:
            raise ValueError('Cost must be positive number.')
        return cost
    
    @validates('name')
    def validates_name(self, key, name):
        if not name or len(name) < 1:
            raise ValueError('Expense must have a name.')
        return name
    
    @validates('description')
    def validates_description(self, key, description):
        if not description or len(description) < 1:
            raise ValueError('Please include a description for expense.')
        return description

    def __repr__(self):
        return f'<Expense: {self.name}: {self.description}, ${self.cost}'


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String, nullable=False)

    portfolios = db.relationship('Portfolio', backref='user', cascade='all, delete-orphan')
    total_expenses = db.relationship('TotalExpense', backref='user', cascade='all, delete-orphan')
    expenses = db.relationship('Expense', backref='user', cascade='all, delete-orphan')

    serialize_rules = ('-portfolios.user', '-stocks.users', '-expenses.users')


    # Will have to make sure username is unique
    @hybrid_property
    def password_hash(self):
        raise Exception('Password hashes may not be view')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    
    @validates('username')
    def validates_username(self, key, username):
        if not username or len(username) < 5:
            raise ValueError('Username must be unique and at least 4 characters long.')
        return username
    
    @validates('_password_hash')
    def validates_password(self, key, _password_hash):
        if not _password_hash or len(_password_hash) < 8:
            raise ValueError('For security purposes, password must be at least 7 characters long. ')
        return _password_hash


    def __repr__(self):
        return f'<Username: {self.username}'
    
class Portfolio(db.Model, SerializerMixin):
    __tablename__ = 'portfolios'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    stock_id = db.Column(db.Integer, db.ForeignKey('stocks.id'), nullable=False)
    purchase_value = db.Column (db.Float)
    quantity = db.Column(db.Integer)

    serialize_rules = ('-user.portfolios', '-stock.portfolios')

    @validates('user_id')
    def validates_user_id(self, key, user_id):
        if not user_id:
            raise ValueError('Must have user ID.')
        return user_id
    
    @validates('stock_id')
    def validates_stock_id(self, key, stock_id):
        if not stock_id:
            raise ValueError('Must have a stock ID.')
        return stock_id
    
    @validates('purchase_value')
    def validates_value(self, key, purchase_value):
        if not purchase_value:
            raise ValueError('Stock must have a purchase_value.')
        return purchase_value
    
    @validates('quantity')
    def validates_quantity(self, key, quantity):
        if not quantity or quantity < 1:
            raise ValueError('Quantity must be positive number')
        return quantity

    def __repr__(self):
        return f'<Portfolio for User ID {self.user_id}: contains: {self.stock_id}'
    
class TotalExpense(db.Model, SerializerMixin):
    __tablename__ = 'total_expenses'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    expense_id = db.Column(db.Integer, db.ForeignKey('expenses.id'), nullable=False)

    serialize_rules = ('-user.total_expenses', '-expense.total_expenses')

    @validates('user_id')
    def validates_user_id(self, key, user_id):
        if not user_id:
            raise ValueError('Must have user ID.')
        return user_id
    
    @validates('expense_id')
    def validates_expense_id(self, key, expense_id):
        if not expense_id:
            raise ValueError('Must have expense ID.')
        return expense_id


    def __repr__(self):
        return f'<Total expense for User ID {self.user_id}: expense ID: {self.expense_id}'