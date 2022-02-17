from flask import Blueprint, session, request
from app.models import Clan, User, db
from app.forms import ClanForm

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


clan_routes.route('/', methods=['GET', 'POST'])
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
            return {}, 200
    return 'hello'
