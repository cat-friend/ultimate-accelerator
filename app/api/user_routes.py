from flask import Blueprint, request
from flask_login import login_required
from app.api.user_challenge import User_Challenge_Repository
from app.models import User, db
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


# todo: move this to the challenges route and turn this into a /challenges/?user=id route instead
# @user_routes.route('/<int:id>/challenges', methods=['GET'])
# def user_challenges(id):
#     """
#     GET request retrieves all challenges for the user.
#     """
#     user_challenges = User_Challenge_Repository.get_user_challenges(id)
#     return {"challenges": [user_challenge.to_dict() for user_challenge in user_challenges]}

# todo: get rid of bio, only allow to change username
# @user_routes.route('/<int:id>', methods=['GET', 'PUT'])
# @login_required
# def user(id):
#     """
#     GET request to retrieve on user
#     PUT request to edit user info
#     """
#     user = User.query.get(id)
#     if request.method == "PUT":
#         form = UserForm()
#         form['csrf_token'].data = request.cookies['csrf_token']
#         if form.validate_on_submit():
#             bio = form.data["bio"]
#             user.bio = bio
#             db.session.add(user)
#             db.session.commit()
#         elif form.errors:
#             return {'errors': validation_errors_to_error_messages(form.errors)}, 401
#     return user.to_dict()
