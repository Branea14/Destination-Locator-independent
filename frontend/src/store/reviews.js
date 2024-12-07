import { csrfFetch } from "./csrf";

export const GET_ALL_REVIEWS = 'reviews/getAllReviews';
export const POST_A_REVIEW = 'reviews/postAReview'

export const loadReviews = allReviews => ({
    type: GET_ALL_REVIEWS,
    allReviews
});

export const addOneReview = review => ({
    type: POST_A_REVIEW,
    review
})

export const getAllReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const data = await response.json();
        dispatch(loadReviews(data.Reviews));
        return data;
    }
}

export const postAReview = (newReview) => async dispatch => {
    const {spotId, review, stars} = newReview;
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        body: JSON.stringify({review, stars})
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(addOneReview(data));
        // dispatch(addOneReview(data.Reviews))
        return data;
    }
}

const initialState = {
    reviews: [],
    // newReview: []
};

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_REVIEWS:
            return {...state, reviews: action.allReviews};
        case POST_A_REVIEW:
            return {
                ...state,
                reviews: [...state.reviews, action.review]
                // newReview: [...state.newReview, action.review]
            };
        default:
            return state;
    }
}

export default reviewReducer;
