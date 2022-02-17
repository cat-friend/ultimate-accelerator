from flask import Blueprint, session, request
from app.models import ChallengeType, User, db
from app.forms import CardForm, DeleteCardForm

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
