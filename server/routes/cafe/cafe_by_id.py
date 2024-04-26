from .. import (request, g, Resource, Cafe, db, cafe_schema, login_required, g)

class CafeById(Resource):
    def get(self,id):
        try:
            return cafe_schema.dump(g.cafe), 200
        
        except Exception as e:
            return {"error": str(e)}, 400