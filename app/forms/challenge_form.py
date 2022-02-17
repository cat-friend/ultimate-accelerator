from flask_wtf import FlaskForm
from wtforms import SubmitField, IntegerField, TextAreaField, StringField
from wtforms.validators import DataRequired, Length, EqualTo, NumberRange, AnyOf


class ChallengeForm(FlaskForm):
    challenge_label = TextAreaField("", validators=[DataRequired(), Length(
        min=2, max=512, message="Error! Please enter some information about your challenge.")])
    challenge_type_id = IntegerField("", validators=[DataRequired(
        message="Error! Something went wrong (challenge_type).")])
    user_id = IntegerField("", validators=[DataRequired(
        message="Error! Something went wrong (user_id)")])
    value = IntegerField("", validators=[DataRequired(
        message="Error! Please enter a value for this challenge."),
        NumberRange(min=1, max=10, message="Please enter a value for this challenge between 1 and 10")])
    weapon_id = IntegerField("")
    mode_id = IntegerField("")
    legend_id = IntegerField("")
    submit = SubmitField("Submit")

class EditChallengeForm(FlaskForm):
    user_challenge_id = IntegerField("", validators=[DataRequired()])
    challenge_user_id = IntegerField("", validators=[DataRequired(), EqualTo(
        'curr_user_id', message='Error! You are not authorized to delete this challenge')])
    curr_user_id = IntegerField("", validators=[DataRequired(), EqualTo(
        'challenge_user_id', message='Error! You are not authorized to delete this challenge')])
    status = StringField("", validators=[AnyOf(["open", "in progress", "completed"], message="Error! No valid status detected.")])

class DeleteChallengeForm(FlaskForm):
    user_challenge_id = IntegerField("", validators=[DataRequired(message="Oops! Not enough info. Please try again!")])
    curr_user_id = IntegerField("", validators=[DataRequired(), EqualTo(
        'challenge_user_id', message='Error! You are not authorized to delete this challenge')])
    challenge_user_id = IntegerField("", validators=[DataRequired(), EqualTo(
        'curr_user_id', message='Error! You are not authorized to delete this challenge')])
    submit = SubmitField("Submit")
