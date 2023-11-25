from . import Denormalized_User_Challenge_Repository

class Denormalized_User_Challenge_Service():
    def __init__(self):
        self.denormalized_user_challenge_repository = Denormalized_User_Challenge_Repository()

    # todo: make a bulk create method in the service and repo layers
    def create_entries(self, user_challenge_id, value, weapon_ids=[], mode_ids=[], legend_ids=[]):
        for weapon_id in weapon_ids:
            for mode_id in mode_ids:
                for legend_id in legend_ids:
                    self.denormalized_user_challenge_repository.create_entry(
                        **{user_challenge_id, weapon_id, mode_id, legend_id, value})

    def get_entries(self, sql_query, query_options = {}):
        return self.denormalized_user_challenge_repository.get_entries(sql_query, query_options)
