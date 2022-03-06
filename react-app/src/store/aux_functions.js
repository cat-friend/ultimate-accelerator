function accelArray(payload) {
    console.log("backend payload", payload)
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
                challenges: []
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
                challenges: []
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
                challenges: []
            },
        }
    }
    if (payload.legend_mode_1.length) {
        const sum = payload.legend_mode_1[0].sum
        result.mode_2.legends.max = payload.legend_mode_2.filter((ele) => {
            return ele.sum === sum;
        })
        payload.legend_mode_1_challenges = Object.values(payload.legend_mode_1_challenges);
        payload.legend_mode_1_challenges = payload.legend_mode_1_challenges.filter((ele) => {
            return ele.sum === sum;
        })
        result.mode_1.legends.challenges = payload.legend_mode_1_challenges;

    }
    if (payload.legend_mode_2.length) {
        const sum = payload.legend_mode_2[0].sum
        result.mode_2.legends.max = payload.legend_mode_2.filter((ele) => {
            return ele.sum === sum;
        })
        payload.legend_mode_2_challenges = Object.values(payload.legend_mode_2_challenges);
        payload.legend_mode_2_challenges = payload.legend_mode_2_challenges.filter((ele) => {
            return ele.sum === sum;
        })
        result.mode_2.legends.challenges = payload.legend_mode_2_challenges;
    }

    if (payload.legend_mode_3.length) {
        const sum = payload.legend_mode_3[0].sum
        result.mode_3.legends.max = payload.legend_mode_3.filter((ele) => {
            return ele.sum === sum;
        })
        payload.legend_mode_3_challenges = Object.values(payload.legend_mode_3_challenges);
        payload.legend_mode_3_challenges = payload.legend_mode_3_challenges.filter((ele) => {
            return ele.sum === sum;
        })
        result.mode_3.legends.challenges = payload.legend_mode_3_challenges;
    }
    if (payload.weapon_mode_1.length) {
        const sum = payload.weapon_mode_1[0].sum
        result.mode_2.weapons.max = payload.weapon_mode_2.filter((ele) => {
            return ele.sum === sum;
        })
        payload.weapon_mode_1_challenges = Object.values(payload.weapon_mode_1_challenges);
        payload.weapon_mode_1_challenges = payload.weapon_mode_1_challenges.filter((ele) => {
            return ele.sum === sum;
        })
        result.mode_1.weapons.challenges = payload.weapon_mode_1_challenges;

    }
    if (payload.weapon_mode_2.length) {
        const sum = payload.weapon_mode_2[0].sum
        result.mode_2.weapons.max = payload.weapon_mode_2.filter((ele) => {
            return ele.sum === sum;
        })
        payload.weapon_mode_2_challenges = Object.values(payload.weapon_mode_2_challenges);
        payload.weapon_mode_2_challenges = payload.weapon_mode_2_challenges.filter((ele) => {
            return ele.sum === sum;
        })
        result.mode_2.weapons.challenges = payload.weapon_mode_2_challenges;
    }

    if (payload.weapon_mode_3.length) {
        const sum = payload.weapon_mode_3[0].sum
        result.mode_3.weapons.max = payload.weapon_mode_3.filter((ele) => {
            return ele.sum === sum;
        })
        payload.weapon_mode_3_challenges = Object.values(payload.weapon_mode_3_challenges);
        payload.weapon_mode_3_challenges = payload.weapon_mode_3_challenges.filter((ele) => {
            return ele.sum === sum;
        })
        result.mode_3.weapons.challenges = payload.weapon_mode_3_challenges;
    }

    if (payload.misc_mode_1_challenges.length) {
        result.mode_1.misc.challenges = payload.misc_mode_1_challenges;
    }

    if (payload.misc_mode_2_challenges.length) {
        result.mode_2.misc.challenges = payload.misc_mode_2_challenges;
    }

    if (payload.misc_mode_3_challenges.length) {
        result.mode_3.misc.challenges = payload.misc_mode_3_challenges;
    }
    return result
}

export default accelArray;

function challengesSet(payload) {
    const set = new Set(payload);
    const setVals = set.values();
    const outbound = [];
    for (const val of setVals) outbound.push(val);
    return outbound;
}
