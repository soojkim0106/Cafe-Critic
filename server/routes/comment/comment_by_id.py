from .. import (request, app, db, Resource, g, login_required, comment_schema, Comment, session)

class CommentById(Resource):

    @login_required
    def delete(self, id):
        try:
            if g.comment and g.comment.user_id == session["user_id"]:
                db.session.delete(g.comment)
                db.session.commit()
                return {}, 204
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 404
    