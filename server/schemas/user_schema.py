from config import ma, db
import re
from models.user import User
from marshmallow import validate, validates, ValidationError, fields, validate, validates_schema

class UserSchema(ma.SQLAlchemyAutoSchema):
    
    class Meta:
        model = User
        load_instance = True
        
        cats = fields.Nested(
            "CatSchema",
            only=("id", "name"),
            exclude=("user",),
            many=True,
        )
        
        username = fields.String(required=True, validate=validate.Length(min=2,max=20))
        email = fields.String(required=True, validate=[validate.Email()])
        _password_hash = fields.String(required=True, validate=validate.Length(min=5, max=10))
        # interest = fields.String(required=False)
        
        @validates_schema
        def validate_email(self, data, **kwargs):
            email = data.get("email")
            
            if db.session.get(User, email).count():
                raise ValidationError(f"Email {email} already exists.")
        
user_schema = UserSchema()
users_schema = UserSchema(many=True)