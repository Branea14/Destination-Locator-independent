import { useState } from "react"
import { useDispatch } from "react-redux";
import * as sessionActions from '../../store/session';
// import { Navigate } from "react-router-dom";
import './LoginForm.css';
import { useModal } from "../../context/Modal";

const LoginFormModal = () => {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const {closeModal} = useModal();

    // const sessionUser = useSelector((state) => state.session.user);
    // if (sessionUser) return <Navigate to='/' replace={true} />;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(sessionActions.login({ credential, password}))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data?.errors) setErrors(data.errors);
            }
        )
    }

    return (
        <div className="modal-background">
            <div className="login-modal">
                <h1>Log In</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        Username or Email
                        <input
                            type='text'
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Password
                        <input
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    {errors.credential && <p>{errors.credential}</p>}
                    <button type="submit">Log In</button>
                </form>
            </div>
        </div>
    )
}

export default LoginFormModal;
