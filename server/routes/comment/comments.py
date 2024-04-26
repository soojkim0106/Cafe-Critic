from .. import (request, Resource, db, comment_schema, login_required, g)

class Comments(Resource):
    @login_required
    def post(self):
        try:
            data = request.json
            comment = comment_schema.load(data)
            db.session.add(comment)
            db.session.commit()
            return comment_schema.dump(comment), 201
        except Exception as e:
            db.session.rollback()
            return {"message": str(e)}, 422