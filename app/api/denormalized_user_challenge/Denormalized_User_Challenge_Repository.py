from app.models import commit_document_to_db, delete_document_from_db, query_db, UserChallengeDimensionTable



class Denormalized_User_Challenge_Repository():
    def __init__(self):
        pass

    def create_entry(user_challenge_id, value, weapon_ids=[], mode_ids=[], legend_ids=[]):
        for weapon_id in weapon_ids:
            for mode_id in mode_ids:
                for legend_id in legend_ids:
                    new_entry = UserChallengeDimensionTable(
                        user_challenge_id=user_challenge_id, weapon_id=weapon_id, mode_id=mode_id, legend_id=legend_id, value=value)
                    commit_document_to_db(new_entry)
        return


    def get_entries(sql_query, query_options = {}):
        return query_db(sql_query, query_options)
