from .db import db

class Weapon(db.Model):
    __tablename__ = 'weapons'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    type = db.Column(db.String(40), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'type': self.type
        }
