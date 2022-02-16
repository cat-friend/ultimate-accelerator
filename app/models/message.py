from .db import db
from sqlalchemy.sql import func

class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    clan_id = db.Column(db.Integer, nullable=False)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.name,
            'clan_id': self.type,
            'message': self.message,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
