const LOAD_CHALLENGES = "ultimate-accelerator/challenges/LOAD_CHALLENGES";
const ADD_CHALLENGE = "ultimate-accelerator/challenges/ADD_CHALLENGE";
const DELETE_CHALLENGE = "ultimate-accelerator/challenges/DEL_CHALLENGE";


const loadAllChallenges = challenges => ({
    type: LOAD_CHALLENGES,
    challenges: challenges.challenges
});

const addOneChallenge = challenge => ({
    type: ADD_CHALLENGE,
    challenge
});

export const deleteOneChallenge = challenge => ({
    type: DELETE_CHALLENGE,
    challenge
});

export const createChallenge = (payload) => async (dispatch) => {
    const response = await fetch("/api/challenges/",
        {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
    const challenge = await response.json();
    if (response.ok) {
        dispatch(addOneChallenge(challenge));
    }
    return challenge
}

export const loadChallenges = (id) => async (dispatch) => {
    const response = await fetch(`/api/users/${id}/challenges`)
    const challenges = await response.json();
    if (response.ok) {
        dispatch(loadAllChallenges(challenges));
    }
    return challenges;
}

export const getOneChallenge = (id) => async (dispatch) => {
    const response = await fetch(`/api/challenges/${id}`)
    const challenge = await response.json();
    if (response.ok) {
        dispatch(addOneChallenge(challenge));
    }
    return challenge;
}


export const editChallenge = (payload) => async (dispatch) => {
    const response = await fetch(`/api/challenges/${payload.user_challenge_id}`,
        {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        }
    );
    const challenge = await response.json();
    if (response.ok) {
        dispatch(addOneChallenge(challenge));
    }
    return challenge
}

export const deleteChallenge = (payload) => async (dispatch) => {
    const getCurrChallenge = await fetch(`/api/challenges/${payload.user_challenge_id}`, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (getCurrChallenge.ok) {
        const delChallenge = await fetch(`/api/challenges/${payload.user_challenge_id}`,
            {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            }
        );

        if (delChallenge.ok) {
            const challenge = await getCurrChallenge.json();
            return challenge;
        }
        else return delChallenge.json()
    }
    return getCurrChallenge.json()
}


const challengeReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_CHALLENGES: {
            const allChallenges = {};
            action.challenges.forEach((challenge) => {
                allChallenges[challenge.id] = challenge;
            });
            return allChallenges;
        }
        case ADD_CHALLENGE: {
            const newState = { ...state };
            newState[action.challenge.id] = action.challenge;
            return newState;
        }
        case DELETE_CHALLENGE: {
            const allChallenges = { ...state };
            delete allChallenges[action.challenge.id];
            return allChallenges;
        }
        default: return state;
    }
}

export default challengeReducer;
