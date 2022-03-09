from flask_wtf import FlaskForm
from wtforms import SubmitField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length, EqualTo



class UserForm(FlaskForm):
    id = IntegerField("", validators=[DataRequired(
        message="No user ID detected. Please try again!")])
    curr_user_id = IntegerField("", validators=[DataRequired(
        message="No user ID detected. Please try again!"), EqualTo('id', message="Hey, you are not authorized to edit this bio!")])
    bio = TextAreaField("Description: ", validators=[Length(
        max=1024, message="Please limit your biography to 1024 characters! Your life is super cool but hamsters power our servers.")])
    submit = SubmitField("Submit")
