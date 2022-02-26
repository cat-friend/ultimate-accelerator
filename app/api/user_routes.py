from flask import Blueprint, request
from flask_login import login_required
from app.models import User, db, UserChallenge
from app.forms import UserForm

user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f': {error}')
    return errorMessages

@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

@user_routes.route('/<int:id>/challenges', methods=['GET'])
def user_challenges(id):
    """
    GET request retrieves all challenges for the user.
    """
    user_challenges = UserChallenge.query.filter(UserChallenge.user_id==id).all()
    return {"challenges": [user_challenge.to_dict() for user_challenge in user_challenges]}

@user_routes.route('/<int:id>', methods=['GET', 'PUT'])
@login_required
def user(id):
    """
    GET request to retrieve on user
    PUT request to edit user info
    """
    user = User.query.get(id)
    if request.method == "PUT":
        form = UserForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            bio = form.data["bio"]
            user.bio = bio
            db.session.add(user)
            db.session.commit()
        elif form.errors:
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    return user.to_dict()
