import { useRef, createContext, useState, useContext } from "react";
import ReactDOM from 'react-dom';
import './Modal.css'

const ModalContext = createContext();

export const ModalProvider = ({children}) => {
    const modalRef = useRef();
    const [modalContent, setModalContent] = useState(null);
    //cb func that will be called when modal is closing
    const [onModalClose, setOnModalClose] = useState(null)

    // Function to open the modal safely
    const openModal = (content, onCloseCallback) => {
        setModalContent(content); // Set the new modal content
        setOnModalClose(() => onCloseCallback); // Set the onModalClose callback
    };

    const closeModal = () => {
        // setModalContent(null); //clear the modal contents
        // //if cb func is truthy, call the cb func and reset it to null
        // if (typeof onModalClose === 'function') {
        //     setOnModalClose(null);
        //     onModalClose();
        // }

        if (typeof onModalClose === 'function') onModalClose();
        setModalContent(null); //clear the modal contents
        //if cb func is truthy, call the cb func and reset it to null
        setOnModalClose(null);
    }

    //need to review
    const contextValue = {
        modalRef, //reference to modal div
        modalContent, //React component to render inside modal
        openModal,
        // setModalContent, //function to set the React component to render inside modal
        // setOnModalClose, //function to set the cb func to be called when modal is closing
        closeModal //function to close the modal
    }

    return (
        <>
            <ModalContext.Provider value={contextValue}>
                {children}
            </ModalContext.Provider>
            <div ref={modalRef} />
        </>
    )
};

export const Modal = () => {
    const { modalRef, modalContent, closeModal } = useContext(ModalContext)

    if (!modalRef || !modalContent || !closeModal) return null;

    //render the following component to the div referenced by the modalRef
    return ReactDOM.createPortal(
        <div id='modal'>
            <div id='modal-background' onClick={closeModal} />
            <div id="modal-content">{modalContent}</div>
        </div>,
        //transfers all the elements as children of the div referenced by the modalRef
        modalRef.current
    );
}

export const useModal = () => useContext(ModalContext);
