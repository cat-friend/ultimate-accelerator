const LOAD_CHALLENGES = "ultimate-accelerator/challenges/LOAD_CHALLENGES";
const ADD_CHALLENGE = "ultimate-accelerator/challenges/ADD_CHALLENGE"
const DELETE_CHALLENGE = "ultimate-accelerator/challenges/DEL_CHALLENGE"


const loadAllChallenges = challenges => ({
    type: LOAD_CHALLENGES,
    challenges: challenges.challenges
});

const addOneChallenge = challenge => ({
    type: ADD_CHALLENGE,
    challenge
});

const deleteOneChallenge = challenge => ({
    type: DELETE_CHALLENGE
});

export const createChallenge = (payload) => async (dispatch) => {
    const response = await fetch("/api/challenges/", {
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

export const loadChallenges = (payload) => async (dispatch) => {
    const response = await fetch(`/api/users/${payload}/challenges`)
    const challenges = await response.json();
    if (response.ok) {
        dispatch(loadAllChallenges(challenges));
    }
    return challenges;
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
            delete allChallenges[action.challenge.id]
            return allChallenges;
        }
        default: return state;
    }
}

export default challengeReducer;
