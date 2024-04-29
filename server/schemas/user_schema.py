from . import ma, User, fields, validate, validates, ValidationError



class UserSchema(ma.SQLAlchemyAutoSchema):
    
    class Meta:
        model = User
        load_instance = True
        exclude=("_password_hash",)
        
    cafes = fields.Nested(
        "CafeSchema",
        only=("id","name","address"),
        many=True,
    )
    
    reviews = fields.Nested(
        "ReviewSchema",
        many=True,
        only=("id","body"),
    )
    
    comments = fields.Nested(
        "CommentSchema",
        many=True,
        only=("id","body"),
    )
    
    username = fields.String(required=True, validate=validate.Length(min=2,max=20))
    email = fields.String(required=True, validate=[validate.Email()])
    password_hash = fields.String(data_key="password_hash", required=True, validate=validate.Length(min=5), load_only=True)
    current_password = fields.String(data_key="current_password", required=True, load_only=True)
    
    def load(self, data, instance=None, *, partial=False, **kwargs):
        loaded_instance = super().load(
            data, instance=instance, partial=partial, **kwargs
        )
        
        for key, value in data.items():
            setattr(loaded_instance, key, value)
        return loaded_instance

user_schema = UserSchema()
users_schema = UserSchema(many=True)