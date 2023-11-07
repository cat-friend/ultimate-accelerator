from app.models import UserChallenge, db, UserChallengeDimensionTable

class challenge_repository():
    def __init__(self):
        pass

    def get_challenge(id: str):
        """
        Fetches one challenge by challenge id
        """
        challenge = UserChallenge.query.get(id)
        return challenge

    # positional args suck, turn this into a dict
    def create_challenge(challenge_label: str, challenge_type_id: str, user_id: str, value: int):
        new_challenge = UserChallenge(
            challenge_label=challenge_label,
            challenge_type_id=challenge_type_id,
            user_id=user_id,
            value=value)
        db.session.add(new_challenge)
        db.session.commit()
        return new_challenge

    # get challenge
    # if challenge not found, 404 err
    # update
    def update_challenge():
