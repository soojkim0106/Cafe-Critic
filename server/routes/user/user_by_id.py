from .. import( request, g, Resource, User, db, user_schema, login_required, g, session)

class UserById(Resource):
    @login_required
    def patch(self,id):
        user = db.session.get(User, session["user_id"])
        
        if not user:
            return {"error": f"User not {id} found"}, 404
        try:
            data = (request.json)

            updated_user = user_schema.load(data, instance=user, partial=True)
            db.session.commit()
            return user_schema.dump(updated_user), 200
        except Exception as e:
                db.session.rollback()
                return {"error": str(e)}, 400
    @login_required
    def delete(self,id):
        user = db.session.get(User, session["user_id"])
        try:
            if user:
                db.session.delete(user)
                db.session.commit()
                return {}, 204
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 404
        
    @login_required
    def get(self,id):
        user = db.session.get(User, session["user_id"])
        try:
            if user:
                return user_schema.dump(user), 200
        except Exception as e:
            return {"error": str(e)}, 400