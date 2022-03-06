from app.models import db, UserChallenge, UserChallengeDimensionTable


def seed_user_challenge():
    labels = [
        "Deal 1000 damage with pistols - 10 - 2",
        "Play 12 matches as Bangalore, Mad Maggie, or Wattson - 10 - 123",
        "Deal 5000 damage as Pathfinder, Horizon, or Revenant - 10 - 1",
        "Get 40 knockdowns with sub machine guns - 10 - 2",
        "Get 20 kills as Wraith, Fuse, or Mirage - 5 - 2",
        "Survive 30 ring closings - 5 - 123",
        "Finish in the top-3 1 time getting at least 3 kills, knockdowns or assists - 5 - 1",
        "Neurolink: Scan 10 enemies as Crypto - 2 - 123",
        "Deal 10000 damage with assault rifles - 10 - 2",
        "Play 12 matches as Gibraltar, Octane, or Loba - 10 - 123",
        "Deal 5000 damage as Pathfinder, Mad Maggie, or Mirage - 10 - 1",
        "Get 30 knockdowns with sub machine guns - 10 - 1",
        "Win 3 matches as Bangalore, Ash, or Caustic - 5 - 2",
        "Deal 500 melee damage - 5 - 123",
        "Get 50 kills or assists 5 - 1",
        "Play 10 matches - 2 - 123",
        "Deal 3500 damage with shotguns - 10 - 2",
        "Play 12 matches as Bangalore, Octane, or Mirage - 10 - 123",
        "Deal 5000 damage as Wraith, Wattson, or Fuse 10 - 1",
        "Get 25 knockdowns with sniper rifles - 10 - 1",
        "Get 20 kills as Lifeline, Mad Maggie or Caustic - 5 - 2",
        "Finish in the top-3 1 time getting at least 3 kills, knockdowns, or assists 5- 1",
        "Deal 5000 damage 5 - 1",
        "Loot 50 epic items - 2 - 1",
        "Deal 3500 damage with marksman weapons - 10 - 1",
        "Play 12 matches as Bloodhound, Fuse, or Caustic 10 - 123",
        "Deal 5000 damage as Gibraltar, Valkyrie, or Crypto - 10 -1 ",
        "Get 40 knockdowns with sub machine guns 10 2",
        "Get 15 kills as Wraith, Rampart or Wattson 5 1",
        "Get 5 Battle Royale Top 10 finishes or Arenas wins 5 12",
        "Win 1 match getting at least five kills, knockdowns, or assists 5 2",
        "Deal 1000 damage before the end of the first shrink 2 1"
    ]
    value = [
        10,
        10,
        10,
        10,
        5,
        5,
        5,
        2,
        10,
        10,
        10,
        10,
        5,
        5,
        5,
        2,
        10,
        10,
        10,
        10,
        5,
        5,
        5,
        2,
        10,
        10,
        10,
        10,
        5,
        5,
        5,
        2
    ]
    challenge_types = [
        3,
        8,
        3,
        6,
        6,
        11,
        4,
        1,
        3,
        8,
        3,
        6,
        4,
        3,
        6,
        8,
        3,
        8,
        3,
        6,
        6,
        4,
        3,
        7,
        3,
        8,
        3,
        6,
        6,
        4,
        4,
        3
    ]
    user_ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
    weapons = [
        [23, 29, 36],
        [None],
        [None],
        [2, 4, 25, 27, 34, 35],
        [None],
        [None],
        [None],
        [None],
        [10, 11, 14, 15, 26],
        [None],
        [None],
        [2, 4, 25, 27, 34, 35],
        [None],
        [None],
        [None],
        [None],
        [9, 21, 22, 24],
        [None],
        [None],
        [7, 16, 17, 19, 20, 30],
        [None],
        [None],
        [None],
        [None],
        [1, 3, 12, 13, 33],
        [None],
        [None],
        [2, 4, 25, 27, 34, 35],
        [None],
        [None],
        [None],
        [None]
    ]

    modes = [
        [2],
        [1, 2, 3],
        [1],
        [2],
        [2],
        [1, 2, 3],
        [1],
        [1, 2, 3],
        [2],
        [1, 2, 3],
        [1],
        [1],
        [2],
        [1, 2, 3],
        [1],
        [1, 2, 3],
        [2],
        [1, 2, 3],
        [1],
        [1],
        [2],
        [1],
        [1],
        [1],
        [1],
        [1, 2, 3],
        [1],
        [2],
        [1],
        [1, 2],
        [2],
        [1]
    ]

    legends = [
        [None],
        [6, 20, 10],
        [4, 15, 12],
        [None],
        [16, 5, 9],
        [None],
        [None],
        [11],
        [None],
        [2, 8, 13],
        [4, 20, 9],
        [None],
        [6, 19, 7],
        [None],
        [None],
        [None],
        [None],
        [6, 8, 9],
        [5, 10, 16],
        [None],
        [3, 20, 7],
        [None],
        [None],
        [None],
        [None],
        [1, 16, 7],
        [2, 17, 11],
        [None],
        [5, 14, 10],
        [None],
        [None],
        [None]
    ]

    for user_id in user_ids:
        for i in range(0, len(labels)):
            entry = UserChallenge(
                user_id=user_id, challenge_label=labels[i], challenge_type_id=challenge_types[i],
                status="open", value=value[i])
            db.session.add(entry)
            db.session.commit()
            for weapon in weapons[i]:
                for mode in modes[i]:
                    for legend in legends[i]:
                        dim_table_entry = UserChallengeDimensionTable(
                            user_challenge_id=entry.id, weapon_id=weapon, mode_id=mode,
                            legend_id=legend, value=value[i]
                        )
                        db.session.add(dim_table_entry)
                        db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities


def undo_user_challenge():
    db.session.execute('TRUNCATE userchallenges RESTART IDENTITY CASCADE;')
    db.session.commit()
