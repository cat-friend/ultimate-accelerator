from app.models import db, ChallengeType


# Adds a demo user, you can add other users here if you want
def seed_challenge_types():
    types = ["Ability", "Collect", "DMG", "Finish", "Health", "KKDA", "Loot", "Play", "Purchase", "Scan", "Survive"]

    for type in types:
        entry = ChallengeType(type=type)
        db.session.add(entry)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_challenge_types():
    db.session.execute('TRUNCATE challengetypes RESTART IDENTITY CASCADE;')
    db.session.commit()
