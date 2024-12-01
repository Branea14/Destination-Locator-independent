import { csrfFetch } from "./csrf";

export const LOGIN_USER = 'session/LOGIN_USER';
export const LOGOUT_USER = 'session/LOGOUT_USER';

export const loginUser = (user) => ({
    type: LOGIN_USER,
    payload: user
})

export const logoutUser = () => ({
    type: LOGOUT_USER,
})

export const login = (user) => async dispatch => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        body: JSON.stringify({
            credential,
            password
        })
    });

    if (response.ok) {
        const data = await response.json()
        dispatch(loginUser(data.user));
        return response;
    }
}

// retains session user info on an refresh
export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(loginUser(data.user));
    return response;
}

export const signup = (user) => async dispatch => {
    const { username, firstName, lastName, email, password } = user;
    const response = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            username,
            firstName,
            lastName,
            email,
            password
        })
    });

    if (response.ok) {
        const data = await response.json();
        // console.log('data', data)
        dispatch(loginUser(data.user));
        return response;
    }
}

export const logout = () => async dispatch => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE'
    })

    dispatch(logoutUser());
    return response;
}

const initialState = {user: null};

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            // const user = action.payload
            // console.log('user', user)
            // return {...state, user}
            return { ...state, user: action.payload };
        case LOGOUT_USER:
            return { ...state, user: null};
        default:
            return state;
    }
}

// for testing purposes
// store.dispatch(
//     sessionActions.login({
//       credential: "Demo-lition",
//       password: "password"
//     })
//   )

// store.dispatch(sessionActions.restoreUser());

export default sessionReducer;
