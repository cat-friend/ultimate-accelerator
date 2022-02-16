from app.models import db, WeaponType

def seed_weapon_types():
    types = ['pistol', 'assault rifle', 'SMG', 'LMG', 'shotgun', 'marksman', 'sniper', 'red tier', 'craftable']
    for type in types:
        entry = WeaponType(type=type)
        db.session.add(entry)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_weapon_types():
    db.session.execute('TRUNCATE weapontypes RESTART IDENTITY CASCADE;')
    db.session.commit()
