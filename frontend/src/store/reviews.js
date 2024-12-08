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
    singleSpot: null
};

const calculateNewAverage = (currAverage, totalReviews, newStarRating) => {
    const newTotal = totalReviews + 1;
    const updatedStarRating = currAverage * totalReviews + newStarRating;
    return updatedStarRating / newTotal;
}

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_REVIEWS:
            return {...state, reviews: action.allReviews};
        case POST_A_REVIEW:
            console.log('action', action)
            if (!state.singleSpot) return state;
            const updatedSpot = {
                ...state.singleSpot,
                numReviews: state.singleSpot.numReviews + 1,
                avgStarRating: calculateNewAverage(state.singleSpot.avgStarRating, state.singleSpot.numReviews, action.review.stars),
            };

            console.log('updated singleSpot', updatedSpot)
            return {
                ...state,
                reviews: [...state.reviews, action.review],
                singleSpot: updatedSpot
            };
        default:
            return state;
    }
}

export default reviewReducer;
