function accelArray(payload) {
    console.log("backend payload", payload)
    const result = {
        legendMode1Max: [],
        legendMode2Max: [],
        legendMode3Max: [],
        weaponMode1Max: [],
        weaponMode2Max: [],
        weaponMode3Max: [],
    }
    const outbound_payload = [];
    if (payload.legend_mode_1.length) {
        let i = 0;
        do {
            result.legendMode1Max.push(payload.legend_mode_1[i])
            // outbound_payload.push({mode_id: 1, type: legend_id, type_id: payload.legend_mode_1[i].legend_id})
            i++;
        }
        while (i < payload.legend_mode_1.length && payload.legend_mode_1[i - 1].sum === payload.legend_mode_1[i].sum);

    }
    if (payload.legend_mode_2.length) {
        let i = 0;
        do {
            result.legendMode2Max.push(payload.legend_mode_2[i])
            i++;
        }
        while (i < payload.legend_mode_2.length && payload.legend_mode_2[i - 1].sum === payload.legend_mode_2[i].sum);
    }

    if (payload.legend_mode_3.length) {
        let i = 0;
        do {
            result.legendMode3Max.push(payload.legend_mode_3[i])
            i++;
        }
        while (i < payload.legend_mode_3.length && payload.legend_mode_3[i - 1].sum === payload.legend_mode_3[i].sum);
    }
    if (payload.weapon_mode_1.length) {
        let i = 0;
        do {
            result.weaponMode1Max.push(payload.weapon_mode_1[i])
            i++;
        }
        while (i < payload.weapon_mode_1.length && payload.weapon_mode_1[i - 1].sum === payload.weapon_mode_1[i].sum);

    }
    if (payload.weapon_mode_2.length) {
        let i = 0;
        do {
            result.weaponMode2Max.push(payload.weapon_mode_2[i])
            i++;
        }
        while (i < payload.weapon_mode_2.length && payload.weapon_mode_2[i - 1].sum === payload.weapon_mode_2[i].sum);
    }

    if (payload.weapon_mode_3.length) {
        let i = 0;
        do {
            result.weaponMode3Max.push(payload.weapon_mode_3[i])
            i++;
        }
        while (i < payload.weapon_mode_3.length && payload.weapon_mode_3[i - 1].sum === payload.weapon_mode_3[i].sum);
    }
    return result
}

export default accelArray;
