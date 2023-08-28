from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt
# Models go here!

recipe_book = db.Table('recipe_book', 
                       db.Column('recipe.id', db.Integer, db.ForeignKey('recipes.id'), primary_key=True),
                       db.Column('book.id', db.Integer, db.ForeignKey('books.id'), primary_key=True)
)

class User(db.Model, SerializerMixin):

    __tablename__ = 'users'

    serialize_rules = ('-_password_hash', '-user_books',)

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String)

    user_books = db.relationship('Book', back_populates='user', cascade='all, delete, delete-orphan')

    @hybrid_property
    def password_hash(self):
        raise Exception('Password hashes may not be viewed')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash =  bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8')
        )
        
    @validates('username')
    def validate_username(self, key, name):
        if not name or not isinstance(name, str):
            raise ValueError('Username must be non-empty string.')
        return name
    
class Book(db.Model, SerializerMixin):

    __tablename__ = 'books'

    serialize_rules = ('-user',)

    id = db.Column(db.Integer, primary_key = True)
    category = db.Column(db.String, nullable = False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'))

    user = db.relationship('User', back_populates='user_books')
    recipes = db.relationship('Recipe', secondary=recipe_book, back_populates='user_books')

    @validates('category')
    def validate_category(self, key, category):
        if category not in ['Breakfast', 'Lunch', 'Dinner', 'Dessert']:
            raise ValueError
        return category
    
class Recipe(db.Model, SerializerMixin):

    __tablename__ = 'recipes'

    serialize_rules = ('-user_books',)

    id = db.Column(db.Integer, primary_key = True)
    description = db.Column(db.String, nullable = False)
    ingredients = db.Column(db.String, nullable = False)
    user_id = db.Column(db.String, nullable = False)
    image = db.Column(db.LargeBinary)

    user_books = db.relationship('Book', secondary=recipe_book, back_populates='recipes')

    @validates('description')
    def validate_description(self, key, desc):
        if not desc or len(desc) < 1 or not isinstance(desc, str):
            raise ValueError
        return desc

    