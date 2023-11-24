from .database import db
from sqlalchemy.sql import func

class WeaponType(db.Model):
    __tablename__ = 'weapontypes'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(40), nullable=False)

    weapons = db.relationship("Weapon", back_populates="weapon_type")

    def to_dict(self):
        return {
            'id': self.id,
            'type': self.type
        }
