from config import ma
from marshmallow import validate, validates, ValidationError, fields, validate
from models.cat import Cat

class CatSchema(ma.SQLAlchemyAutoSchema):
    
    class Meta:
        model = Cat
        load_instance = True
        
        users = fields.Nested(
            "UserSchema",
            only=("id", "username", "email"),
            exclude=("cat",),
            many=True,
        )
        
        name = fields.String(required=True, validate=validate.Length(min=2,max=15))
        age = fields.Integer(validate=validate.Range(min=1, max=20))
        # gender = fields.String()
        # breed = fields.String()
        # temperament = fields.String()
        image = fields.String(validate=validate.Regexp(
            r".*\.(jpeg|png|jpg)", error="File URI must be in JPEG, JPG, or PNG format"
            ),
        )

#!For ONE cat
cat_schema = CatSchema()

#! For MULTIPLE cats
cats_schema = CatSchema(many=True)