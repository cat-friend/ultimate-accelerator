from flask import Blueprint, request
from jinja2 import Undefined
from sqlalchemy import null
from app.models import UserChallenge, db, UserChallengeDimensionTable
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


def new_dimension_table_entry(user_challenge_id, value, weapon_ids=[], mode_ids=[], legend_ids=[]):
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
    user_challenge = UserChallenge.query.get(id)
    return user_challenge.to_dict()


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
        user_challenge = UserChallenge.query.get(id)
        user_challenge.status = form.data['status']
        db.session.add(user_challenge)
        db.session.commit()
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
        user_challenge = UserChallenge.query.get(id)
        db.session.delete(user_challenge)
        db.session.commit()
        return {}, 200
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@challenge_routes.route('/accelerate/<int:id>', methods=['GET'])
def calc_max(id):
    modes = [1, 2, 3]
    result = {}
    for mode in modes:
        query_result = db.session.execute('SELECT SUM(userchallengesdimensiontable.value) as results, \
                             userchallengesdimensiontable.legend_id, \
                             userchallengesdimensiontable.mode_id\
                             FROM userchallenges\
                             JOIN userchallengesdimensiontable\
                             ON userchallenges.id=userchallengesdimensiontable.user_challenge_id\
                             WHERE userchallenges.user_id=:user_id AND\
                             NOT userchallenges.status=\'completed\'\
                             AND legend_id > 0\
                             AND mode_id=:mode_id\
                             GROUP BY userchallengesdimensiontable.legend_id,\
                             userchallengesdimensiontable.mode_id\
                             ORDER BY results desc;', {'user_id': id, 'mode_id': mode}).fetchall()
        result[f"legend_mode_{mode}"] = [
            {"sum": row.results, "legend_id": row.legend_id, "mode_id": row.mode_id} for row in query_result]
        lookup_list = []
        result[f"legend_mode_{mode}_challenges"] = []
        for row in query_result:
            lookup_list.append(row.legend_id)
        for legend_id in lookup_list:
            query_result = db.session.execute('SELECT SUM(userchallengesdimensiontable.value) as sum, \
                userchallenges.id, \
                userchallengesdimensiontable.mode_id, \
                userchallenges.challenge_label, \
                userchallenges.status \
                FROM userchallenges \
                JOIN userchallengesdimensiontable \
	            ON userchallenges.id=userchallengesdimensiontable.user_challenge_id \
                WHERE userchallenges.user_id=:user_id AND \
                NOT userchallenges.status=\'completed\' \
                AND legend_id=:legend_id \
                AND mode_id=:mode_id \
                GROUP BY userchallenges.id, \
                userchallengesdimensiontable.mode_id \
                ORDER BY sum desc; ', {'user_id': id, 'mode_id': mode, 'legend_id': legend_id}).fetchall()
            result[f"legend_mode_{mode}_challenges"].append(
            {legend_id: [{"sum": row.sum, "id": row.id, "mode_id": row.mode_id, "challenge_label": row.challenge_label, "status": row.status}
                         for row in query_result]})


        query_result = db.session.execute('SELECT SUM(userchallengesdimensiontable.value) as results, \
                             userchallengesdimensiontable.weapon_id, \
                             userchallengesdimensiontable.mode_id\
                             FROM userchallenges\
                             JOIN userchallengesdimensiontable\
                             ON userchallenges.id=userchallengesdimensiontable.user_challenge_id\
                             WHERE userchallenges.user_id=:user_id AND\
                             NOT userchallenges.status=\'completed\'\
                             AND weapon_id > 0\
                             AND mode_id=:mode_id\
                             GROUP BY userchallengesdimensiontable.weapon_id,\
                             userchallengesdimensiontable.mode_id\
                             ORDER BY results desc;', {'user_id': id, 'mode_id': mode}).fetchall()
        result[f"weapon_mode_{mode}"] = [
            {"sum": row.results, "weapon_id": row.weapon_id, "mode_id": row.mode_id} for row in query_result]
        lookup_list = []
        result[f"weapon_mode_{mode}_challenges"] = []
        for row in query_result:
            lookup_list.append(row.weapon_id)
        for weapon_id in lookup_list:
            query_result = db.session.execute('SELECT SUM(userchallengesdimensiontable.value) as sum, \
                userchallenges.id, \
                userchallengesdimensiontable.mode_id, \
                userchallenges.challenge_label, \
                userchallenges.status \
                FROM userchallenges \
                JOIN userchallengesdimensiontable \
	            ON userchallenges.id=userchallengesdimensiontable.user_challenge_id \
                WHERE userchallenges.user_id=:user_id AND \
                NOT userchallenges.status=\'completed\' \
                AND weapon_id=:weapon_id \
                AND mode_id=:mode_id \
                GROUP BY userchallenges.id, \
                userchallengesdimensiontable.mode_id \
                ORDER BY sum desc; ', {'user_id': id, 'mode_id': mode, 'weapon_id': weapon_id}).fetchall()
            result[f"weapon_mode_{mode}_challenges"].append(
            {weapon_id: [{"sum": row.sum, "id": row.id, "mode_id": row.mode_id, "challenge_label": row.challenge_label, "status": row.status}
                         for row in query_result]})

        query_result = db.session.execute('SELECT SUM(userchallengesdimensiontable.value) as sum, \
                        userchallenges.id, \
                        userchallengesdimensiontable.mode_id, \
                        userchallenges.challenge_label, \
                        userchallenges.status \
                    FROM userchallenges \
                    JOIN userchallengesdimensiontable \
	                    ON userchallenges.id=userchallengesdimensiontable.user_challenge_id \
	                    WHERE userchallenges.user_id=:user_id AND \
	                    NOT userchallenges.status=\'completed\' \
	                    AND weapon_id IS NULL \
                        AND legend_id IS NULL \
                        AND mode_id=:mode_id \
	                    GROUP BY userchallenges.id, \
                        userchallengesdimensiontable.mode_id \
                        ORDER BY sum desc; ', {'user_id': id, 'mode_id': mode}).fetchall()
        result[f"misc_mode_{mode}_challenges"] = [{"sum": row.sum, "id": row.id, "mode_id": row.mode_id, "challenge_label": row.challenge_label, "status": row.status}
                                                  for row in query_result]
    return result
