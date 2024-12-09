// import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
// import { removeSpot } from "../../store/spots";

const DeleteModal = ({spotId, handleDelete}) => {
    // const dispatch = useDispatch();
    const {closeModal} = useModal();

    const handleDeleteButton =  () => {
        handleDelete(spotId);
        closeModal();
    }

    const handleKeepButton = async (e) => {
        e.preventDefault();
        closeModal();
    }

    return (
        <>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this post from the listings?</p>
            <button onClick={() => handleDeleteButton()}>Yes (Delete Spot)</button>
            <button onClick={handleKeepButton}>No (Keep Spot)</button>
        </>
    )
}

export default DeleteModal;
