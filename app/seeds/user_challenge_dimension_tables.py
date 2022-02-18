from app.models import db, UserChallengeDimensionTable


def seed_user_challenge_dimension_table():
    
    for i in range(0, len(legends)):
        for weapon in weapons[i]:
            for mode in modes[i]:
                for legend in legends[i]:
                    entry = UserChallengeDimensionTable()
