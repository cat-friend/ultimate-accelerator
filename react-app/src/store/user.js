const LOAD_USER = "ultimate-accelerator/user/LOAD_USER"

const loadOneUser = (user) => ({
    type: LOAD_USER,
    user
});

export const getOneUser = (id) => async (dispatch) => {
    const response = await fetch(`/api/users/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const user = await response.json();
        user.clan_id = user.clan_id.clan_id;
        dispatch(loadOneUser(user));
        return user;
    }
    else if (response.status < 500) {
        const data = await response.json();
        return data
    }
    else {
        return ['An error occurred. Please try again.']
    }
}

export default function userReducer(state = {}, action) {
    switch (action.type) {
        case LOAD_USER:
            return { ...action.user }
        default:
            return state;
    }
}
