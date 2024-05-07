from .. import (review, db, review_schema, login_required, g, session, request, Resource, Review)

class ReviewById(Resource):
    @login_required
    def patch(self,id):
        if not g.review or g.review.user_id != session["user_id"]:
            return {"error": F"Review {id} not found"}, 404
        try:
            data = request.json
            updated_review = review_schema.load(data, instance=g.review, partial=True)
            db.session.commit()
            return review_schema.dump(updated_review), 200
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 404

    @login_required
    def delete(self, id):
        try:
            if g.review and g.review.user_id == session["user_id"]:
                db.session.delete(g.review)
                db.session.commit()
                return {}, 204
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 404
        
    @login_required
    def get(self,id):
        try:
            if g.review:
                return review_schema.dump(g.review), 200
        
        except Exception as e:
            return {"error": str(e)}, 400
        
