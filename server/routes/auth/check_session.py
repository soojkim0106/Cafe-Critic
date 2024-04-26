from .. import (
    Resource, db, session, User, login_required
)

class Me(Resource):
    @login_required
    def get(self):
        try:
            if "user_id" not in session:
                return {"message": "Please log in first!"}, 400
            user = db.session.get(User, session.get("user_id"))
            return user.to_dict(), 200
        except Exception as e:
            return {"error": str(e)}