from faker import Faker
from app import db, app
from models import User, Role, Department, TimeLog, user_time_log
from werkzeug.security import generate_password_hash
from random import choice, sample

# Instantiate Faker object
fake = Faker()

def seed_database():
    db.session.query(user_time_log).delete()
    db.session.query(TimeLog).delete()
    db.session.query(User).delete()
    db.session.query(Role).delete()
    db.session.query(Department).delete()
    db.session.commit()

    # Create and commit roles
    admin_role = Role(name='Manager', description='Administrator role')
    employee_role = Role(name='Employee', description='Employee role')
    db.session.add(admin_role)
    db.session.add(employee_role)
    db.session.commit()

    # Create and commit departments
    admin_department = Department(name='Admin')
    team_member_department = Department(name='Team Member')
    db.session.add(admin_department)
    db.session.add(team_member_department)
    db.session.commit()

    # Seed users
    users = []
    for _ in range(10):
        user = User(
            username=fake.user_name(),
            name=fake.name(),
            email=fake.email(),
            password_hash=generate_password_hash(fake.password()),
            role=choice([admin_role, employee_role]),  # directly use role objects
            department=choice([admin_department, team_member_department])  # directly use department objects
        )
        db.session.add(user)
    db.session.commit()  # Commit users after they're added

    # Seed time logs
    time_logs = []
    for user in users:
        for _ in range(2):  # Assume 2 logs per user
            time_log = TimeLog(
                date=fake.date_this_year(),
                clock_in=fake.date_time_this_year(),
                clock_out=fake.date_time_this_year(),
                total_hours=fake.random_number(digits=2),
                status=choice(['Pending', 'Approved', 'Rejected']),
                user=user
            )
            time_logs.append(time_log)
    db.session.bulk_save_objects(time_logs)
    db.session.commit()

    print("Database seeded successfully.")

if __name__ == '__main__':
    with app.app_context():
        seed_database()
