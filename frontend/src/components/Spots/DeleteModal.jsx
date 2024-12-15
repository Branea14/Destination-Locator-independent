import { useModal } from "../../context/Modal";
import './DeleteSpot.css';

const DeleteModal = ({spotId, handleDelete}) => {
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
        <div className="modal-background">
            <div className="delete-spot-modal">
                <div className="delete-title">Confirm Delete</div>
                <p>Are you sure you want to remove this post from the listings?</p>
                <div className="delete-spot-buttons">

                    <button className='delete-button' onClick={() => handleDeleteButton()}>Yes (Delete Spot)</button>
                    <button className='keep-button' onClick={handleKeepButton}>No (Keep Spot)</button>
                </div>

            </div>
        </div>
    )
}

export default DeleteModal;
