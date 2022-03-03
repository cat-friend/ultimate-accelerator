from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    dolph = User(
        username='Dolph Squid', bio="FRIEND OF HUMANITY", email="henry@ron.ron", password="computer")
    gp = User(
        username='Green Pepper', email='green@pep.ski', password="ilovelemon")
    normie = User(
        username='normie', email='normie@aa.io', password='password')
    yoshi = User(
        username='Yellow Yoshi', email="yellow@yos.hi", password="charsiubao")
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    trauma = User(
        username='trauma', email='aimgod@cs.go', password='pewpewpew')
    durrneez = User(
        username='costco $1.50 hot dog', bio="(WITH REFILL)", email='hotdog@hot.dog', password='dollarfiddy')
    umbasa = User(
        username='umbasa nova', email='rampart@ramp.art', password='sheila4ever')
    bloobs = User(username="Blueberry Smith",
                  email="blue@ber.ry", password="hellotomywife")
    caustic1 = User(username="gaspapi01",
                    email="gaspapi01@gas.gas", password="password")
    caustic2 = User(username="gaspapi02",
                    email="gaspapi02@gas.gas", password="password")
    caustic3 = User(username="gaspapi03",
                    email="gaspapi03@gas.gas", password="password")
    caustic4 = User(username="gaspapi04",
                    email="gaspapi04@gas.gas", password="password")
    caustic5 = User(username="gaspapi05",
                    email="gaspapi05@gas.gas", password="password")
    loba1 = User(username="ToxicLobaMain01",
                 email="lobamain01@gas.gas", password="password")
    loba2 = User(username="ToxicLobaMain02",
                 email="lobamain02@gas.gas", password="password")
    loba3 = User(username="ToxicLobaMain03",
                 email="lobamain03@gas.gas", password="password")
    loba4 = User(username="ToxicLobaMain04",
                 email="lobamain04@gas.gas", password="password")
    loba5 = User(username="ToxicLobaMain05",
                 email="lobamain05@gas.gas", password="password")
    gib1 = User(username="Gibletta",
                email="gibraltar1@email.ema", password="password")
    gib2 = User(username="FATHER MILK",
                email="gibraltar2@email.ema", password="password")
    gib3 = User(username="hehe MUH BRUDDA",
                email="gibraltar3@email.ema", password="password")
    gib4 = User(username="Majordome-o",
                email="gibraltar4@email.ema", password="password")
    gib5 = User(username="gibby like gif",
                email="gibraltar5@email.ema", password="password")
    a1 = User(username="CAMEROFF",
              email="user1@cat.cat", password="password")
    a1 = User(username="Su-halo",
              email="user1@cat.cat", password="password")
    a1 = User(username="Yu Ra",
              email="user1@cat.cat", password="password")
    a1 = User(username="FionahhHH",
              email="user1@cat.cat", password="password")
    a1 = User(username="DANIEL",
              email="user1@cat.cat", password="password")
    a1 = User(username="Petur",
              email="user1@cat.cat", password="password")
    a1 = User(username="chrithy",
              email="user1@cat.cat", password="password")
    a1 = User(username="jennJENN",
              email="user1@cat.cat", password="password")
    a1 = User(username="gibby like gif",
              email="user1@cat.cat", password="password")
    a1 = User(username="gibby like gif",
              email="user1@cat.cat", password="password")
    a1 = User(username="gibby like gif",
              email="user1@cat.cat", password="password")

    for datum in [demo, dolph, gp, normie, yoshi, durrneez, trauma, umbasa, bobbie, bloobs, caustic1, caustic2, caustic3, caustic4, caustic5, loba1, loba2, loba3, loba4, loba5, gib1, gib2, gib3, gib4, gib5]:
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
