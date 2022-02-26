const ACCELERATE = "ultimate-accelerator/accelerate/LOAD"

const loadAcceleration = payload => ({
    type: ACCELERATE,
    acceleration: payload
})

export const accelerate = (id) => async (dispatch) => {
    const response = await fetch(`/api/challenges/accelerate/${id}/`)
    const accelerate = await response.json();
    if (response.ok) {
        dispatch(loadAcceleration(accelerate));
    }
    return accelerate;
}

const accelerateReducer = (state = {}, action) => {
    switch (action.type) {
        case ACCELERATE: {
            const newState = { ...action.acceleration }
            return newState;
        }
        default: return state;
    }
}

export default accelerateReducer;
