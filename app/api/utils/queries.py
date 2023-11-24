challenges_by_legend = 'SELECT SUM(userchallengesdimensiontable.value) as results, \
    userchallengesdimensiontable.legend_id, \
    userchallengesdimensiontable.mode_id\
    FROM userchallenges\
    JOIN userchallengesdimensiontable\
    ON userchallenges.id=userchallengesdimensiontable.user_challenge_id\
    WHERE userchallenges.user_id=:user_id AND\
    NOT userchallenges.status=\'completed\'\
    AND legend_id > 0\
    AND mode_id=:mode_id\
    GROUP BY userchallengesdimensiontable.legend_id,\
    userchallengesdimensiontable.mode_id\
    ORDER BY results desc;'

challenges_by_weapon = 'SELECT SUM(userchallengesdimensiontable.value) as results, \
    userchallengesdimensiontable.weapon_id, \
    userchallengesdimensiontable.mode_id\
    FROM userchallenges\
    JOIN userchallengesdimensiontable\
    ON userchallenges.id=userchallengesdimensiontable.user_challenge_id\
    WHERE userchallenges.user_id=:user_id AND\
    NOT userchallenges.status=\'completed\'\
    AND weapon_id > 0\
    AND mode_id=:mode_id\
    GROUP BY userchallengesdimensiontable.weapon_id,\
    userchallengesdimensiontable.mode_id\
    ORDER BY results desc;'

mode_and_legend_specific = 'SELECT SUM(userchallengesdimensiontable.value) as sum, \
    userchallenges.id, \
    userchallengesdimensiontable.mode_id, \
    userchallenges.challenge_label, \
    userchallenges.status \
    FROM userchallenges \
    JOIN userchallengesdimensiontable \
    ON userchallenges.id=userchallengesdimensiontable.user_challenge_id \
    WHERE userchallenges.user_id=:user_id AND \
    NOT userchallenges.status=\'completed\' \
    AND legend_id=:legend_id \
    AND mode_id=:mode_id \
    GROUP BY userchallenges.id, \
    userchallengesdimensiontable.mode_id \
    ORDER BY sum desc;'

mode_and_weapon_specifc = 'SELECT SUM(userchallengesdimensiontable.value) as sum, \
    userchallenges.id, \
    userchallengesdimensiontable.mode_id, \
    userchallenges.challenge_label, \
    userchallenges.status \
    FROM userchallenges \
    JOIN userchallengesdimensiontable \
    ON userchallenges.id=userchallengesdimensiontable.user_challenge_id \
    WHERE userchallenges.user_id=:user_id AND \
    NOT userchallenges.status=\'completed\' \
    AND weapon_id=:weapon_id \
    AND mode_id=:mode_id \
    GROUP BY userchallenges.id, \
    userchallengesdimensiontable.mode_id \
    ORDER BY sum desc;'

weapon_and_legend_agnostic = 'SELECT SUM(userchallengesdimensiontable.value) as sum, \
    userchallenges.id, \
    userchallengesdimensiontable.mode_id, \
    userchallenges.challenge_label, \
    userchallenges.status \
    FROM userchallenges \
    JOIN userchallengesdimensiontable \
    ON userchallenges.id=userchallengesdimensiontable.user_challenge_id \
    WHERE userchallenges.user_id=:user_id AND \
    NOT userchallenges.status=\'completed\' \
    AND userchallengesdimensiontable.weapon_id IS NULL \
    AND userchallengesdimensiontable.legend_id IS NULL \
    AND mode_id=:mode_id \
    GROUP BY userchallenges.id, \
    userchallengesdimensiontable.mode_id \
    ORDER BY sum desc;'


queries ={
    challenges_by_legend,
    challenges_by_weapon,
    mode_and_legend_specific,
    weapon_and_legend_agnostic
}

class QueryOptions:
    def user_mode_legend(user_id, mode_id, legend_id):
        return {
            user_id,
            mode_id,
            legend_id
        }

    def user_mode_weapon(user_id, mode_id, weapon_id):
        return {
            user_id,
            mode_id,
        }

    def user_mode(user_id, mode_id):
        return {
            user_id,
            mode_id,
        }
