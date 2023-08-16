from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db, bcrypt


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String)
    profile_image = db.Column(db.String, default=None)

    @property
    def password_hash(self):
        return self._password_hash
        #raise Exception('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    #relationships
    trips = db.relationship('Trip', backref='user')
    places = association_proxy('trips','place')

    #serialize rules
    serialize_rules = ('-trips.user','-places.users','-_password_hash',)

    #validations
    @validates('username')
    def validate_username(self,key,new_username):
        if not 1 <= len(new_username) <= 25:
            raise ValueError('Username must be between 1 and 25 characters')
        return new_username

    def __repr__(self):
        return f'<username:{self.username}>'
    

class Place(db.Model, SerializerMixin):
    __tablename__ = 'places'

    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String, nullable=False)
    state = db.Column(db.String)
    country = db.Column(db.String)
    image = db.Column(db.String, default=None)
    
    # add relationship
    trips = db.relationship('Trip', backref='place')

    # add serialization rules
    users = association_proxy('trips', 'users')
    serialize_rules = ('-guests.episode',)

    def __repr__(self):
        return f'<place:{self.city}, {self.state}, {self.country}>'


class Trip(db.Model, SerializerMixin):
    __tablename__ = 'trips'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    place_id = db.Column(db.Integer, db.ForeignKey('places.id'), nullable=False)
    rating = db.Column(db.Integer)
    comments = db.Column(db.String)
    favorite = db.Column(db.Boolean)

    # user = db.relationship('User', back_populates = 'trips')
    # place = db.relationship('Place', back_populates = 'trips')

    # add serialization rules
    serialize_rules = ('-place.trips', '-user.trips')
    
    # add validation
    @validates('rating')
    def validate_rating(self, key, rating):
        if rating > 5 or rating < 1:
            raise ValueError('The rating must be a number between 1 and 5.')
        return rating
    
    def __repr__(self):
        return f'<trip: {self.user_id}, {self.place_id}, {self.rating}, {self.comments}'