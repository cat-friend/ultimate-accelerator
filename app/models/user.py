from .database import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    bio = db.Column(db.String(511))
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    owned_clan = db.relationship("Clan", uselist=False, back_populates="owner")
    clan_users = db.relationship("ClanUsers", uselist=False, back_populates="user")
    clan_message_user = db.relationship("Message", back_populates="user")
    user_challenges_userid = db.relationship("UserChallenge", back_populates="user")


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)


    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        if self.clan_users:
            return {
                'id': self.id,
                'username': self.username,
                'bio': self.bio,
                'clan_id':  self.clan_users.to_user()
            }
        else:
            return {
                'id': self.id,
                'username': self.username,
                'bio': self.bio,
                'clan_id':  {'clan_id': None}
            }


    def clan(self):
        return {
            'user_id': self.id,
            'username': self.username
        }
