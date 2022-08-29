from app.models import db, Legend


def seed_legends():
    names = ['Bloodhound', 'Gibraltar', 'Lifeline', 'Pathfinder', 'Wraith',
             'Bangalore', 'Caustic', 'Octane', 'Mirage', 'Wattson', 'Crypto',
             'Revenant', 'Loba', 'Rampart', 'Horizon', 'Fuse', 'Valkyrie',
             'Seer', 'Ash', 'Mad Maggie', 'Newcastle', 'Vantage']
    types = ['Recon', 'Defense', 'Support', 'Recon', 'Assault', 'Assault',
             'Defense', 'Assault', 'Assault', 'Defense', 'Recon', 'Assault',
             'Support', 'Defense', 'Assault', 'Assault', 'Recon', 'Recon',
             'Assault', 'Assault']
    for i in range(0, len(names)):
        entry = Legend(name=names[i], type=types[i])
        db.session.add(entry)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities


def undo_legends():
    db.session.execute('TRUNCATE legends RESTART IDENTITY CASCADE;')
    db.session.commit()
