from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, EqualTo, Email, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data.lower()
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data.lower()
    user = User.query.filter(User.username.ilike(username)).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(message="Please enter a username."), username_exists, Length(min=2, max=16, message="Please limit your username to be between 2 and 16 characters!")])
    email = StringField('email', validators=[DataRequired(message="Please enter a valid email address."), Email(), user_exists])
    password = StringField('password', validators=[DataRequired(message="Please enter a password.")])
    repeat_password = StringField('password', validators=[DataRequired(message="Please confirm your password."), EqualTo('password', message="Passwords don't match")])
