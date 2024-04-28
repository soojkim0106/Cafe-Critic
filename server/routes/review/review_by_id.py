from .. import (review, db, review_schema, login_required, g, session, request, Resource, Review)

class ReviewById(Resource):
    @login_required
    def patch(self,id):
        if g.review:
            try:
                data = request.json
                
                updated_review = review_schema.load(data, instance=g.review, partial=True)
                db.session.commit()
                return review_schema(updated_review), 200
            except Exception as e:
                db.session.rollback()
                return {"error": str(e)}, 404
        else:
            return {"error": F"Review {id} not found"}
    @login_required
    def delete(self, id):
        try:
            if g.review:
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
        
