from config import db, bcrypt
from sqlalchemy_serializer import SerializerMixin

# Association table for many-to-many relationship between TimeLogs and Departments
user_time_log = db.Table(
    'user_time_log',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('timelog_id', db.Integer, db.ForeignKey('time_log.id'), primary_key=True),
    db.Column('department_id', db.Integer, db.ForeignKey('department.id'), primary_key=True)
)

class Role(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)
    description = db.Column(db.Text)
    users = db.relationship('User', back_populates='role')

class Department(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)
    users = db.relationship('User', back_populates='department')
    time_logs = db.relationship('TimeLog', secondary=user_time_log, back_populates='departments')

class User(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'), nullable=False)
    department_id = db.Column(db.Integer, db.ForeignKey('department.id'), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    time_logs = db.relationship('TimeLog', backref='user')
    role = db.relationship('Role', back_populates='users')
    department = db.relationship('Department', back_populates='users')

class TimeLog(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    clock_in = db.Column(db.TIMESTAMP, nullable=False)
    clock_out = db.Column(db.TIMESTAMP)
    total_hours = db.Column(db.Numeric)
    status = db.Column(db.String(20), nullable=False)  # Pending, Approved, Rejected
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    departments = db.relationship('Department', secondary=user_time_log, back_populates='time_logs')

# Ensure you correctly create and manage your database, including handling migrations
# and potentially resetting your database to integrate these changes.
