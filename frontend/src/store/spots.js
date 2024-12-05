import { csrfFetch } from "./csrf";

export const GET_ALL_SPOTS = 'spots/getAllSpots';
export const GET_SINGLE_SPOT = 'spots/getSingleSpot'
export const CREATE_SPOT =  'spots/createSpot'

export const loadSpots = (allSpots) => ({
    type: GET_ALL_SPOTS,
    allSpots
});

export const loadSingleSpot = spot => ({
    type: GET_SINGLE_SPOT,
    spot
});

export const createNewSpot = newSpot => ({
    type: CREATE_SPOT,
    newSpot
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

export const createSpot = (newSpot) => async dispatch => {
    const response = await csrfFetch('/api/spots/new', {
        method: 'POST',
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        body: JSON.stringify(newSpot)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(createNewSpot(data));
        return data;
    }
}

const initialState = {
    spots: [],
    singleSpot: null,
    newSpot: []
};

const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPOTS:
            return { ...state, spots: action.allSpots };
        case GET_SINGLE_SPOT:
            return {...state, singleSpot: action.spot};
        case CREATE_SPOT:
            return {

                ...state,
                singleSpot: {
                    ...action.newSpot,
                    SpotImages: action.newSpot.SpotImages
                },
                spots: [...state.spots, action.newSpot],
                newSpot: state.newSpot ? [...state.newSpot, action.newSpot] : [action.newSpot]
            };
        default:
            return state
    }

}

export default spotReducer;
