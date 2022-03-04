const LOAD_LEGENDS = "ultimate-accelerator/legends/LOAD_LEGENDS";

const loadLegends = legends => ({
    type: LOAD_LEGENDS,
    legends
});

export const getAllLegends = () => async (dispatch) => {
    // fetch legends from backend
    const response = await fetch('/api/legends');
    const data = await response.json();
    const legends = {}
    // map through array and set legend id: legend_name
    data.legends.forEach((ele) => {
        legends[ele.id] = ele.name
    })
    dispatch(loadLegends(legends));
    return legends;
}


const legendReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_LEGENDS: {
            const allLegends = { ...action.legends };
            return allLegends
        }
        default: return state;
    }
}

export default legendReducer;
