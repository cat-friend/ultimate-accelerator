from app.models import db, Weapon


def seed_weapon():
    names = ['30-30 Repeater', 'Alternator', 'Bocek', 'CAR', 'CAR in heavy ammo mode',
             'CAR in light ammo mode', 'Charge Rifle', 'Devotion', 'EVA-8', 'Flatline',
             'Flatline', 'G7 Scout', 'G7 Scout', 'Havoc', 'Hemlok', 'Kraber', 'Kraber',
             'L-STAR', 'Longbow DMR', 'Longbow DMR', 'Mastiff', 'Mozambique', 'P2020',
             'Peacekeeper', 'Prowler', 'R-301', 'R-99', 'Rampage', 'RE-45', 'Sentinel',
             'Spitfire', 'Spitfire', 'Triple Take', 'Volt', 'Volt', 'Wingman']
    types = [6, 3, 6, 3, 3, 3, 7, 4, 5, 2, 9, 6, 8, 2, 2, 7, 8,
             4, 9, 7, 5, 5, 1, 5, 3, 2, 3, 4, 1, 7, 8, 4, 6, 8, 3, 1, ]
    for i in range(0, len(names)):
        entry = Weapon(name=names[i], type=types[i])
        db.session.add(entry)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities


def undo_weapon():
    db.session.execute('TRUNCATE weapons RESTART IDENTITY CASCADE;')
    db.session.commit()
