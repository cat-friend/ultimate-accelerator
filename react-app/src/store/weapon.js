const LOAD_WEAPONS = "ultimate-accelerator/weapons/LOAD_WEAPONS"

const loadWeapons = weapons => ({
    type: LOAD_WEAPONS,
    weapons
});

export const getAllWeapons = () => async (dispatch) => {
    // fetch weapons from backend
    const response = await fetch('/api/weapons');
    const data = await response.json();
    const weapons = {}
    // map through array and set weapon id: weapon_name
    data.weapons.forEach((ele) => {
        weapons[ele.id] = ele.name
    })
    dispatch(loadWeapons(weapons));
    return weapons;
}


const weaponReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_WEAPONS: {
            const allWeapons = { ...action.weapons };
            return allWeapons
        }
        default: return state;
    }
}

export default weaponReducer;
