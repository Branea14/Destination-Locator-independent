import { useModal } from "../../context/Modal"

const OpenModalMenuItem = ({ modalComponent, itemText, onItemClick, onModalClose }) => {
    const {openModal} = useModal();

    const onClick = () => {
        if (typeof onItemClick === 'function') onItemClick();

        //open the modal with the modalComponent as the content of the modal by invoking setModalContent w/ modalComponent
        // setModalContent(modalComponent)
        //invoke setOnModalClose with onModalClose
        // if (onModalClose) setOnModalClose(onModalClose);

        // open modal w content and close cb
        openModal(modalComponent, onModalClose);
    }

    return (
        <>
            <button onClick={onClick}>{itemText}</button>
        </>
    )
}

export default OpenModalMenuItem;
