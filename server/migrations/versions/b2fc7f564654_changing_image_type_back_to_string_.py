"""changing image type back to string, gonna use cloudinary for image storing

Revision ID: b2fc7f564654
Revises: 11b6f2cc8bc4
Create Date: 2023-08-28 11:17:39.700618

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b2fc7f564654'
down_revision = '11b6f2cc8bc4'
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
