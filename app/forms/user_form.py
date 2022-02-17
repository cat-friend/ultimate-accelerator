from flask_wtf import FlaskForm
from wtforms import SubmitField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length

class UserForm(FlaskForm):
    id = IntegerField("", validators={DataRequired()})
    bio = TextAreaField("Description: ", validators=[Length(max=512, message="Please limit your biography to 512 characters! Your life is super cool but hamsters power our servers.")])
    submit = SubmitField("Submit")
