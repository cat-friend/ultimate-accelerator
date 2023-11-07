from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


class LoginForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(message="Please enter a valid email address.")])
    password = StringField('password', validators=[
                           DataRequired("Password field is required.")])
