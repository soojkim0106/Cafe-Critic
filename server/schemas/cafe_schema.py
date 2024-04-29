from . import ma, Cafe, fields, validate, validates, ValidationError

class CafeSchema(ma.SQLAlchemyAutoSchema):
    
    class Meta:
        model = Cafe
        load_instance = True
        exclude = ["created_at", "updated_at"]
        
    users = fields.Nested(
        "UserSchema",
        only=("id", "username"),
        many=True,
)
    
    reviews = fields.Nested(
        "ReviewSchema",
        many=True,
        only=("id", "body"),
    )
        
    name = fields.String(required=True, validate=validate.Length(min=2,error="Cafe name must be more than 2 characters"))
    address = fields.String(required=True, validate=validate.Length(min=10, error="Address must be more than 10 characters"))
    image = fields.String(validate=validate.Regexp(
        r".*\.(jpeg|png|jpg)", error="File URI must be in JPEG, JPG, or PNG format"
        ),)

#!For ONE cafe
cafe_schema = CafeSchema()

#! For MULTIPLE cafes
cafes_schema = CafeSchema(many=True)