from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField, StringField
from wtforms.validators import DataRequired, Length, EqualTo, NumberRange, AnyOf, ValidationError

from app.models import Clan, ClanUsers, Message


def check_membership(form, field):
    clan_id = form['clan_id']
    user_id = field.data['user_id']
    user_check = ClanUsers.query.filter_by(
        user_id=user_id, clan_id=clan_id).first()
    if not user_check:
        raise ValidationError(
            "HEY! You're not a member of this clan so you can't post here.")


def check_ownership(form, field):
    id = field.data['message_id']
    user_id = form.data['user_id']
    owner_check = Message.query.get(id)
    if owner_check.user_id != user_id:
        raise ValidationError(
            "Uh-oh! You aren't the person who created this message so you can't edit or delete it.")


class MessageForm(FlaskForm):
    user_id = IntegerField("", validators=[DataRequired(
        message="Oops! No user id detected!"), check_membership])
    clan_id = IntegerField("", validators=[DataRequired(
        message="Oops! No clan id detected! Please try again")])
    message = TextAreaField("", validators=[Length(
        min=1, max=1024, message="Your message must  be between %(min)d and %(max)d characters.")])


class EditMessageForm(FlaskForm):
    message_id = IntegerField("", validators=[DataRequired(
        message="ACK! No message id detected! Please try again")])
    user_id = IntegerField("", validators=[DataRequired(
        message="Oops! No user id detected!"), check_ownership])
    clan_id = IntegerField("", validators=[DataRequired(
        message="Ruh-roh! No clan id detected! Please try again")])
    message = TextAreaField("", validators=[Length(
        min=1, max=1024, message="Your message must  be between %(min)d and %(max)d characters.")])


class DeleteMessageForm(FlaskForm):
    user_id = IntegerField("", validators=[DataRequired(
        message="Oops! No user id detected!"), check_ownership])
    clan_id = IntegerField("", validators=[DataRequired(
        message="Ruh-roh! No clan id detected! Please try again")])
    message_id = IntegerField("", validators=[DataRequired(
        message="ACK! No message id detected! Please try again")])
