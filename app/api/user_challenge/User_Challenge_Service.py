from operator import itemgetter
from app.api.denormalized_user_challenge import Denormalized_User_Challenge_Service
from .User_Challenge_Repository import User_Challenge_Repository
from app.api.utils.queries import queries, QueryOptions

class User_Challenge_Service:
    def __init__(self):
        self.user_challenge_repository = User_Challenge_Repository()
        self.denormalized_user_challenge_service = Denormalized_User_Challenge_Service()

    def create_challenge(self, data):
        challenge_label, challenge_type_id, user_id, value, weapon_ids, mode_ids, legend_ids = itemgetter('challenge_label', 'challenge_type_id', 'user_id', 'value', 'weapon_id', 'mode_id', 'legend_id')(data)
        new_challenge = self.user_challenge_repository.create_challenge(
            challenge_label,
            challenge_type_id,
            user_id,
            value)
        user_challenge_id = new_challenge.id
        self.denormalized_user_challenge_service.create_entries(
            **{ user_challenge_id, value, weapon_ids, mode_ids, legend_ids })
        return new_challenge

    def get_users_challenges(self, user_id):
        user_challenge = self.user_challenge_repository.get_users_challenge(user_id)
        return user_challenge.to_dict()

    def edit_challenge(self, challenge_id, status):
        challenge = self.user_challenge_repository.get_challenge(challenge_id)
        if not challenge:
            # replace with ResourceNotFoundError
            raise ValueError('Resource not found')
        challenge.status = status
        updated_challenge = self.user_challenge_repository.update_challenge(challenge)
        return updated_challenge

    def delete_challenge(self, challenge_id):
        challenge = self.user_challenge_repository.get_challenge(challenge_id)
        if not challenge:
            # replace with ResourceNotFoundError
            raise ValueError('Resource not found')
        self.user_challenge_repository.delete_challenge(challenge)
        return { 'success': True }

    # todo: abstract this into more helpers
    def get_efficient_challenges(self, user_id):
        mode_ids = [1, 2, 3]
        result = {}
        for mode_id in mode_ids:
            query_result = self.denormalized_user_challenge_service.get_entries(queries.challenges_by_legend, QueryOptions.user_mode(**{user_id, mode_id}))
            try:
                result[f"legend_mode_{mode_id}"] = [
                    {
                        "sum": row.results,
                        "legend_id": row.legend_id,
                        "mode_id": row.mode_id
                    } for row in query_result
                ]
                max = result[f"legend_mode_{mode_id}"][0]["sum"]
                result[f"legend_mode_{mode_id}"] = list(
                    filter(lambda ele: ele["sum"] == max, result[f"legend_mode_{mode_id}"]))
                lookup_list = []
                result[f"legend_mode_{mode_id}_challenges"] = {}
                for row in result[f"legend_mode_{mode_id}"]:
                    lookup_list.append(row["legend_id"])
                for legend_id in lookup_list:
                    query_result = self.denormalized_user_challenge_service.get_entries(queries.mode_and_legend_specific, QueryOptions.user_mode_legend(**{user_id, mode_id, legend_id}))
                    for row in query_result:
                        result[f"legend_mode_{mode_id}_challenges"][row.id] = {
                            "sum": row.sum,
                            "id": row.id,
                            "mode_id": row.mode_id,
                            "challenge_label": row.challenge_label,
                            "status": row.status
                        }
            except:
                result[f"legend_mode_{mode_id}"] = []
                result[f"legend_mode_{mode_id}_challenges"] = {}
            query_result = self.denormalized_user_challenge_service.get_entries(queries.challenges_by_weapon, QueryOptions.user_mode(**{user_id, mode_id}))
            try:
                result[f"weapon_mode_{mode_id}"] = [
                    {
                        "sum": row.results,
                        "weapon_id": row.weapon_id,
                        "mode_id": row.mode_id
                    } for row in query_result
                ]
                max = result[f"weapon_mode_{mode_id}"][0]["sum"]
                result[f"weapon_mode_{mode_id}"] = list(
                    filter(lambda ele: ele["sum"] == max, result[f"weapon_mode_{mode_id}"]))
                lookup_list = []
                result[f"weapon_mode_{mode_id}_challenges"] = {}
                for row in result[f"weapon_mode_{mode_id}"]:
                    lookup_list.append(row["weapon_id"])

                for weapon_id in lookup_list:
                    query_result = self.denormalized_user_challenge_service.get_entries(queries.mode_and_weapon_specific, QueryOptions.user_mode_weapon(**{user_id, mode_id, weapon_id}))
                    for row in query_result:
                        result[f"weapon_mode_{mode_id}_challenges"][row.id] = {
                            "sum": row.sum,
                            "id": row.id,
                            "mode_id": row.mode_id,
                            "challenge_label": row.challenge_label,
                            "status": row.status
                            }
            except:
                result[f"weapon_mode_{mode_id}"] = []
                result[f"weapon_mode_{mode_id}_challenges"] = {}
            query_result = self.denormalized_user_challenge_service.get_entries(queries.weapon_and_legend_agnostic, QueryOptions.user_mode(**{user_id, mode_id}))
            result[f"misc_mode_{mode_id}_challenges"] = [
                {
                    "sum": row.sum,
                    "id": row.id,
                    "mode_id": row.mode_id,
                    "challenge_label": row.challenge_label,
                    "status": row.status
                } for row in query_result
            ]
            return result
