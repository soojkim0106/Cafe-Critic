from . import ma, Comment, fields, validate, validates, ValidationError



class CommentSchema(ma.SQLAlchemyAutoSchema):
    
    class Meta:
        model = Comment
        load_instance = True
        fields = ["id", "body", "user_id", "review_id", "created_at", "updated_at"]
    
    review = fields.Nested(
        "ReviewSchema",
        exclude=("comments",),
    )
    
    # user = fields.Nested(
    #     "UserSchema",
    #     only=("id", "username"),
    # )
        
    body = fields.String(required=True, validate=validate.Length(min=1,error="You cannot leave comment with only 1 character."))
    # user_id = fields.Integer(required=True)
    # review_id = fields.Integer(required=True)


#!For ONE cafe
comment_schema = CommentSchema()

#! For MULTIPLE cafes
comments_schema = CommentSchema(many=True)