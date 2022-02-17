from flask import Blueprint, session, request
from app.models import Clan, User, db
# from app.forms import ClanForm

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

clan_routes.route('/')
def default():
    return 'hello'
