from app.models import db, Clan


# Adds a demo user, you can add other users here if you want
def seed_clans():
    names = ["Casuals", "Treasure Packs", "FOOD SKWAD"]
    descriptions = ["Our KDR is 0.0", "Collect 45 each season", "A Costco $1.50 Hot Dog, Green Pepper, and Blueberry walk into a drop ship"]
    for i in range(0, len(names)):
        entry = Clan(name=names[i], owner_user_id=i+1, description=descriptions[i])
        db.session.add(entry)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_clans():
    db.session.execute('TRUNCATE clans RESTART IDENTITY CASCADE;')
    db.session.commit()
