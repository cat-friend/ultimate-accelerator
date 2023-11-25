from app.models import User, db, commit_document_to_db

class User_Repository():
    def __init__(self):
        pass

    def get_user(email: str):
        """
        Gets one user from the database
        """
        user = User.query.filter(User.email == email.upper()).first()
        return user

    def create_user(self, username: str, email: str, password: str):
        """
        Creates a new user in the database
        """
        user = User(username, email.upper(), password)
        commit_document_to_db(user)
        return user.to_dict()
