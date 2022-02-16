from .db import db
from sqlalchemy.sql import func


class UserChallenge(db.Model):
    __tablename__ = 'userchallenges'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    challenge_label = db.Column(db.String(255), nullable=False)
    challenge_type_id = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(16), default="open")
    value = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'challenge_label': self.challenge_label,
            'challenge_type_id': self.challenge_type_id,
            'status': self.status,
            'value': self.value,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
