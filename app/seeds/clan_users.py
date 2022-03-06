from app.models import db, ClanUsers


# Adds a demo user, you can add other users here if you want
def seed_clan_users():
    clans = [1, 2, 3, 1, 2, 3, 1, 2, 3, 3]
    users = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    for i in range(0, len(clans)):
        entry = ClanUsers(clan_id=clans[i], user_id=users[i])
        db.session.add(entry)
    clans = [4, 5, 6, 7]
    user_lists = [[11, 12, 13, 14, 15], [16, 17, 18, 19, 20], [21, 22, 23, 24, 25], [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]]
    for i in range(0, len(clans)):
        for user in user_lists[i]:
            entry = ClanUsers(clan_id=clans[i], user_id=user)
            db.session.add(entry)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_clan_users():
    db.session.execute('TRUNCATE clanusers RESTART IDENTITY CASCADE;')
    db.session.commit()
