from .. import (
    Resource, db, session, User, login_required, user_schema
)

class Me(Resource):
    def get(self):
        try:
            if "user_id" not in session:
                return {"message": "Please log in first!"}, 400
            if user := db.session.get(User, session.get("user_id")):
                return user_schema.dump(user), 200
        except Exception as e:
            return {"error": str(e)}
