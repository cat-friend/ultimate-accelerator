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
        new_message = Message(user_id=user_id, clan_id=clan_id, message=message)
        db.session.add(new_message)
        db.session.commit()
        return new_message.to_dict()
    else:
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@message_routes.route('/messages/<int:id>', methods=['PUT', 'DELETE'])
def one_message():
    pass
