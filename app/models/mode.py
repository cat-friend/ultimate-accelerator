from .db import db
from sqlalchemy.sql import func

class Mode(db.Model):
    __tablename__ = 'modes'

    id = db.Column(db.Integer, primary_key=True)
    mode = db.Column(db.String(40), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'mode': self.mode
        }
