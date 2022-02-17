from flask import Flask
from flask_wtf import FlaskForm
from wtforms import SubmitField, IntegerField, TextAreaField, StringField
from wtforms.validators import DataRequired, Length, EqualTo, NumberRange, AnyOf, ValidationError

from app.models import Clan


def check_unique_owner(form, field):
    user_id = field.data
    user_check = Clan.query.filter_by(user_id=user_id).first()
    if user_check:
        raise ValidationError(
            f"Oops! You've created a clan before! You can only create one clan.")


class ClanForm(FlaskForm):
    user_id = IntegerField("", validators=[DataRequired(
        message="Oops! No user id detected!"), check_unique_owner])
    name = StringField("", validators=[DataRequired(message="Please enter a name for your clan!"), Length(
        min=2, max=40, message="Please limit your clan name to be at least 2 characters and at most 40 characters.")])


class EditClanForm(FlaskForm):
    owner_user_id = IntegerField("", validators=[DataRequired(), EqualTo(
        'curr_user_id', message='Error! You are not authorized to perform this action!')])
    curr_user_id = IntegerField("", validators=[DataRequired(), EqualTo(
        'owner_user_id', message='Error! You are not authorized to perform this action!')])
    description = TextAreaField("", validators=[Length(max=512, message="Please limit your biography to 512 characters! Your life is super cool but hamsters power our servers.")])

class DeleteClanForm(FlaskForm):
    owner_user_id = IntegerField("", validators=[DataRequired(), EqualTo(
        'curr_user_id', message='Error! You are not authorized to perform this action!')])
    curr_user_id = IntegerField("", validators=[DataRequired(), EqualTo(
        'owner_user_id', message='Error! You are not authorized to perform this action!')])
