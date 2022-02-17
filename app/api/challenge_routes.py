from flask import Blueprint, session, request
from app.models import ChallengeType, User, db, UserChallengeDimensionTable
from app.forms import ChallengeForm, EditChallengeForm, DeleteChallengeForm

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


def new_dimension_table_entry(user_challenge_id, weapon_ids, mode_ids, legend_ids, value):
    for weapon_id in weapon_ids:
        for mode_id in mode_ids:
            for legend_id in legend_ids:
                new_entry = UserChallengeDimensionTable(
                    user_challenge_id=user_challenge_id, weapon_id=weapon_id, mode_id=mode_id, legend_id=legend_id, value=value)
                db.session.add(new_entry)
                db.session.commit()
    return

@challenge_routes.route('/', methods=['POST'])
def all_challenges():
    """
    POST requests post challenges to the user's UserChallenge table
    and to the interdimensional challenge table. If successful, the
    route returns JSON data needed for the front end. Else, the route
    returns error messages.
    """
    # form = ChallengeForm()
    # form['csrf_token'].data = request.cookies['csrf_token']
    # if form.validate_on_submit():
    #     challenge_label = form.data['challenge_label']
    #     challenge_type_id = form.data['challenge_type_id']
    #     user_id = form.data['user_id']
    #     value = form.data['value']
    #     new_challenge = ChallengeType(
    #         challenge_label=challenge_label,
    #         challenge_type_id=challenge_type_id,
    #         user_id=user_id,
    #         value=value)
    #     db.session.add(new_challenge)
    #     db.session.commit()
    #     weapon_id = form.data['weapon_id']
    #     mode_id = form.data['mode_id']
    #     legend_id = form.data['legend_id']
    #     user_challenge_id = new_challenge.id
    #     new_dimension_table_entry(
    #         user_challenge_id, weapon_id, mode_id, legend_id, value)
    #     return new_challenge.to_dict()
    # else:
    #     return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    pass
