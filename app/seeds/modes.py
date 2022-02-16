from app.models import db, Mode

def seed_modes():
    modes = ['Battle Royale', 'Arena', 'LTM']
    for mode in modes:
        entry = Mode(mode=mode)
        db.session.add(entry)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_modes():
    db.session.execute('TRUNCATE modes RESTART IDENTITY CASCADE;')
    db.session.commit()
