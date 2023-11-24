from .database import db
from sqlalchemy.sql import func


class ClanUsers(db.Model):
    __tablename__ = 'clanusers'

    id = db.Column(db.Integer, primary_key=True)
    clan_id = db.Column(db.Integer, db.ForeignKey("clans.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        "users.id"), nullable=False, unique=True)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())

    user = db.relationship("User", back_populates="clan_users")
    clan = db.relationship("Clan", back_populates="members")

    def to_dict(self):
        return {
            'id': self.id,
            'clan_id': self.clan_id,
            'user_id': self.user_id,
            'member': self.user.clan(),
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

    def to_user(self):
        if self.clan_id:
            return {'clan_id': self.clan_id}
        else:
            return {'clan_id': None}
