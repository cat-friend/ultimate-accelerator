import accelArray from "./aux_functions"

const ACCELERATE = "ultimate-accelerator/accelerate/LOAD"

const loadAcceleration = payload => ({
    type: ACCELERATE,
    acceleration: payload
})

// const response = await fetch('/api/challenges/accelerate/2')
// const data = await response.json();
// console.log(data)

export const accelerate = (id) => async (dispatch) => {
    const response = await fetch(`/api/challenges/accelerate/${id}`)
    const accelerate = await response.json();
    if (response.ok) {
        const results = accelArray(accelerate)
        dispatch(loadAcceleration(results));
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
