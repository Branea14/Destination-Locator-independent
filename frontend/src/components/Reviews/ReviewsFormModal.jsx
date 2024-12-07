import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { postAReview } from "../../store/reviews";
import './ReviewsFormModal.css';

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
        const validationErrors = handleValidation();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await dispatch(postAReview({spotId, review: textArea, stars: starRating}));
            closeModal();
        } catch (res) {
            const data = await res.json();
            if (data?.errors) setErrors(data.errors)
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

                    </div>
                    <button type="submit" disabled={disableButton()}>Submit Your Review</button>
                </form>

            </div>
        </div>
    )
}

export default ReviewsFormModal;
