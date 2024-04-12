from config import app, api, db, ma, bcrypt, jwt
from flask_restful import Resource
from flask import request, jsonify
from marshmallow import fields, ValidationError, EXCLUDE
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import User, TimeLog, Role

# Global Error Handling
@app.errorhandler(404)
def resource_not_found(e):
    return jsonify(error=str(e)), 404

@app.errorhandler(500)
def internal_server_error(e):
    return jsonify(error=str(e)), 500

# Define Marshmallow Schemas
class UserSchema(ma.Schema):
    id = fields.Int(dump_only=True)
    username = fields.Str(required=True, validate=lambda s: len(s) >= 3)
    name = fields.Str(required=True)
    email = fields.Email(required=True)
    role_id = fields.Int(required=True)
    department_id = fields.Int(required=True)
    password_hash = fields.Str(load_only=True, required=True, validate=lambda s: len(s) >= 6)

    class Meta:
        unknown = EXCLUDE

class TimeLogSchema(ma.Schema):
    id = fields.Int(dump_only=True)
    user_id = fields.Int(required=True)
    clock_in_time = fields.DateTime(required=True)
    clock_out_time = fields.DateTime()

user_schema = UserSchema()
users_schema = UserSchema(many=True)
timelog_schema = TimeLogSchema()

@app.route('/')
def index():
    return '<h1>Project Server</h1>'



# Authentication Endpoints
@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    user = User.query.filter_by(username=username).first()
    if user and bcrypt.check_password_hash(user.password_hash, password):
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token), 200
    return jsonify("Wrong username or password"), 401

@app.route('/register', methods=['POST'])
def register():
    try:
        data = user_schema.load(request.get_json())
        if User.query.filter_by(username=data['username']).first():
            return jsonify(message="User already exists"), 409
        data['password_hash'] = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        user = User(**data)
        db.session.add(user)
        db.session.commit()
        return jsonify(message="User created successfully"), 201
    except ValidationError as err:
        return jsonify(err.messages), 400

# Resource Classes with Validation and Admin Controls
class UserResource(Resource):
    @jwt_required()
    def get(self, user_id):
        user = User.query.get_or_404(user_id)
        return user_schema.dump(user)

    @jwt_required()
    def put(self, user_id):
        user = User.query.get_or_404(user_id)
        try:
            data = user_schema.load(request.get_json(), partial=True)
            data.pop('password_hash', None)  # Ignore password_hash if it's part of the request
            for key, value in data.items():
                setattr(user, key, value)
            db.session.commit()
            return user_schema.dump(user)
        except ValidationError as err:
            return {'errors': err.messages}, 400

    @jwt_required()
    def delete(self, user_id):
        user = User.query.get_or_404(user_id)
        db.session.delete(user)
        db.session.commit()
        return {'message': 'User deleted successfully'}, 204

class UserListResource(Resource):
    @jwt_required()
    def get(self):
        users = User.query.all()
        return users_schema.dump(users)

class TimeLogResource(Resource):
    @jwt_required()
    def get(self, user_id=None):
        current_user = get_jwt_identity()
        user = User.query.filter_by(username=current_user).first()
        if user.role.name == 'Admin' or not user_id:
            time_logs = TimeLog.query.all() if not user_id else TimeLog.query.filter_by(user_id=user_id).all()
            return {'time_logs': [timelog_schema.dump(tl) for tl in time_logs]}
        else:
            time_logs = TimeLog.query.filter_by(user_id=user.id).all()
            return {'time_logs': [timelog_schema.dump(tl) for tl in time_logs]}

    @jwt_required()
    def post(self, user_id=None):
        data = timelog_schema.load(request.get_json())
        user_id = user_id or get_jwt_identity()
        time_log = TimeLog(user_id=user_id, **data)
        db.session.add(time_log)
        db.session.commit()
        return timelog_schema.dump(time_log), 201

    @jwt_required()
    def put(self, time_log_id):
        current_user = get_jwt_identity()
        user = User.query.filter_by(username=current_user).first()
        time_log = TimeLog.query.get_or_404(time_log_id)
        
        if user.role.name == 'Admin' or time_log.user_id == user.id:
            data = timelog_schema.load(request.get_json(), partial=True)
            for key, value in data.items():
                setattr(time_log, key, value)
            db.session.commit()
            return timelog_schema.dump(time_log), 200
        return {'message': 'Unauthorized'}, 403

    @jwt_required()
    def delete(self, time_log_id):
        current_user = get_jwt_identity()
        user = User.query.filter_by(username=current_user).first()
        time_log = TimeLog.query.get_or_404(time_log_id)
        
        if user.role.name == 'Admin' or time_log.user_id == user.id:
            db.session.delete(time_log)
            db.session.commit()
            return {'message': 'TimeLog deleted'}, 204
        return {'message': 'Unauthorized'}, 403

# Setup API resources
api.add_resource(UserListResource, '/users')
api.add_resource(UserResource, '/users/<int:user_id>')
api.add_resource(TimeLogResource, '/timelogs', '/timelogs/<int:time_log_id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
