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



const initialState = {user: null};

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            // const newState = {...state};
            // const user = action.payload;
            // newState[user] = user.data;
            // return newState;
            return { ...state, user: action.payload };
        // case LOGOUT_USER:
        //     return;
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
export default sessionReducer;
