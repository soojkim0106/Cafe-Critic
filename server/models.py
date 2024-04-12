# models.py

from config import db, bcrypt
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import relationship

class Role(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    users = relationship('User', back_populates='role')

class Department(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    users = relationship('User', back_populates='department')
    time_logs = relationship('TimeLog', secondary='user_time_log', back_populates='departments')

class User(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'), nullable=False)
    department_id = db.Column(db.Integer, db.ForeignKey('department.id'), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    time_logs = relationship('TimeLog', backref='user')
    role = relationship('Role', back_populates='users')
    department = relationship('Department', back_populates='users')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

class TimeLog(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    clock_in = db.Column(db.TIMESTAMP, nullable=False)
    clock_out = db.Column(db.TIMESTAMP)
    total_hours = db.Column(db.Numeric)
    status = db.Column(db.String(20), nullable=False)  # Pending, Approved, Rejected
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    departments = relationship('Department', secondary='user_time_log', back_populates='time_logs')

class UserTimeLog(db.Model):
    __tablename__ = 'user_time_log'
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    timelog_id = db.Column(db.Integer, db.ForeignKey('time_log.id'), primary_key=True)
    department_id = db.Column(db.Integer, db.ForeignKey('department.id'), nullable=False)  # Foreign key to Department
    user = relationship(User, backref=db.backref("user_time_log_entries"))
    time_log = relationship(TimeLog, backref=db.backref("user_time_log_entries"), overlaps="departments")  # Update overlaps parameter
    department = relationship(Department, overlaps="departments")  # Update overlaps parameter