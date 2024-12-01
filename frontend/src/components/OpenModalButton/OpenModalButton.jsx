import { useModal } from "../../context/Modal"

export const OpenModalButton = ({ modalComponent, buttonText, onButtonClick, onModalClose }) => {
    // const {setModalContent, setOnModalClose} = useModal();
    const {openModal} = useModal();

    const onClick = () => {
        if (typeof onButtonClick === 'function') onButtonClick();

        //open the modal with the modalComponent as the content of the modal by invoking setModalContent w/ modalComponent
        // setModalContent(modalComponent)
        //invoke setOnModalClose with onModalClose
        // if (onModalClose) setOnModalClose(onModalClose);

        // open modal w content and close cb
        openModal(modalComponent, onModalClose);
    }

    return (
        <>
            <button onClick={onClick}>{buttonText}</button>
        </>
    )
}

//testing purposes
// export const Greeting = () => {
//     return (
//         <OpenModalButton
//             buttonText='Greeting'
//             modalComponent={<h2>Hello World!</h2>}
//             onButtonClick={() => console.log('Greeting initiated')}
//             onModalClose={() => console.log('Greeting completed')}
//         />
//     )
// }
