"""fixed relationship between clan and users 02

Revision ID: 7c47d0cc76ff
Revises: 79f109a465d5
Create Date: 2022-02-16 13:24:53.901391

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7c47d0cc76ff'
down_revision = '79f109a465d5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('users_clan_id_fkey', 'users', type_='foreignkey')
    op.drop_column('users', 'clan_id')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('clan_id', sa.INTEGER(), autoincrement=False, nullable=True))
    op.create_foreign_key('users_clan_id_fkey', 'users', 'clans', ['clan_id'], ['id'])
    # ### end Alembic commands ###