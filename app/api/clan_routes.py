from ast import Del
from flask import Blueprint, session, request
from app.models import Clan, ClanUsers, User, db
from app.forms import ClanForm, EditClanForm, DeleteClanForm, JoinClan, LeaveClan

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
    the details of the created clan and creates a new entry in ClanUsers.
    Else, POST method returns errors.
    """
    if request.method == 'GET':
        clans = Clan.query.all()
        return {"clans": [clan.to_dict() for clan in clans]}
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
            db.session.commit()
            new_member = ClanUsers(user_id=user_id, clan_id=new_clan.id)
            db.session.add(new_member)
            db.session.commit()
            return new_clan.to_dict()
        else:
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@clan_routes.route('/<int:id>/join', methods=['POST', 'DELETE'])
def join_leave_clan(id):
    """
    Upon successful data validation, POST makes an entry on the
    ClanUsers table and returns a list of all clan members for that clan.
    Else, server responds with a list of errors.
    Upon successful data validation, DELETE removes the user from
    the ClanUsers table and returns a list of all clan members for that clan.
    """
    if request.method == 'POST':
        form = JoinClan()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            user_id = form.data['user_id']
            clan_id = id
            new_member = ClanUsers(user_id=user_id, clan_id=clan_id)
            clan_members = ClanUsers.query.join(
                User).filter(User.id == user_id).first()
            db.session.add(new_member)
            db.session.commit()
            return {"clan_members": [clan_member.to_dict() for clan_member in clan_members]}
        else:
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    if request.method == 'DELETE':
        form = LeaveClan()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            user_id = form.data['user_id']
            member = ClanUsers.query.filter_by(user_id=user_id).first()
            db.session.delete(member)
            db.session.commit()
            return {}, 200
        else:
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@clan_routes.route('/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def one_clan(id):
    """
    GET request returns one (1) clan with clan_id of `id`, includes members.
    PUT request updates the clan with clan_id of `id` and returns that clan.
    DLETE request deletes the clan from the database.
    PUT and DELETE return a list of errors if either fail data validation.
    """
    if request.method == 'GET':
        clan = Clan.query.get(id)
        clan_members = ClanUsers.query.join(
            User).filter(ClanUsers.clan_id == id).all()
        return {"clan": clan.to_dict(), "clan_members": [clan_member.to_dict() for clan_member in clan_members]}
    if request.method == 'PUT':
        print("PUT ROUTE PUT ROUTE")
        form = EditClanForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            clan = Clan.query.get(id)
            clan_members = ClanUsers.query.join(
                User).filter(ClanUsers.clan_id == id).all()
            description = form.data['description']
            name = form.data['name']
            clan.description = description
            clan.name = name
            db.session.add(clan)
            db.session.commit()
            return {"clan": clan.to_dict(), "clan_members": [clan_member.to_dict() for clan_member in clan_members]}
        else:
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    if request.method == 'DELETE':
        form = DeleteClanForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            clan = Clan.query.get(id)
            db.session.delete(clan)
            db.session.commit()
            return {}, 200
        else:
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401
