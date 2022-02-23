from flask_wtf import FlaskForm
from wtforms import SubmitField, IntegerField, TextAreaField, StringField, FieldList, Field
from wtforms.validators import DataRequired, Length, EqualTo, NumberRange, AnyOf

class ListField(Field):
    def process_formdata(self, valuelist):
        self.data = valuelist

class ChallengeForm(FlaskForm):
    challenge_label = TextAreaField("", validators=[DataRequired(message="Error! Please enter some information about your challenge."), Length(
        min=2, max=180, message="Oops! Your challenge is too long or too short. Please make sure it is at least 2 characters or at most 180 characters long.")])
    challenge_type_id = IntegerField("", validators=[DataRequired(
        message="No challenge type detected. Please enter a valid battlepass challenge!")])
    user_id = IntegerField("", validators=[DataRequired(
        message="Error! Something went wrong (user_id)")])
    value = IntegerField("", validators=[DataRequired(
        message="Please enter a value for this challenge."),
        NumberRange(min=1, max=10, message="Please enter a value for this challenge between 1 and 10")])
    weapon_id = ListField(validators=[])
    mode_id = ListField(validators=[])
    legend_id = ListField(validators=[])
    submit = SubmitField("Submit")

class EditChallengeForm(FlaskForm):
    user_challenge_id = IntegerField("", validators=[DataRequired(message="Oops! No user_challenge_id detected. Please try again.")])
    challenge_user_id = IntegerField("", validators=[DataRequired(), EqualTo(
        'curr_user_id', message='Error! You are not authorized to edit this challenge')])
    curr_user_id = IntegerField("", validators=[DataRequired(), EqualTo(
        'challenge_user_id', message='')])
    status = StringField("", validators=[AnyOf(["open", "in progress", "completed"], message="Error! No valid status detected.")])

class DeleteChallengeForm(FlaskForm):
    user_challenge_id = IntegerField("", validators=[DataRequired(message="Oops! Not enough info. Please try again!")])
    curr_user_id = IntegerField("", validators=[DataRequired(), EqualTo(
        'challenge_user_id', message='Error! You are not authorized to delete this challenge')])
    challenge_user_id = IntegerField("", validators=[DataRequired(), EqualTo(
        'curr_user_id', message='Error! You are not authorized to delete this challenge')])
    submit = SubmitField("Submit")
