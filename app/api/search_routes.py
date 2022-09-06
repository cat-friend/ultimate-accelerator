from flask import Blueprint, session, request
from app.models import User, UserChallenge, db
# from app.forms import SearchForm

search_routes = Blueprint('search', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

@search_routes.route('/')
def default():
    return 'hello'
