from app.models import db, UserChallenge, UserChallengeDimensionTable


def seed_user_challenge():
    labels = ["Deal 1000 damage with pistols",
              "Place 12 matches as Bangalore, Mad Maggie, or Wattson",
              "Deal 5000 damage as Pathfinder, Horizon, or Revenant",
              "Get 40 knockdowns with sub machine guns",
              "Get 20 kills as Wraith, Fuse, or Mirage",
              "Survive 30 ring closings",
              "Finish in the top-3 1 time getting at least 3 kills, knockdowns or assists",
              "Neurolink: Scan 10 enemies as Crypto",
              "Deal 10000 damage with assault rifles",
              "Play 12 matches as Gibraltar, Octane, or Loba",
              "Deal 5000 damage as Pathfinder, Mad Maggie, or Mirage", ]
    challenge_types = [4, 3, 3, 6, 6, 6, 6, 11, 3]
    status = ["open", "open", "open", "in progress",
              "completed", "open", "in progress", "open", "in progress"]
    value = [10, 10, 5, 10, 10, 5, 10, 2, 5]
    user_ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    weapons = [[None],
               [8, 18, 28, 31, 32],
               [None],
               [None],
               [2, 4, 5, 6, 25, 27, 34, 35],
               [10, 14, 15, 26],
               [None],
               [None],
               [None]]

    modes = [[1, 2, 3],
             [2],
             [1, 2, 3],
             [1],
             [1, 2, 3],
             [2],
             [1, 2, 3],
             [1, 2],
             [2]]

    legends = [[4, 13, 12],
               [None],
               [None],
               [6, 18, 14],
               [None],
               [None],
               [None],
               [None],
               [6]]

    for user_id in user_ids:
        for i in range(0, len(labels)):
            entry = UserChallenge(
                user_id=user_id, challenge_label=labels[i], challenge_type_id=challenge_types[i],
                status=status[i], value=value[i])
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
