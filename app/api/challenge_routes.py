from flask import Blueprint, request
from app.forms import ChallengeForm, EditChallengeForm, DeleteChallengeForm
from app.api.user_challenge import User_Challenge_Service
from app.api.denormalized_user_challenge import Denormalized_User_Challenge_Repository
from app.api.utils.queries import queries, QueryOptions

challenge_routes = Blueprint('challenges', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


def new_dimension_table_entry(user_challenge_id, value, weapon_ids=[], mode_ids=[], legend_ids=[]):
    Denormalized_User_Challenge_Repository.create_entry(**{user_challenge_id, value, weapon_ids, mode_ids, legend_ids})
    return


@challenge_routes.route('/', methods=['POST'])
def all_challenges():
    """
    POST requests post challenges to the user's UserChallenge table
    and to the interdimensional challenge table. If successful, the
    route returns JSON data needed for the front end. Else, the route
    returns error messages.
    """
    form = ChallengeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_challenge = User_Challenge_Service.create_challenge(form.data)
        return new_challenge
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@challenge_routes.route('/<int:user_id>', methods=['GET'])
def get_users_challenges(user_id):
    """
    Responds to GET requests with a specific user's UserChallenge.
    """
    user_challenge = User_Challenge_Service.get_users_challenges(user_id)
    return user_challenge


# this should be PATCH since we're only changing the status
# when we make ALL fields editable (except name/challenge str), it will still be a PATCH
@challenge_routes.route('/<int:challenge_id>', methods=['PUT'])
def edit_challenge(challenge_id):
    """
    PUT requests send in a new status for the UserChallenge.
    Function updates the entry in the database and returns
    the entry with the new status.
    """
    form = EditChallengeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        updated_challenge = User_Challenge_Service.update_challenge(challenge_id, form.data['status'])
        return updated_challenge
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@challenge_routes.route('/<int:challenge_id>', methods=['DELETE'])
def delete_challenge(challenge_id):
    """
    Retrieves a user_challenge with challenge_id of `:challenge_id` then deletes it from the database.
    Returns response status 200 if the user_challenge was deleted.
    Return response status 404 if the user_challenge wasn't found.
    """
    form = DeleteChallengeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        challenge = User_Challenge_Service.delete_challenge(challenge_id)
        if challenge.success:
            return {}, 200
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# todo: turn this into a query instead of a nested resource?
# todo: better route naming
@challenge_routes.route('/accelerate/<int:user_id>', methods=['GET'])
def calc_max(user_id):
    # todo: change this to an enum/db call
    result = User_Challenge_Service.get_efficient_challenges(user_id)
    return result
