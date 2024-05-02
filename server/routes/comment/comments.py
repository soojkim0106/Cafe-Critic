from .. import (request, Resource, db, comment_schema, login_required, g, Comment, comments_schema, session)

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
    
    @login_required
    def get(self):
        try:
            serialized_comments = comments_schema.dump(Comment.query)
            return serialized_comments, 200
        except Exception as e:
            return {"error": str(e)}, 400