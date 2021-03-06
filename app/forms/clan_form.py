from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField, StringField
from wtforms.validators import DataRequired, Length, EqualTo, NumberRange, AnyOf, ValidationError

from app.models import Clan, ClanUsers


def check_membership(form, field):
    user_id = field.data
    user_check = ClanUsers.query.filter_by(user_id=user_id).first()
    if user_check:
        raise ValidationError(
            "Oops! You've already joined a clan! You can only be a member of one clan. If you'd like to join this clan, leave your current clan by heading to its page.")


def check_unique_owner(form, field):
    user_id = field.data
    user_check = Clan.query.filter_by(owner_user_id=user_id).first()
    if user_check:
        raise ValidationError(
            "Oops! You've created a clan before! You can only create one clan.")


class ClanForm(FlaskForm):
    user_id = IntegerField("", validators=[DataRequired(
        message="Oops! No user id detected!"), check_unique_owner])
    name = StringField("", validators=[DataRequired(message="Please enter a name for your clan!"), Length(
        min=2, max=40, message="Please limit your clan name to be at least 2 characters and at most 40 characters.")])
    description = TextAreaField("", validators=[Length(
        max=512, message="Please limit your clan description to 512 characters! Your clan is super cool but hamsters power our servers.")])


class EditClanForm(FlaskForm):
    owner_user_id = IntegerField("", validators=[DataRequired(), EqualTo(
        'curr_user_id', message=None)])
    curr_user_id = IntegerField("", validators=[DataRequired(), EqualTo(
        'owner_user_id', message='Error! You are not authorized to perform this action!')])
    name = StringField("", validators=[DataRequired(message="Please enter a name for your clan!"), Length(
        min=2, max=40, message="Please limit your clan name to be at least 2 characters and at most 40 characters.")])
    description = TextAreaField("", validators=[Length(
        max=512, message="Please limit your clan description to 512 characters! Your clan is super cool but hamsters power our servers.")])


class DeleteClanForm(FlaskForm):
    owner_user_id = IntegerField("", validators=[DataRequired(), EqualTo(
        'curr_user_id', message=None)])
    curr_user_id = IntegerField("", validators=[DataRequired(), EqualTo(
        'owner_user_id', message='Error! You are not authorized to perform this action!')])


class JoinClan(FlaskForm):
    user_id = IntegerField("", validators=[DataRequired(
        message="Oops! No user id detected!"), check_membership])
    clan_id = IntegerField("", validators=[DataRequired(
        message="Oops! No clan id detected!")])


class LeaveClan(FlaskForm):
    user_id = IntegerField("", validators=[DataRequired(
        message="Oops! No user id detected! Are you authorized to perform this action?!")])
    clan_id = IntegerField("", validators=[DataRequired(
        message="Oops! No clan id detected!")])
