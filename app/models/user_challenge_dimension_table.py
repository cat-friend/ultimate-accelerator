from .db import db
from sqlalchemy.sql import func


class UserChallengeDimensionTable(db.Model):
    __tablename__ = 'userchallengesdimensiontable'

    id = db.Column(db.Integer, primary_key=True)
    user_challenge_id = db.Column(db.Integer, db.ForeignKey("userchallenges.id"), nullable=False)
    weapon_id = db.Column(db.Integer, db.ForeignKey("weapons.id"), default=None)
    mode_id = db.Column(db.Integer, db.ForeignKey("modes.id"), nullable=False)
    legend_id = db.Column(db.Integer, db.ForeignKey("legends.id"), default=None)
    value = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())

    user_challenges = db.relationship("UserChallenge", back_populates="challenge_id_dimension_table")
    modes = db.relationship("Mode", back_populates="user_challenge_dimension_table")
    legends = db.relationship("Legend", back_populates="user_challenge_dimension_table")

    def to_dict(self):
        return {
            'id': self.id,
            'user_challenge_id': self.user_challenge_id,
            'weapon_id': self.weapon_id,
            'mode_id': self.mode_id,
            'legend_id': self.legend_id,
            'value': self.value,
            'created_at': self.created_at,
        }

    def to_accel(self):
        return {
            'challenge': self.user_challenges.to_dict()
        }
