import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { postAReview } from "../../store/reviews";
import './ReviewsFormModal.css';
import { getSingleSpot } from "../../store/spots";

const ReviewsFormModal = ({spotId}) => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [textArea, setTextArea] = useState('');
    const [starRating, setStarRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const {closeModal} = useModal();

    const handleValidation = () => {
        const validationErrors = {};
        if (textArea.length < 10) validationErrors.textArea = 'Review must be at least 10 characters long.';
        return validationErrors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("Submit button clicked");

        const validationErrors = handleValidation();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);

            // console.log("Validation errors:", validationErrors);
            return;
        }

        try {
            console.log("Dispatching postAReview with:", {
                spotId,
                review: textArea,
                stars: starRating,
            });

            await dispatch(postAReview({spotId, review: textArea, stars: starRating}));
            await dispatch(getSingleSpot(spotId));
            console.log("Review successfully posted");
            closeModal();
        } catch (res) {
            console.error("Error during review submission:", res);
            const data = await res.json();
            if (data?.errors) setErrors(data.errors)
                console.error("Server returned validation errors:", data.errors);
        }
    }

    const disableButton = () => textArea.length < 10 || !starRating;
    const handleStarClick = (rating) => setStarRating(rating)
    const handleStarHover = (rating) => setHoverRating(rating)
    const handleStarMouseOut = () => setHoverRating(0)


    return (
        <div className="modal-background">
            <div className="new-review-modal">
                <h1>How was your stay?</h1>
                <form onSubmit={handleSubmit}>
                    {errors.textArea && <p>{errors.textArea}</p>}
                    <textarea
                        value={textArea}
                        placeholder='Leave your review here...'
                        onChange={(e) => setTextArea(e.target.value)}
                    />
                    <div>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={`star ${
                                    (hoverRating || starRating) >= star ? 'highlighted' : ''

                                }`}
                                onClick={() => handleStarClick(star)}
                                onMouseOver={() => handleStarHover(star)}
                                onMouseOut={handleStarMouseOut}
                            >
                                ★
                            </span>
                        ))}
                        <span>Stars</span>

                    </div>
                    <button type="submit" disabled={disableButton()}>Submit Your Review</button>
                </form>

            </div>
        </div>
    )
}

export default ReviewsFormModal;
