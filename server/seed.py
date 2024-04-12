# seed.py

# Import necessary modules
from faker import Faker
from app import db, app
from models import User, Role, Department, TimeLog, UserTimeLog
from datetime import datetime
from random import choice as rc

# Instantiate Faker object
fake = Faker()

# Function to seed the database
def seed_database():
    # Create roles
    admin_role = Role(name='Admin', description='Administrator role')
    employee_role = Role(name='Employee', description='Employee role')

    # Add roles to the database
    db.session.add(admin_role)
    db.session.add(employee_role)
    db.session.commit()

    # Create departments
    engineering_department = Department(name='Engineering')
    sales_department = Department(name='Sales')

    # Add departments to the database
    db.session.add(engineering_department)
    db.session.add(sales_department)
    db.session.commit()

    # Seed users
    for _ in range(10):
        username = fake.user_name()
        name = fake.name()
        email = fake.email()
        password_hash = fake.password()
        role = rc([admin_role, employee_role])
        department = rc([engineering_department, sales_department])

        user = User(username=username, name=name, email=email, password_hash=password_hash, role=role, department=department)
        db.session.add(user)

    # Seed time logs
    for _ in range(20):
        user = User.query.order_by(db.func.random()).first()
        date = fake.date_time_this_year(before_now=True, after_now=False)
        clock_in = date
        clock_out = fake.date_time_between(start_date=date, end_date='now')
        status = rc(['Pending', 'Approved', 'Rejected'])

        time_log = TimeLog(user=user, date=date.date(), clock_in=clock_in, clock_out=clock_out, status=status)
        db.session.add(time_log)

    # Commit changes to the database
    db.session.commit()
    print("Database seeded successfully.")

# Run the seed_database function
if __name__ == '__main__':
    with app.app_context():
        seed_database()
