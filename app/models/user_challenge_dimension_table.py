from .db import db
from sqlalchemy.sql import func


class UserChallengeDimensionTable(db.Model):
    __tablename__ = 'userchallengesdimensiontable'

    id = db.Column(db.Integer, primary_key=True)
    user_challenge_id = db.Column(db.Integer, db.ForeignKey("userchallenges.id"), nullable=False)
    weapon_id = db.Column(db.Integer, db.ForeignKey("userchallenges.id"))
    mode_id = db.Column(db.Integer, db.ForeignKey("modes.id"), nullable=False)
    legend_id = db.Column(db.Integer, db.ForeignKey("legends.id"))
    value = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())

    user_challenges = db.relationship("UserChallenge", back_populates="challenge_id_dimension_table")
    modes = db.relationship("Mode", back_populates="user_challenge_dimension_table")
    legends = db.relationship("Legend", back_populates="user_challenge_dimension_table")

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
