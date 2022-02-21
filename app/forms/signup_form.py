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
    user = User.query.filter(User.username.lower() == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, Length(min=2, max=16, message="Please limit your username to be between 2 and 16 characters!")])
    email = StringField('email', validators=[DataRequired(), Email(), user_exists])
    password = StringField('password', validators=[DataRequired(), EqualTo('repeat_password', message="Passwords don't match")])
    repeat_password = StringField('password', validators=[DataRequired(), EqualTo('password', message="Passwords don't match")])
