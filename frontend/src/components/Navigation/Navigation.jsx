import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import ProfileButton from "./ProfileButton";
import './Navigation.css';

const Navigation = ({isLoaded}) => {
    const sessionUser = useSelector((state) => state.session.user);
    // console.log('current user', typeof sessionUser);

    return (
        <nav className="navigation">
            <ul className="nav-list">
                <li className="logo-item">
                    <NavLink to='/'>
                        {/* <img src='/logo-image.jpg' alt="Dimensional Dwellings Logo" className="logo"/> */}
                        <h1>Dimensional Dwellings</h1>
                    </NavLink>
                </li>
                {sessionUser && (
                    <li>
                        <NavLink to='/spots/new'>Create a New Spot</NavLink>
                    </li>
                )}
                {isLoaded && <ProfileButton user={sessionUser} />}
            </ul>

        </nav>
    )
}

export default Navigation;
