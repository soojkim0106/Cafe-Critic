from config import ma
from models.adopt_foster import AdoptFoster

class AdoptFosterSchema(ma.SQLAlchemyAutoSchema):
    
    class Meta:
        model = AdoptFoster
        load_instance = True