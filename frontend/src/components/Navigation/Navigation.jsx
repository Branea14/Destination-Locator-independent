import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import ProfileButton from "./ProfileButton";
import './Navigation.css';

const Navigation = ({isLoaded}) => {
    const sessionUser = useSelector((state) => state.session.user);
    // console.log('current user', typeof sessionUser);

    return (
        <ul>
            <li>
                <NavLink to='/'>Home</NavLink>
            </li>
            {sessionUser && (
                <li>
                    <NavLink to='/spots/new'>Create a New Spot</NavLink>
                </li>
            )}
            {isLoaded && <ProfileButton user={sessionUser} />}
        </ul>
    )
}

export default Navigation;
