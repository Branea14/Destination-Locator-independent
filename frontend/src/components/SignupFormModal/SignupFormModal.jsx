import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import * as sessionActions from '../../store/session';
// import { Navigate } from "react-router-dom";
import './SignupForm.css';
import { useModal } from "../../context/Modal";

const SignupFormModal = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const {closeModal} = useModal();

    // if (user) return <Navigate to='/' replace={true} />;
    // const user = useSelector((state) => state.session.user)

    const validateFields = () => {
        const newErrors = {};

        if (!firstName) newErrors.firstName = 'First name is required.';
        if (!lastName) newErrors.lastName = 'Last name is required.';
        if (!email) newErrors.email = 'Email is required.';
        if (!username) newErrors.username = 'Username is required.';
        else if (username.length < 4) newErrors.username = 'Username must be at least 4 characters.';
        if (!password) newErrors.password = 'Password is required.';
        else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
        if (!confirmPassword) newErrors.confirmPassword = 'Confirm password is required.';
        else if (confirmPassword !== password) newErrors.confirmPassword = 'Passwords do not match.'
        return newErrors;
    }

    useEffect(() => {
        setErrors(validateFields());
    }, [username, firstName, lastName, email, password, confirmPassword]);

    const disableButton = Object.keys(errors).length > 0;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fieldErrors = validateFields();
        if (Object.keys(fieldErrors).length > 0) {
            setErrors(fieldErrors);
            return;
        }
        setErrors({});
        try {
            await dispatch(sessionActions.signup({ username, firstName, lastName, email, password }));
            closeModal();
        } catch (res) {
            const data = await res.json();
            if (data?.errors) setErrors(data.errors);
        }
    }


    return (
        <div className="modal-background">
            <div
                className="signup-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        First Name
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </label>
                    {errors.firstName && <p>{errors.firstName}</p>}
                    <label>
                        Last Name
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </label>
                    {errors.lastName && <p>{errors.lastName}</p>}
                    <label>
                        Email
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    {errors.email && <p>{errors.email}</p>}
                    <label>
                        Username
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    {errors.username && <p>{errors.username}</p>}
                    <label>
                        Password
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    {errors.password && <p>{errors.password}</p>}
                    <label>
                        Confirm Password
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </label>
                    {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                    <button type="submit" disabled={disableButton}>Sign Up</button>
                </form>
            </div>
        </div>
    )

}

export default SignupFormModal;
