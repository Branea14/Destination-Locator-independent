import { csrfFetch } from "./csrf";

export const GET_ALL_SPOTS = 'spots/getAllSpots';

export const loadSpots = (allSpots) => ({
    type: GET_ALL_SPOTS,
    allSpots
});

export const getAllSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
        const data = await response.json();
        dispatch(loadSpots(data));
        return data;
    }
}

const initialState = {
    spots: []
};

const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPOTS:
            return { ...state, spots: action.allSpots };
        default:
            return state
    }

}

export default spotReducer;
