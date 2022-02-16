from app.models import db, Message


# Adds a demo user, you can add other users here if you want
def seed_messages():
    clans = [1, 2, 3, 1, 2, 3, 1, 2, 3]
    users = [1, 2, 3, 1, 2, 3, 1, 2, 3]
    messages = ["hello", "first", "hi", "wow", "test message", "sup", "WOW I LOVE APEX", "buff wattson", "ey who's that person who makes happy looting noises?"]
    for i in range(0, len(clans)):
        entry = Message(clan_id=clans[i], user_id=users[i], message=messages[i])
        db.session.add(entry)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()
