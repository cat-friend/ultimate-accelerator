from flask import Blueprint, session, request
from app.models import Weapon

weapon_routes = Blueprint('weapons', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


@weapon_routes.route('/', methods=['GET'])
def default():
    """
    Response to GET requests is all weapons in a list, nested within a dict.
    """
    weapons = Weapon.query.all()
    return {"weapons": [weapon.to_dict() for weapon in weapons]}
