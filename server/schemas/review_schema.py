from . import ma, Review, fields, validate, validates, ValidationError


class ReviewSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Review
        load_instance = True
        fields=["id", "user_id", "cafe_id", "body", "star_rating", "good_description", "bad_description", "username", "created_at", "updated_at"]
        
    cafe = fields.Nested(
        "CafeSchema",
        only=("id", "name"),
    )
    
    # user = fields.Nested(
    #     "UserSchema",
    #     only=("id", "username",),
    #     many=True,
    # )
    comments = fields.Nested(
        "CommentSchema",
        many=True,
        only=("id", "body"),
    )
        
    # Ensure the field names match the actual field names in your model
    user_id = fields.Integer(required=True)
    cafe_id = fields.Integer(required=True)
    body = fields.String(required=True, validate=validate.Length(min=2, error="You cannot leave shorter than 2 character review"))
    star_rating = fields.Integer(required=True, validate=validate.Range(min=1, max=5, error="You cannot leave star rating that is lower than 1 and greater than 5"))
    good_description = fields.String(required=True, validate=validate.Length(min=2, error="You cannot leave shorter than 2 character review"))
    bad_description = fields.String(required=True, validate=validate.Length(min=2, error="You cannot leave shorter than 2 character review"))
    
        

review_schema = ReviewSchema()
        
reviews_schema = ReviewSchema(many=True)