from flask import Blueprint, session, request
from app.models import Clan, User, db
from app.forms import ClanForm, EditClanForm, DeleteClanForm

clan_routes = Blueprint('clans', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


@clan_routes.route('/', methods=['GET', 'POST'])
def default():
    """
    GET method returns all clans.
    Upon successful data validation, POST method creates a new clan and returns
    the details of the created clan. Else, POST method returns errors.
    """
    if request.method == 'GET':
        clans = Clan.query.all()
        return {"clans": clan.to_dict() for clan in clans}
    if request.method == 'POST':
        form = ClanForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            user_id = form.data['user_id']
            name = form.data['name']
            description = form.data['description']
            new_clan = Clan(owner_user_id=user_id, name=name,
                            description=description)
            db.session.add(new_clan)
            db.session.add()
            return new_clan.to_dict()
        else:
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@clan_routes.route('/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def one_clan(id):
    if request.method == 'GET':
        clan = Clan.query.get(id)
        return clan.to_dict()
    if request.method == 'PUT':
        form = EditClanForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            clan = Clan.query.get(id)
            description = form.data['description']
            name = form.data['name']
            clan.description = description
            clan.name = name
            db.session.add(clan)
            db.session.commit()
            return clan.to_dict()
        else:
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    if request.method == 'DELETE':
        form = EditClanForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            clan = Clan.query.get(id)
            db.session.delete(clan)
            db.session.commit()
            return {}, 200
        else:
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401
