from config import ma
from marshmallow import validate, validates, ValidationError, fields, validate
from models.comment import Comment


class CommentSchema(ma.SQLAlchemyAutoSchema):
    
    class Meta:
        model = Comment
        load_instance = True
        exclude = ["created_at", "updated_at"]
        
    body = fields.String(required=True, validate=validate.Length(min=1,error="You cannot leave comment with only 1 character."))

#!For ONE cafe
comment_schema = CommentSchema()

#! For MULTIPLE cafes
comments_schema = CommentSchema(many=True)