from .. import (request, Resource, db, review_schema, login_required, g, reviews_schema, Review, session)

class Reviews(Resource):
    @login_required
    def get(self):
        try:
            serialized_reviews = reviews_schema.dump(Review.query)
            return serialized_reviews, 200
        except Exception as e:
            return {"error": str(e)}, 400
        
    @login_required
    def post(self):
        try:
            data = request.json
            user_id = session.get('user_id')
            cafe_id = data.get('cafe_id')
            body = data.get('body')
            good_description = data.get('good_description')
            bad_description = data.get('bad_description')
            star_rating = data.get('star_rating')
            review = Review(user_id=user_id, cafe_id=cafe_id, body=body, good_description=good_description, bad_description=bad_description, star_rating=star_rating)
            db.session.add(review)
            db.session.commit()
            return review_schema.dump(review), 201
        except Exception as e:
            db.session.rollback()
            return {"message": str(e)}, 422