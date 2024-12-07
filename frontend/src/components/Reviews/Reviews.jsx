import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getAllReviews } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import ReviewsFormModal from "./ReviewsFormModal";


const Reviews = () => {
    const {spotId} = useParams();
    const dispatch = useDispatch();
    const {openModal} = useModal();

    const reviews = useSelector(state => state.reviews.reviews)
    const currentUser = useSelector(state => state.session.user);
    const spotOwnerId = useSelector(state => state.spot.singleSpot?.ownerId)

    const hasReviewed = reviews?.some((review) => review.userId === currentUser?.id);
    const showReviewButton = currentUser && !hasReviewed && (spotOwnerId !== currentUser.id);
    // console.log(showReviewButton)

    useEffect(() => {
        if (spotId) dispatch(getAllReviews(spotId))
        }, [spotId, dispatch]);

    if (!reviews) return null;

    const handlePostReviewButton = async (e) => {
        e.preventDefault();
        if (showReviewButton) openModal(<ReviewsFormModal spotId={spotId}/>);
    }


    return (
        <>
            {showReviewButton && (
                <button onClick={handlePostReviewButton}>Post Your Review</button>
            )}
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
