import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { getAllReviews } from "../../store/reviews";

const Reviews = () => {
    const {spotId} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const reviews = useSelector(state => state.reviews.reviews)
    const currentUser = useSelector(state => state.session.user);
    const spotOwnerId = useSelector(state => state.spot.singleSpot?.ownerId)

    const hasReviewed = reviews.some((review) => review.userId === currentUser?.id);
    const showReviewButton = currentUser && !hasReviewed && (spotOwnerId !== currentUser.id);
    console.log(showReviewButton)

    const postReviewButton = () => {

        if (showReviewButton) navigate()
    }

    useEffect(() => {
        if (spotId) dispatch(getAllReviews(spotId))
    }, [spotId, dispatch]);

    if (!reviews) return null;



    return (
        <>
            {reviews.map((review, index) => {
                const createdAt = new Date(review.createdAt);
                // found solution on StackOverFlow
                // const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                // const month = months[createdAt.getMonth()];
                // const year = createdAt.getFullYear();
                const options = {year: 'numeric', month: 'long'};

                // const formattedDate = `${month} ${year}`;
                const formattedDate = createdAt.toLocaleDateString('en-US', options)
                return (
                    <div key={index}>
                        {showReviewButton && <button>Post Your Review</button>}
                        <div>{review.User.firstName}</div>
                        <div>{formattedDate}</div>
                        <div>{review.review}</div>
                    </div>
                )

            })}
        </>
    )
}

export default Reviews;
