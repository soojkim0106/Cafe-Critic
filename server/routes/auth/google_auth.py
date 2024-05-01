from .. import request, session, Resource
from models.user import User
from schemas.user_schema import UserSchema
from config import db
from google.auth.transport import requests
from google.oauth2 import id_token
import os


user_schema = UserSchema(session=db.session)
CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID")

class GoogleAuth(Resource):
    def post(self):
        try:
            data = request.json
            token = data.get("id_token")
            if not token:
                return {"error": "Missing ID token"}, 400
            id_token_bytes = token.encode("utf-8")
            id_info = id_token.verify_oauth2_token(id_token_bytes, requests.Request(), CLIENT_ID)

            if user := User.query.filter_by(email=id_info.get("email")).first():
                try:
                    serialized_user = user_schema.dump(user)
                    return serialized_user, 200
                except Exception as e:
                    return {"error": str(e)}, 401
            else:
                try:
                    user_data = {
                        "username": id_info.get("name"),
                        "email": id_info.get("email"),
                        "password_hash": "Passwordtofix1!",
                        "current_password": "Passwordtofix1!",
                    }

                    user_schema.validate(user_data)
                    new_user = user_schema.load(user_data)
                    # new_user.password_hash = "passwordtofix"
                    # new_user.current_password = "passwordtofix"
                    db.session.add(new_user)
                    db.session.commit()

                    serialized_user = user_schema.dump(new_user)
                    return serialized_user, 201
                except Exception as e:
                    db.session.rollback()
                    return {"error": str(e)}, 400
        except Exception as e:
            return {"error": str(e)}, 400