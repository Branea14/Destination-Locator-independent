import { csrfFetch } from "./csrf";

export const GET_ALL_SPOTS = 'spots/getAllSpots';
export const GET_SINGLE_SPOT = 'spots/getSingleSpot';
export const CREATE_SPOT =  'spots/createSpot';
export const EDIT_SPOT = 'spots/editSpot';
export const DELETE_SPOT = 'spots/deleteSpot'

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

export const editSpotAction = spot => ({
    type: EDIT_SPOT,
    spot
})

export const deleteSpotAction = (spotId) => ({
    type: DELETE_SPOT,
    spotId
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
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify(newSpot)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(createNewSpot(data));
        return data;
    }
}

export const editSpot = (spot) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'PUT',
        body: JSON.stringify({
            'country': spot.country,
            'address': spot.address,
            'city': spot.city,
            'state': spot.state,
            'description': spot.description,
            'name': spot.spotName,
            'price': spot.price,
            'SpotImages': spot.imageUrls?.map((url, index) => ({
                url,
                preview: index === 0
            }))
        })
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(editSpotAction(data));
        return data;
    }
}

export const removeSpot = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(deleteSpotAction(spotId));
        return spotId;
    }
}

const initialState = {
    spots: {},
    singleSpot: null
};

const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPOTS:
            const normalizedSpots = {};
            const spotsArray = Array.isArray(action.spots) ? action.spots : action.spots.Spots;
            spotsArray.forEach((spot) => {
                normalizedSpots[spot.id] = spot;
            });
            return { ...state, spots: normalizedSpots };

        case GET_SINGLE_SPOT:
            return {...state, singleSpot: action.payload};

        case CREATE_SPOT:
            return {
                ...state,
                singleSpot: action.spot,
                spots: {...state.spots, [action.spot.id]: action.spot}
            };

        case EDIT_SPOT:
            return {
                ...state,
                singleSpot: action.spot,
                spots: { ...state.spots, [action.spot.id]: action.spot }
            };

        case DELETE_SPOT:
            const updatedSpots = {...state.spots}
            delete updatedSpots[action.spotId]
            return {
                ...state,
                spots: updatedSpots,
                singleSpot: state.singleSpot?.id === action.spotId ? null : state.singleSpot
            }

        default:
            return state
    }
}

export default spotReducer;
