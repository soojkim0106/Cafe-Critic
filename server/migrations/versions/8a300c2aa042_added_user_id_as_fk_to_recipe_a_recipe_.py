"""added user id as fk to recipe, a recipe must belong to a user

Revision ID: 8a300c2aa042
Revises: 63fbd3f8a6a4
Create Date: 2023-08-25 17:24:33.323492

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8a300c2aa042'
down_revision = '63fbd3f8a6a4'
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
