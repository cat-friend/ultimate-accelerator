from app.models import User, db


def get_user(email: str):
    """
    Gets one user from the database
    """
    return

def create_user(username: str, email: str, password: str):
    """
    Creates a new user in the database
    """
    user = User(username, email, password)
    db.session.add(user)
    db.session.commit()
    return user.to_dict()
