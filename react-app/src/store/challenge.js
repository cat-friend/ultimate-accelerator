const LOAD_CHALLENGES = "ultimate-accelerator/challenges/LOAD_CHALLENGES";
const ADD_CHALLENGE = "ultimate-accelerator/challenges/ADD_CHALLENGE"
const DELETE_CHALLENGE = "ultimate-accelerator/challenges/DEL_CHALLENGE"


const load = challenges => ({
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
