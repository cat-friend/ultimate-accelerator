from app.models import db, Message


# Adds a demo user, you can add other users here if you want
def seed_messages():
    clans = [1, 2, 3, 1, 2, 3, 1, 2, 3, 3]
    users = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    messages = ["hello", "mememmememememmemememmeme", "hehe das right MY BRUDDA", "hellooOOO", "i'm a computer", "baKAWWWW",
                "*man holding out hand* is this counterstrike? *butterly*", "that dog song is about me", "crypto main here", "yeah, YUP"]
    messages2 = ["what's the interact key?", "i am a friend of robutts and humans alike", "this game is SOOOOOOO easy", "how do you build houses?",
                 "wiggles, YES", "wiggles, no!!!", "when is de_dust in rotation?", "i discovered another secret voiceline today", "any wanna group up?", "bruce. BRUCE!!"]
    for i in range(0, len(clans)):
        entry = Message(clan_id=clans[i],
                        user_id=users[i], message=messages2[i])
        db.session.add(entry)
    for i in range(0, len(clans)):
        entry = Message(clan_id=clans[i],
                        user_id=users[i], message=messages[i])
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
