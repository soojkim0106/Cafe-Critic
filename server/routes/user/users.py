from .. import (api, Resource, request, User, db, user_schema, users_schema)

class Users(Resource):
    # def get(self):
    #     try:
    #         serialized_users = users_schema.dump(User.query)
    #         return serialized_users, 200
        
    #     except Exception as e:
    #         return {"error": str(e)}, 400
        
    def post(self):
        try:
            data = (
                request.get_json()
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