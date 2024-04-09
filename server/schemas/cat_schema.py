from config import ma
from models.cat import Cat

class CatSchema(ma.SQLAlchemyAutoSchema):
    
    class Meta:
        model = Cat
        load_instance = True