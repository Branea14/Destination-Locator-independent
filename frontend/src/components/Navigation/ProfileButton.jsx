import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { FaRedditAlien } from "react-icons/fa6";
import * as sessionActions from '../../store/session';
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import OpenModalMenuItem from "./OpenModalMenuItem";
import { NavLink, useNavigate } from "react-router-dom";
import './ProfileButton.css';

const ProfileButton = ({user}) => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const navigate = useNavigate();

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
        navigate('/')
    }

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <div className="profile-button-container" onClick={toggleMenu}>
            <div className="menu-icon" aria-expanded={showMenu}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className='profile-icon' ><FaRedditAlien /></div>
            <ul className={ulClassName} ref={ulRef}>
                {user ? (
                    <>
                        <li className="profile-info">Hello, {user.firstName}!</li>
                        <li className="profile-info">{user.email}</li>
                        <div></div>
                        <li>
                            <NavLink to='spots/current'>Manage Spots</NavLink>
                        </li>
                        <div></div>
                        <li>
                            <button onClick={logout}>Logout</button>
                        </li>
                    </>
                ) : (
                    <div>
                        <li>
                            <OpenModalMenuItem
                                itemText='Sign Up'
                                onItemClick={closeMenu}
                                modalComponent={<SignupFormModal />}
                            />
                        </li>
                        <li>
                            <OpenModalMenuItem
                                itemText='Log In'
                                onItemClick={closeMenu}
                                modalComponent={<LoginFormModal />}
                            />
                        </li>
                    </div>
                )}
            </ul>
        </div>
    )
}

export default ProfileButton;
