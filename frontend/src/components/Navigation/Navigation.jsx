import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import ProfileButton from "./ProfileButton";
import './Navigation.css';
// import { OpenModalButton } from "../OpenModalButton/OpenModalButton";
// import LoginFormModal from "../LoginFormModal/LoginFormModal";
// import SignupFormModal from '../SignupFormModal/SignupFormModal';

const Navigation = ({isLoaded}) => {
    const user = useSelector((state) => state.session.user);

    return (
        <ul>
            <li>
                <NavLink to='/'>Home</NavLink>
            </li>
            {isLoaded && (
                <li>
                <ProfileButton user={user} />
                </li>
            )}
        </ul>
    )
}

export default Navigation;
