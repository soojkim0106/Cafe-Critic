from .. import (request, app, db, Resource, g, login_required, comment_schema, Comment)

class CommentById(Resource):
    @login_required
    def patch(self,id):
        if not g.comment:
            return {"error": f"Comment {id} not found"}, 404
        try:
            data = request.json
            updated_comment = comment_schema.load(data, instance=g.comment, partial=True)
            db.session.commit()
            return comment_schema.dump(updated_comment), 200
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 400
    
    def delete(self, id):
        try:
            if g.comment:
                db.session.delete(g.comment)
                db.session.commit()
                return {}, 204
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 404