import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleSpot } from "../../store/spots";
import { useModal } from "../../context/Modal";
import ReviewsFormModal from "../Reviews/ReviewsFormModal";
import { removeReview } from "../../store/reviews";
import DeleteReviewModal from "./DeleteReviewModal";
import "./SpotDetails.css"

const SpotDetails = () => {
    const {spotId} = useParams();
    const dispatch = useDispatch();
    const {openModal} = useModal();

    const singleSpot = useSelector(state => state.spots.singleSpot);
    const currentUser = useSelector(state => state.session.user);
    // console.log('current User', currentUser)

    const isLoading = !singleSpot || !singleSpot.id

    useEffect(() => {
        if (spotId) dispatch(getSingleSpot(spotId));
    }, [spotId, dispatch]);

    if (isLoading) return <p>Loading...</p>

    const sortedSpotImages = [...(singleSpot?.SpotImages || [])];
    const previewImage = sortedSpotImages.find(image => image.preview)
    const otherImages = previewImage ? sortedSpotImages.filter(image => image !== previewImage) : sortedSpotImages;
    // const finalImages = previewImage ? [previewImage, ...otherImages] : otherImages;

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
            return `★ ${avgStarRating} • ${numReviews} Review`
        } else if (avgStarRating && numReviews > 1) {
            return `★ ${avgStarRating} • ${numReviews} Reviews`
        } else {
            return '★ NEW!'
        }
    }

    return (
        <div className="spot-details-content">
            <h1 className="spot-detail-name">{singleSpot.name}</h1>
            <h2 className="spot-details-location">{singleSpot.city}, {singleSpot.state}, {singleSpot.country}</h2>
            <div className="images-container">
                <div className="preview-image">
                    <img src={previewImage.url} alt="Preview Image" />
                </div>
                    <div className='other-images'>
                        {otherImages.map((img) => (
                            <div key={img.id}>
                                <img src={img.url} alt={singleSpot.name}/>
                            </div>
                        ))}
                    </div>
            </div>
            <div className="spot-detailed-information">
                <div className="host-spot-information">
                    <h2 className="host-info">Hosted by {singleSpot.Owner.firstName} {singleSpot.Owner.lastName}</h2>
                    <p className="spot-description">{singleSpot.description}</p>
                </div>

                <div className="booking-info">
                    <div className="price-and-reviews">
                        <h3 className="price">
                            ${singleSpot.price} <span className="night">night</span>
                        </h3>
                        <h2 className="reviews">{reviewCount(singleSpot.avgStarRating, singleSpot.numReviews)}</h2>
                    </div>
                    <button className='reserve-button' type="button" onClick={() => alert('Feature Coming Soon...')}>Reserve</button>
                </div>
            </div>
            <div className="page-break"></div>
            <section className="review-section">
                <h4 className="review-summary-in-review-section">{reviewCount(singleSpot.avgStarRating, singleSpot.numReviews)}</h4>
                {showReviewButton && (
                    <button onClick={handlePostReviewButton}>Post Your Review</button>
                )}
                {showReviewButton && singleSpot.Reviews.length === 0 ? (<p>Be the first to post a review!</p>) : null}
                {singleSpot.Reviews.map((review, index) => {
                        console.log(review)
                        const createdAt = new Date(review.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                        });

                        return (
                            <div key={index} className="review-details">
                                <div className="review-user">{review.User.firstName}</div>
                                <div className="review-date">{createdAt}</div>
                                <div className="review">{review.review}</div>
                                {review.User?.id === currentUser?.id ? <button onClick={() => openModal(<DeleteReviewModal reviewId={review.id} handleDelete={() => handleDeleteButton(review.id)}/>)}>Delete</button> : null}
                            </div>
                        );
                    })
                }
            </section>
        </div>
    )
}

export default SpotDetails;
