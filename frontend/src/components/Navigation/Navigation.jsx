import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import * as sessionActions from '../../store/session';
import ProfileButton from "./ProfileButton";

const Navigation = () => {
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch()

    const logoutButton = () => {
        dispatch(sessionActions.logout())
    }

    return (
        <>
        <ul>
            <li>
                <NavLink to='/'>Home</NavLink>
            </li>
            {!user ? (
                <>
                    <li>
                        <NavLink to='/login'>Log In</NavLink>
                    </li>
                    <li>
                        <NavLink to='signup'>Sign Up</NavLink>
                    </li>
                </>
            ) : (
                <>
                    <li>
                        <ProfileButton user={ProfileButton} />
                    </li>
                    <li>
                        <button onClick={logoutButton}>Log out</button>
                    </li>

                </>
            )}
        </ul>
        </>
    )
}

export default Navigation;
