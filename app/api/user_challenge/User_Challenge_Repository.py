from app.models import UserChallenge, commit_document_to_db, delete_document_from_db

class User_Challenge_Repository():
    def __init__(self):
        pass

    def get_challenge(id: str):
        """
        Fetches one challenge by challenge id
        """
        challenge = UserChallenge.query.get(id)
        return challenge

    def get_users_challenges(user_id: str):
        user_challenges = UserChallenge.query.filter(
        UserChallenge.user_id == user_id).all()
        return user_challenges.to_dict()


    def create_challenge(challenge_label: str, challenge_type_id: str, user_id: str, value: int):
        new_challenge = UserChallenge(
            challenge_label=challenge_label,
            challenge_type_id=challenge_type_id,
            user_id=user_id,
            value=value)
        commit_document_to_db(new_challenge)
        return new_challenge.to_dict()

    # get challenge
    # if challenge not found, 404 err
    # update
    def update_challenge(self, challenge):
        commit_document_to_db(challenge)
        return challenge.to_dict()

    def delete_challenge(self, challenge):
        delete_document_from_db(challenge)
