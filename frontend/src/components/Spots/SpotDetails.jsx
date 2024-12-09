import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleSpot } from "../../store/spots";
import { useModal } from "../../context/Modal";
import ReviewsFormModal from "../Reviews/ReviewsFormModal";
import { removeReview } from "../../store/reviews";
import DeleteReviewModal from "./DeleteReviewModal";

const SpotDetails = () => {
    const {spotId} = useParams();
    const dispatch = useDispatch();
    const {openModal} = useModal();

    const singleSpot = useSelector(state => state.spots.singleSpot);
    const currentUser = useSelector(state => state.session.user);
    console.log('current User', currentUser)

    const isLoading = !singleSpot || !singleSpot.id

    useEffect(() => {
        if (spotId) dispatch(getSingleSpot(spotId));
    }, [spotId, dispatch]);

    if (isLoading) return <p>Loading...</p>

    const hasReviewed = singleSpot.Reviews?.some((review) => review.User.id === currentUser?.id)
    const showReviewButton = currentUser && !hasReviewed && (singleSpot?.ownerId !== currentUser.id);

    if (!singleSpot) return null;

    const handlePostReviewButton = async (e) => {
        e.preventDefault();
        if (showReviewButton) openModal(<ReviewsFormModal spotId={spotId}/>);
    }

    const handleDeleteButton = async (reviewId) => {
        await dispatch(removeReview(reviewId))
        dispatch(getSingleSpot(spotId))
    }

    const reviewCount = (avgStarRating, numReviews) => {
        if (avgStarRating && numReviews == 1) {
            return `★ ${avgStarRating} • ${numReviews} review`
        } else if (avgStarRating && numReviews > 1) {
            return `★ ${avgStarRating} • ${numReviews} reviews`
        } else {
            return '★ NEW!'
        }
    }

    return (
        <>
            <h1>{singleSpot.name}</h1>
            <h2>{singleSpot.city}, {singleSpot.state}, {singleSpot.country}</h2>
            {singleSpot?.SpotImages.map((spotImageDetails, index) => (
                <div key={index}>
                    {/* need to add more images */}
                    <img src={spotImageDetails.url} alt="" ></img>
                </div>
            ))}
            <h2>Hosted by {singleSpot.Owner.firstName} {singleSpot.Owner.lastName}</h2>
            <p>{singleSpot.description}</p>
            <h3 className="price">
                ${singleSpot.price} <span className="night">night</span>
            </h3>
            <button type="button" onClick={() => alert('Feature Coming Soon...')}>Reserve</button>
            <h4>{reviewCount(singleSpot.avgStarRating, singleSpot.numReviews)}</h4>

            <section>
                <h2>{reviewCount(singleSpot.avgStarRating, singleSpot.numReviews)}</h2>
                {showReviewButton && (
                    <button onClick={handlePostReviewButton}>Post Your Review</button>
                )}
                {singleSpot.Reviews.length === 0 ? (<p>Be the first to post a review!</p>) : null}
                {singleSpot.Reviews.map((review, index) => {
                        console.log(review)
                        const createdAt = new Date(review.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                        });

                        return (
                            <div key={index} className="review">
                                <div>{review.User.firstName}</div>
                                <div>{createdAt}</div>
                                <div>{review.review}</div>
                                {review.User.id === currentUser.id ? <button onClick={() => openModal(<DeleteReviewModal reviewId={review.id} handleDelete={() => handleDeleteButton(review.id)}/>)}>Delete</button> : null}
                            </div>
                        );
                    })
                }
            </section>
        </>
    )
}

export default SpotDetails;
