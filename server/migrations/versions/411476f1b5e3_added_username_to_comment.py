"""added username to comment

Revision ID: 411476f1b5e3
Revises: bb8ca844defa
Create Date: 2024-04-30 14:59:47.237538

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '411476f1b5e3'
down_revision = 'bb8ca844defa'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('comments', schema=None) as batch_op:
        batch_op.add_column(sa.Column('username', sa.String(), nullable=True))

    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.drop_column('liked')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.add_column(sa.Column('liked', sa.INTEGER(), nullable=True))

    with op.batch_alter_table('comments', schema=None) as batch_op:
        batch_op.drop_column('username')

    # ### end Alembic commands ###