from flask import Blueprint, request
from app.api.user_challenge import user_challenge_repository
from app.models import UserChallenge, db
from app.forms import ChallengeForm, EditChallengeForm, DeleteChallengeForm
from app.seeds import seed_one_user
from app.forms import SeedUserForm
from app.api.user_challenge_dimension_table.user_challenge_dimension_repository import create_dimension_table_entry, get_entries
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
    create_dimension_table_entry(**{user_challenge_id, value, weapon_ids, mode_ids, legend_ids})
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
        challenge_label = form.data['challenge_label']
        challenge_type_id = form.data['challenge_type_id']
        user_id = form.data['user_id']
        value = form.data['value']
        new_challenge = UserChallenge(
            challenge_label=challenge_label,
            challenge_type_id=challenge_type_id,
            user_id=user_id,
            value=value)
        db.session.add(new_challenge)
        db.session.commit()
        weapon_id = form.data['weapon_id']
        mode_id = form.data['mode_id']
        legend_id = form.data['legend_id']
        user_challenge_id = new_challenge.id
        new_dimension_table_entry(
            user_challenge_id, value, weapon_id, mode_id, legend_id)
        return new_challenge.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@challenge_routes.route('/<int:id>', methods=['GET'])
def get_challenge(id):
    """
    Responds to GET requests with a specific user's UserChallenge.
    """
    user_challenge = user_challenge_repository.get_challenge(id)
    return user_challenge.to_dict()


# this should be PATCH since we're only changing the status
# when we make ALL fields editable (except name/challenge str), it will still be a PATCH
@challenge_routes.route('/<int:id>', methods=['PUT'])
def edit_challenge(id):
    """
    PUT requests send in a new status for the UserChallenge.
    Function updates the entry in the database and returns
    the entry with the new status.
    """
    form = EditChallengeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user_challenge = user_challenge_repository.update_challenge(id, form.data['status'])
        return user_challenge.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@challenge_routes.route('/<int:id>', methods=['DELETE'])
def delete_challenge(id):
    """
    Retrieves a user_challenge with id of `:id` then deletes it from the database.
    Returns response status 200 if the user_challenge was deleted.
    Return response status 404 if the user_challenge wasn't found.
    """
    form = DeleteChallengeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        challenge = delete_challenge(id)
        if challenge.success:
            return {}, 200
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# should this be its own resource?
# it's basically getting the challenges from the dimension table and then returning the most efficient way to play,
# so the resource is the challenges
# ok to stay here?
# maybe turn this into a query instead of a nested resource?
# todo: gurl abstract this!!!
# todo: better route naming
@challenge_routes.route('/accelerate/<int:id>', methods=['GET'])
def calc_max(user_id):
    # todo: change this to an enum/db call
    mode_ids = [1, 2, 3]
    result = {}
    for mode_id in mode_ids:
        query_result = get_entries(queries.challenges_by_legend, QueryOptions.user_mode(**{user_id, mode_id}))

        try:
            result[f"legend_mode_{mode_id}"] = [
                {
                    "sum": row.results,
                    "legend_id": row.legend_id,
                    "mode_id": row.mode_id
                } for row in query_result
            ]
            max = result[f"legend_mode_{mode_id}"][0]["sum"]
            result[f"legend_mode_{mode_id}"] = list(
                filter(lambda ele: ele["sum"] == max, result[f"legend_mode_{mode_id}"]))
            lookup_list = []
            result[f"legend_mode_{mode_id}_challenges"] = {}
            for row in result[f"legend_mode_{mode_id}"]:
                lookup_list.append(row["legend_id"])
            for legend_id in lookup_list:
                query_result = (queries.mode_and_legend_specific, QueryOptions.user_mode_legend(**{user_id, mode_id, legend_id})).fetchall()
                for row in query_result:
                    result[f"legend_mode_{mode_id}_challenges"][row.id] = {
                        "sum": row.sum,
                        "id": row.id,
                        "mode_id": row.mode_id,
                        "challenge_label": row.challenge_label,
                        "status": row.status
                    }
        except:
            result[f"legend_mode_{mode_id}"] = []
            result[f"legend_mode_{mode_id}_challenges"] = {}
        # userid, mode
        query_result = db.session.execute(queries.challenges_by_weapon, QueryOptions.user_mode(**{user_id, mode_id})).fetchall()
        try:
            result[f"weapon_mode_{mode_id}"] = [
                {
                    "sum": row.results,
                    "weapon_id": row.weapon_id,
                    "mode_id": row.mode_id
                } for row in query_result
            ]
            max = result[f"weapon_mode_{mode_id}"][0]["sum"]
            result[f"weapon_mode_{mode_id}"] = list(
                filter(lambda ele: ele["sum"] == max, result[f"weapon_mode_{mode_id}"]))
            lookup_list = []
            result[f"weapon_mode_{mode_id}_challenges"] = {}
            for row in result[f"weapon_mode_{mode_id}"]:
                lookup_list.append(row["weapon_id"])

            for weapon_id in lookup_list:
                query_result = get_entries(queries.mode_and_weapon_specific, QueryOptions.user_mode_weapon(**{user_id, mode_id, weapon_id}))
                for row in query_result:
                    result[f"weapon_mode_{mode_id}_challenges"][row.id] = {
                        "sum": row.sum,
                        "id": row.id,
                        "mode_id": row.mode_id,
                        "challenge_label": row.challenge_label,
                        "status": row.status
                        }
        except:
            result[f"weapon_mode_{mode_id}"] = []
            result[f"weapon_mode_{mode_id}_challenges"] = {}
        query_result = db.session.execute(queries.weapon_and_legend_agnostic, QueryOptions.user_mode(**{user_id, mode_id})).fetchall()
        result[f"misc_mode_{mode_id}_challenges"] = [
            {
                "sum": row.sum,
                "id": row.id,
                "mode_id": row.mode_id,
                "challenge_label": row.challenge_label,
                "status": row.status
            } for row in query_result
        ]
    return result

# deprecate this
@challenge_routes.route('/import/<int:id>', methods=['POST'])
def s12_import(id):
    """
    Responds to POST requests by importing current S12 challenges for a user.
    If the user already has challenges, they will not be able to import
    """
    form = SeedUserForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        seed_one_user([id])
        user_challenges = UserChallenge.query.filter(
            UserChallenge.user_id == id).all()
        return {"challenges": [user_challenge.to_dict() for user_challenge in user_challenges]}
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
