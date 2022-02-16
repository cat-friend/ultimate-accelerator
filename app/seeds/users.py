from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    yoshi = User(
        username='Yellow Yoshi', email="yellow@yos.hi", password="charsiubao")
    gp = User(
        username='Green Pepper', email='green@pep.ski', password="ilovelemon")
    normie = User(
        username='normie', email='normie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    trauma = User(
        username='trauma', email='aimgod@cs.go', password='pewpewpew')
    durrneez = User(
        username='costco $1.50 hot dog', bio="(WITH REFILL)", email='hotdog@hot.dog', password='dollarfiddy')
    umbasa = User(
        username='umbasa nova', email='rampart@ramp.art', password='sheila4ever')
    dolph = User(
        username='Dolph Squid', bio="FRIEND OF HUMANITY", email="henry@ron.ron", password="computer")

    bloobs = User(username="Blueberry Smith",
                  email="blue@ber.ry", password="hellotomywife")

    for datum in [demo, normie, bobbie, trauma, durrneez, umbasa, gp, dolph, yoshi, bloobs]:
        db.session.add(datum)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
