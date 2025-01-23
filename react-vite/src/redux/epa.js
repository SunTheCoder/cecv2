// Just one action type for setting the data
const SET_EPA_DATA = 'epa/SET_EPA_DATA';

// Simple action creator
const setEPAData = (data) => ({
    type: SET_EPA_DATA,
    payload: data
});

// Simple thunk to fetch data
export const thunkFetchEPAData = () => async (dispatch) => {
    const response = await fetch('/api/epa-communities');
    if (response.ok) {
        const data = await response.json();
        dispatch(setEPAData(data));
    }
};

// Simple reducer
const initialState = { data: null };

const epaReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EPA_DATA:
            return { data: action.payload };
        default:
            return state;
    }
};

export default epaReducer; 