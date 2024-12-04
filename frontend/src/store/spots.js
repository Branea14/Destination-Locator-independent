import { csrfFetch } from "./csrf";

export const GET_ALL_SPOTS = 'spots/getAllSpots';
export const GET_SINGLE_SPOT = 'spots/getSingleSpot'

export const loadSpots = (allSpots) => ({
    type: GET_ALL_SPOTS,
    allSpots
});

export const loadSingleSpot = spot => ({
    type: GET_SINGLE_SPOT,
    spot
})


export const getAllSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
        const data = await response.json();
        dispatch(loadSpots(data));
        return data;
    }
}

export const getSingleSpot = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(loadSingleSpot(data))
        return data;
    }
}

const initialState = {
    spots: [],
    singleSpot: null
};

const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPOTS:
            return { ...state, spots: action.allSpots };
        case GET_SINGLE_SPOT:
            return {...state, singleSpot: action.spot}
        default:
            return state
    }

}

export default spotReducer;
