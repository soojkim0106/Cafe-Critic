"""empty message

Revision ID: 467c076ec22c
Revises: abd9b7420356
Create Date: 2023-10-18 14:09:54.049951

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '467c076ec22c'
down_revision = 'abd9b7420356'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('username', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('password', sa.String(), nullable=True))
        batch_op.drop_column('lname')
        batch_op.drop_column('fname')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('fname', sa.VARCHAR(), nullable=True))
        batch_op.add_column(sa.Column('lname', sa.VARCHAR(), nullable=True))
        batch_op.drop_column('password')
        batch_op.drop_column('username')
        batch_op.drop_column('name')

    # ### end Alembic commands ###
