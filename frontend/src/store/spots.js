import { csrfFetch } from "./csrf";

export const GET_ALL_SPOTS = 'spots/getAllSpots';
export const GET_SINGLE_SPOT = 'spots/getSingleSpot'
export const CREATE_SPOT =  'spots/createSpot'

export const loadSpots = (spots) => ({
    type: GET_ALL_SPOTS,
    spots
});

export const loadSingleSpot = spot => ({
    type: GET_SINGLE_SPOT,
    payload: spot
});

export const createNewSpot = spot => ({
    type: CREATE_SPOT,
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

export const getSingleSpot = (spotId) => async dispatch => {
    console.log(`erika ${spotId}`)
    const response = await csrfFetch(`/api/spots/${spotId}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(loadSingleSpot(data))
        return data;
    } else {
        console.error('failed to fetch single spot', response)
    }
}

export const createSpot = (newSpot) => async dispatch => {
    // console.log('spotData', newSpot)
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        // headers: {
        //     // 'Content-Type': 'application/json'
        // },
        body: JSON.stringify(newSpot)
    });

    if (response.ok) {
        const data = await response.json();
        console.log('data', data)
        dispatch(createNewSpot(data));
        return data;
    }
}

const initialState = {
    spots: [],
    singleSpot: null
    // newSpot: []
};

const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPOTS:
            return { ...state, spots: action.spots };
        case GET_SINGLE_SPOT:
            // const {...spot} = action.payload;
            console.log('action.payload', action.payload)
            return {...state, singleSpot: action.payload};
        case CREATE_SPOT:
            return {
                ...state,
                // singleSpot: {
                //     ...action.newSpot,
                //     SpotImages: action.newSpot.SpotImages
                // },
                singleSpot: action.spot,
                spots: [...state.spots, action.spot]
                // newSpot: !state.newSpot ? [action.spot] : [...state.newSpot, action.spot]
            };
        default:
            return state
    }
}

export default spotReducer;
