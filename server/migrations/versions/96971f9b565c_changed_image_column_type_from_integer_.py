"""changed image column type from integer to string

Revision ID: 96971f9b565c
Revises: aeed4643aecd
Create Date: 2023-08-26 12:22:16.569695

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '96971f9b565c'
down_revision = 'aeed4643aecd'
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
