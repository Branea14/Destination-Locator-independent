import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { FaRedditAlien } from "react-icons/fa6";
import * as sessionActions from '../../store/session';
// import { OpenModalButton } from "../OpenModalButton/OpenModalButton";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import OpenModalMenuItem from "./OpenModalMenuItem";

const ProfileButton = ({user}) => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    }

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout())
        closeMenu();
    }

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
            <button onClick={toggleMenu}><FaRedditAlien /></button>
            <ul className={ulClassName} ref={ulRef}>
                {user ? (
                    <>
                        <li>{user.username}</li>
                        <li>{user.firstName} {user.lastName}</li>
                        <li>{user.email}</li>
                        <li>
                            <button onClick={logout}>Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <OpenModalMenuItem
                                itemText='Log In'
                                onItemClick={closeMenu}
                                modalComponent={<LoginFormModal />}
                            />
                        </li>
                        <li>
                            <OpenModalMenuItem
                                itemText='Sign Up'
                                onItemClick={closeMenu}
                                modalComponent={<SignupFormModal />}
                            />
                        </li>
                    </>
                )}
            </ul>
        </>
    )
}

export default ProfileButton;
