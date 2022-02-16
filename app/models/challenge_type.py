from .db import db


class ChallengeType(db.Model):
    __tablename__ = 'challengetypes'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(40), nullable=False, unique=True)

    userchallenges_id = db.relationship("UserChallenge", back_populates="challenges_id")

    def to_dict(self):
        return {
            'id': self.id,
            'type': self.type
        }
