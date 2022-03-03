const LOAD_CLANS = "ultimate-accelerator/clans/LOAD_CLANS";
const ADD_CLAN = "ultimate-accelerator/clans/ADD_CLAN"
const LOAD_CLAN_MEMBERS = "ultimate-accelerator/clans/LOAD_CLAN_MEMBERS";
const DELETE_CLAN = "ultimate-accelerator/clans/DEL_CLAN"
const DELETE_CLAN_MEMBER = "ultimate-accelerator/clans/DEL_CLAN_MEMBER"
const LOAD_ONE_CLAN = "ultimate-accelerator/clans/LOAD_ONE_CLAN"

const loadAllClans = clans => ({
    type: LOAD_CLANS,
    clans: clans.clans
});


const loadOneClan = clan => ({
    type: LOAD_ONE_CLAN,
    clan
})

export const loadClanMembers = (clanId, members) => ({
    type: LOAD_CLAN_MEMBERS,
    clanId,
    members
})

const delClanMember = payload => ({
    type: DELETE_CLAN_MEMBER,
    payload
})

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
    return clan;
}

export const loadClans = () => async (dispatch) => {
    const response = await fetch(`/api/clans/`)
    const clans = await response.json();
    if (response.ok) {
        dispatch(loadAllClans(clans));
    }
    return clans;
}

export const getOneClan = (id) => async (dispatch) => {
    const response = await fetch(`/api/clans/${id}`,
        {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        });
    const clan_data = await response.json();
    const clan = {};
    if (response.ok) {
        clan.id = clan_data.clan.id;
        clan.name = clan_data.clan.name;
        clan.owner_user_id = clan_data.clan.owner_user_id;
        clan.members = {};
        clan.description = clan_data.clan.description;
        clan.created_at = clan_data.clan.created_at;
        clan_data.clan_members.forEach((ele) => {
            clan.members[ele.user_id] = { user_id: ele.user_id, username: ele.member.username }
        });
        dispatch(loadOneClan(clan));
        return clan;
    }
    return clan_data;
}

export const editClan = (payload) => async (dispatch) => {
    const response = await fetch(`/api/clans/${payload.clan_id}`,
        {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        }
    );
    const clan_data = await response.json();
    const clan = {}
    if (response.ok) {
        clan.id = clan_data.clan.id;
        clan.name = clan_data.clan.name;
        clan.description = clan_data.clan.description;
        clan.owner_user_id = clan_data.clan.owner_user_id;
        clan.members = {};
        clan.created_at = clan_data.clan.created_at;
        clan_data.clan_members.forEach((ele) => {
            clan.members[ele.user_id] = { user_id: ele.user_id, username: ele.member.username }
        });
        dispatch(addOneClan(clan));
        return clan;
    }
    return clan_data;
}

export const deleteClan = (payload) => async (dispatch) => {
    const getCurrClan = await fetch(`/api/clans/${payload.clanId}`, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (getCurrClan.ok) {
        const delClan = await fetch(`/api/clans/${payload.clanId}`,
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

export const addClanMember = (payload) => async (dispatch) => {
    const response = await fetch(`/api/clans/${payload.clan_id}/join`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
    const data = await response.json()
    const members = {};
    if (response.ok) {
        data.clan_members.forEach((ele) => {
            members[ele.user_id] = { user_id: ele.user_id, username: ele.member.username }
        });
        dispatch(loadClanMembers(payload.clan_id, members));
    }
    return data;
}

export const removeClanMember = (payload) => async (dispatch) => {
    const response = await fetch(`/api/clans/${payload.clan_id}/join`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
    const data = response.json();
    if (response.ok) {
        dispatch(delClanMember(payload));
    }
    return data;

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
        case ADD_CLAN: {
            const newState = { ...state };
            newState[action.clan.id] = action.clan;
            return newState;
        }
        case LOAD_ONE_CLAN: {
            const newState = action.clan;
            return newState;
        }
        case LOAD_CLAN_MEMBERS: {
            const newState = { ...state };
            newState.members = action.members;
            return newState;
        }
        case DELETE_CLAN_MEMBER: {
            const newState = { ...state };
            delete newState.members[action.payload.user_id];
            return newState;
        }
        default: return state;
    }
}

export default clanReducer;
