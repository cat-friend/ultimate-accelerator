function accelArray(payload) {
    console.log("payload", payload)
    const result = {
        mode_1: {
            legends: {
                max: [],
                challenges: {}
            },
            weapons: {
                max: [],
                challenges: {}
            },
            misc: {
                challenges: {}
            },
        },
        mode_2: {
            legends: {
                max: [],
                challenges: {}
            },
            weapons: {
                max: [],
                challenges: {}
            },
            misc: {
                challenges: {}
            },
        },
        mode_3: {
            legends: {
                max: [],
                challenges: {}
            },
            weapons: {
                max: [],
                challenges: {}
            },
            misc: {
                challenges: {}
            },
        }
    }
    if (payload.legend_mode_1.length) {
        result.mode_1.legends.max = payload.legend_mode_1
        result.mode_1.legends.challenges = payload.legend_mode_1_challenges;
    }
    if (payload.legend_mode_2.length) {
        result.mode_2.legends.max = payload.legend_mode_2
        result.mode_2.legends.challenges = payload.legend_mode_2_challenges;
    }

    if (payload.legend_mode_3.length) {
        result.mode_3.legends.max = payload.legend_mode_3
        result.mode_3.legends.challenges = payload.legend_mode_3_challenges;

    }
    if (payload.weapon_mode_1.length) {
        result.mode_1.weapons.max = payload.weapon_mode_1
        result.mode_1.weapons.challenges = payload.weapon_mode_1_challenges;
    }
    if (payload.weapon_mode_2.length) {
        result.mode_2.weapons.max = payload.weapon_mode_2
        result.mode_2.weapons.challenges = payload.weapon_mode_2_challenges;
    }

    if (payload.weapon_mode_3.length) {
        result.mode_3.weapons.max = payload.weapon_mode_3
        result.mode_3.weapons.challenges = payload.weapon_mode_3_challenges;
    }

    if (payload.misc_mode_1_challenges.length) {
        payload.misc_mode_1_challenges.forEach((ele) => result.mode_1.misc.challenges[ele.id] = ele)
    }

    if (payload.misc_mode_2_challenges.length) {
        payload.misc_mode_2_challenges.forEach((ele) => result.mode_2.misc.challenges[ele.id] = ele)
    }

    if (payload.misc_mode_3_challenges.length) {
        payload.misc_mode_3_challenges.forEach((ele) => result.mode_3.misc.challenges[ele.id] = ele)
    }
    return result
}

export default accelArray;
