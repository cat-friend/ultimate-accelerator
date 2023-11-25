from app.models import commit_document_to_db, delete_document_from_db, query_db, UserChallengeDimensionTable



class Denormalized_User_Challenge_Repository():
    def __init__(self):
        pass

    def create_entry(user_challenge_id, value, weapon_id, mode_id, legend_id):
        new_entry = UserChallengeDimensionTable(user_challenge_id, weapon_id, mode_id, legend_id, value)
        commit_document_to_db(new_entry)
        return


    def get_entries(sql_query, query_options):
        return query_db(sql_query, query_options)
