from flask import Blueprint, session, request
from app.models import Message, User, db
from app.forms import MessageForm, EditMessageForm, DeleteMessageForm

message_routes = Blueprint('messages', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


@message_routes.route('/messages', methods=['POST'])
def new_message():
    """
    Responds to POST requests by posting a new message to a specific clan and returns
    the message.
    If the request fails validation, returns errors.
    """
    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user_id = form.data['user_id']
        clan_id = form.data['clan_id']
        message = form.data['message']
        new_message = Message(
            user_id=user_id, clan_id=clan_id, message=message)
        db.session.add(new_message)
        db.session.commit()
        return new_message.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@message_routes.route('/messages/<int:id>', methods=['PUT', 'DELETE'])
def one_message(id):
    """
    Responds to PUT requests by editing a message, returns the message.
    Responds to DELETE requests by delete a message, returns empty dict and 200 status.
    If request fails validation, returns errors.
    """
    if request.method == 'PUT':
        form = EditMessageForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            curr_message = Message.query.get(id)
            message = form.data['message']
            curr_message.message = message
            db.session.add(curr_message)
            db.session.commit()
            return curr_message.to_dict()
        else:
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    if request.method == 'DELETE':
        form = DeleteMessageForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            message = Message.query.get(id)
            db.session.delete(message)
            db.session.commit()
            return {}, 200
        else:
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401
