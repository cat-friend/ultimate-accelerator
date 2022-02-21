const LOAD_CLANS = "ultimate-accelerator/clans/LOAD_CLANS";
const ADD_CLAN = "ultimate-accelerator/clans/ADD_CLAN"
const DELETE_CLAN = "ultimate-accelerator/clans/DEL_CLAN"

const loadAllClans = clans => ({
    type: LOAD_CLANS,
    clans: clans.clans
});

const addOneClan = clan => ({
    type: ADD_CLAN,
    clan
});

export const deleteOneClan = clan => ({
    type: DELETE_CLAN,
    clan
});

export const createClan = (payload) => async (dispatch) => {
    const response = await fetch("/api/clans/",
        {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
    const clan = await response.json();
    if (response.ok) {
        dispatch(addOneClan(clan));
    }
    return clan
}

export const loadClans = () => async (dispatch) => {
    const response = await fetch(`/api/clans`)
    const clans = await response.json();
    if (response.ok) {
        dispatch(loadAllClans(clans));
    }
    return clans;
}

export const getOneClan = (id) => async (dispatch) => {
    const response = await fetch(`/api/clans/${id}`)
    const clan = await response.json();
    if (response.ok) {
        dispatch(addOneClan(clan));
    }
    return clan;
}

// export const editChallenge = (payload) => async (dispatch) => {
//     const response = await fetch(`/api/challenges/${payload.user_challenge_id}`,
//         {
//             method: 'PUT',
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(payload)
//         }
//     );
//     const challenge = await response.json();
//     if (response.ok) {
//         dispatch(addOneChallenge(challenge));
//     }
//     return challenge
// }

export const deleteClan = (payload) => async (dispatch) => {
    const getCurrClan = await fetch(`/api/clans/${payload.clan.id}`, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (getCurrClan.ok) {
        const delClan = await fetch(`/api/clans/${payload.clan.id}`,
            {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            }
        );

        if (delClan.ok) {
            const clan = await getCurrClan.json();
            return clan;
        }
        else return delClan.json()
    }
    return getCurrClan.json()
}

const clanReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_CLANS: {
            const allClans = {};
            action.clans.forEach((clan) => {
                allClans[clan.id] = clan;
            });
            return allClans;
        }
        default: return state;
    }
}

export default clanReducer;
