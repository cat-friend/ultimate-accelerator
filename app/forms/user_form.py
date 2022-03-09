from flask_wtf import FlaskForm
from wtforms import SubmitField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length, EqualTo, ValidationError
from app.models import UserChallenge

def challenge_check(form, field):
    id = field.data
    challenge = UserChallenge.query.filter(user_id=id).first()
    if challenge:
        raise ValidationError("You currently have challenges. To avoid duplicates, and thus inaccurate calculation of the most efficient way for you to play Apex, you must not have any challenges in order to import all Season 12 weekly challenges to date.")

class UserForm(FlaskForm):
    id = IntegerField("", validators=[DataRequired(
        message="No user ID detected. Please try again!")])
    curr_user_id = IntegerField("", validators=[DataRequired(
        message="No user ID detected. Please try again!"), EqualTo('id', message="Hey, you are not authorized to edit this bio!")])
    bio = TextAreaField("Description: ", validators=[Length(
        max=1024, message="Please limit your biography to 1024 characters! Your life is super cool but hamsters power our servers.")])
    submit = SubmitField("Submit")

class SeedUserForm(FlaskForm):
    id = IntegerField("", validators=[DataRequired(message="No user id detected. Please try again.")])
