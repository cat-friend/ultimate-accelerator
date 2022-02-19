"""all tables, all default values

Revision ID: 6b99abe62799
Revises: 
Create Date: 2022-02-17 13:29:46.589219

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6b99abe62799'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('challengetypes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('type', sa.String(length=40), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('type')
    )
    op.create_table('legends',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=40), nullable=False),
    sa.Column('type', sa.String(length=40), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('modes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('mode', sa.String(length=40), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('bio', sa.String(length=511), nullable=True),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('weapontypes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('type', sa.String(length=40), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('clans',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=40), nullable=False),
    sa.Column('owner_user_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['owner_user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name'),
    sa.UniqueConstraint('owner_user_id')
    )
    op.create_table('userchallenges',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('challenge_label', sa.String(length=255), nullable=False),
    sa.Column('challenge_type_id', sa.Integer(), nullable=False),
    sa.Column('status', sa.String(length=16), nullable=True),
    sa.Column('value', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['challenge_type_id'], ['challengetypes.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('weapons',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=40), nullable=False),
    sa.Column('type', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['type'], ['weapontypes.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('clanusers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('clan_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['clan_id'], ['clans.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('user_id')
    )
    op.create_table('messages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('clan_id', sa.Integer(), nullable=False),
    sa.Column('message', sa.Text(), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['clan_id'], ['clans.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('userchallengesdimensiontable',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_challenge_id', sa.Integer(), nullable=False),
    sa.Column('weapon_id', sa.Integer(), nullable=True),
    sa.Column('mode_id', sa.Integer(), nullable=False),
    sa.Column('legend_id', sa.Integer(), nullable=True),
    sa.Column('value', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['legend_id'], ['legends.id'], ),
    sa.ForeignKeyConstraint(['mode_id'], ['modes.id'], ),
    sa.ForeignKeyConstraint(['user_challenge_id'], ['userchallenges.id'], ),
    sa.ForeignKeyConstraint(['weapon_id'], ['weapons.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('userchallengesdimensiontable')
    op.drop_table('messages')
    op.drop_table('clanusers')
    op.drop_table('weapons')
    op.drop_table('userchallenges')
    op.drop_table('clans')
    op.drop_table('weapontypes')
    op.drop_table('users')
    op.drop_table('modes')
    op.drop_table('legends')
    op.drop_table('challengetypes')
    # ### end Alembic commands ###