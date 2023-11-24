from .database import db


class Legend(db.Model):
    __tablename__ = 'legends'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False, unique=True)
    type = db.Column(db.String(40), nullable=False)

    user_challenge_dimension_table = db.relationship("UserChallengeDimensionTable", back_populates="legends")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'type': self.type
        }
