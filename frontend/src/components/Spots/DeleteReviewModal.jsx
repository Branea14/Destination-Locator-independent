import { useModal } from "../../context/Modal";

const DeleteReviewModal = ({reviewId, handleDelete}) => {
    const {closeModal} = useModal();

    const handleDeleteButton = async() => {
        await handleDelete(reviewId)
        closeModal();
    }

    return (
        <>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to delete this review?</p>
            <button onClick={() => handleDeleteButton()}>Yes (Delete Review)</button>
            <button onClick={closeModal}>No (Keep Review)</button>
        </>
    )
}

export default DeleteReviewModal;
