from .. import (api, Resource, request, User, db, user_schema, users_schema)

class Users(Resource):

    def post(self):
        try:
            data = (
                request.json
            )
            user = user_schema.load(
                data
            )
            db.session.add(user)
            db.session.commit()  
            return user_schema.dump(user), 201
        except Exception as e:
            db.session.rollback()
            return {"message": str(e)}, 422