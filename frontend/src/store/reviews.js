import { csrfFetch } from "./csrf";

export const GET_ALL_REVIEWS = 'reviews/getAllReviews';

export const loadReviews = allReviews => ({
    type: GET_ALL_REVIEWS,
    allReviews
})

export const getAllReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const data = await response.json();
        dispatch(loadReviews(data.Reviews));
        return data;
    }
}

const initialState = {
    reviews: []
};

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_REVIEWS:
            return {...state, reviews: action.allReviews};
        default:
            return state;
    }
}

export default reviewReducer;
