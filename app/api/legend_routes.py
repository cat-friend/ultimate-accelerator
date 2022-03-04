from flask import Blueprint, session, request
from app.models import Legend

legend_routes = Blueprint('legends', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


@legend_routes.route('/', methods=['GET'])
def default():
    """
    Response to GET requests is all legends in a list, nested within a dict.
    """
    legends = Legend.query.all()
    return {"legends": [legend.to_dict() for legend in legends]}
