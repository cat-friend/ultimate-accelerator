from app.models import User, db

class user_repository():
    def __init__(self):
        pass

    def get_user(email: str):
        """
        Gets one user from the database
        """
        user = User.query.filter(User.email == email).first()
        return user

    def login(self, email: str, password: str):
        """
        Logs a user in
        """
        # get the user
        user = self.get_user(email)
        # check the password
        if not user or not user.check_password(password):
            raise ValueError('Invalid login credentials')
        return user

    def create_user(self, username: str, email: str, password: str):
        """
        Creates a new user in the database
        """
        existing_user = self.get_user(email)
        if existing_user:
            raise ValueError('Email address already in use.')
        user = User(username, email, password)
        db.session.add(user)
        db.session.commit()
        return user
