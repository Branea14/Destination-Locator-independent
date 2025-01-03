import { csrfFetch } from "./csrf";

export const GET_ALL_REVIEWS = 'reviews/getAllReviews';
export const POST_A_REVIEW = 'reviews/postAReview';
export const DELETE_REVIEW = 'reviews/deleteReview'

export const loadReviews = allReviews => ({
    type: GET_ALL_REVIEWS,
    allReviews
});

export const addOneReview = review => ({
    type: POST_A_REVIEW,
    review
})

export const deleteReviewAction = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
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
        return data;
    }
}

export const removeReview = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(deleteReviewAction(reviewId));
        return reviewId;
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

        case POST_A_REVIEW:{
            if (!state.singleSpot) return state;
            const updatedSpot = {
                ...state.singleSpot,
                numReviews: state.singleSpot.numReviews + 1,
                avgStarRating: calculateNewAverage(state.singleSpot.avgStarRating, state.singleSpot.numReviews, action.review.stars),
            };
            return {
                ...state,
                reviews: [...state.reviews, action.review],
                singleSpot: updatedSpot
            }}

        case DELETE_REVIEW:
          {  if (!state.singleSpot) return state;

            const remainingReviews = state.singleSpot.Reviews.filter(
                (review) => review.id !== action.reviewId
            );

            const totalStars = remainingReviews.reduce((sum, review) => sum + review.stars, 0);
            const updatedAvgStarRating = remainingReviews.length > 0 ? totalStars / remainingReviews.length : null;

            const updatedSingleSpot = {
                ...state.singleSpot,
                Reviews: remainingReviews,
                numReviews: remainingReviews.length,
                avgStarRating: updatedAvgStarRating,
            };

            return {...state, singleSpot: updatedSingleSpot}}
        default:
            return state;
    }
}

export default reviewReducer;
