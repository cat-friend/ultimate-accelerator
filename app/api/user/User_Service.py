from operator import itemgetter
from . import User_Repository
from flask_login import login_user

class User_Service:
    def __init__(self):
        self.user_repository = User_Repository()

    def create_user(self, data):
        username, email, password = itemgetter('username', 'email', 'password')(data)
        user_exists = self.user_repository.get_user(email)
        if user_exists:
            raise ValueError('Email address already in use.')
        new_user = self.user_repository.create_user(**{username, email, password})
        return new_user

    def login(self, data):
        email, password = itemgetter('email', 'password')(data)
        user = self.user_repository.get_user(email)
        if not user or not user.check_password(password):
            raise ValueError('Invalid login credentials')
        login_user(user)
        return user.to_dict()

    def update_user(self, data):
        pass
