from .. import (Resource, login_required, cafes_schema, Cafe)

class Cafes(Resource):
    @login_required
    def get(self):
        try:
            serialized_cafes = cafes_schema.dump(Cafe.query)
            return serialized_cafes, 200
        except Exception as e:
            return {"error": str(e)}, 400
        