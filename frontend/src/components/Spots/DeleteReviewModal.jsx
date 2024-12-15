import { useModal } from "../../context/Modal";
import './DeleteReviewModal.css';

const DeleteReviewModal = ({reviewId, handleDelete}) => {
    const {closeModal} = useModal();

    const handleDeleteButton = async() => {
        await handleDelete(reviewId)
        closeModal();
    }

    return (
        <div className="modal-background">
            <div className="delete-review-modal">
                <div className="delete-title">Confirm Delete</div>
                <p>Are you sure you want to delete this review?</p>
                <div className="delete-review-buttons">
                    <button className='delete-button' onClick={() => handleDeleteButton()}>Yes (Delete Review)</button>
                    <button className='keep-button' onClick={closeModal}>No (Keep Review)</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteReviewModal;
