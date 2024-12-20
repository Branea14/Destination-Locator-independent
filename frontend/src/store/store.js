import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import spotReducer from './spots';
import reviewReducer from './reviews';


// const placeholderReducer = (state = {}, action) => {
//   switch (action.type) {
//     case 'TEST_ACTION':
//       return { ...state, test: action.payload };
//     default:
//       return state;
//   }
// };

const rootReducer = combineReducers({
  // placeholderReducer,
  session: sessionReducer,
  spots: spotReducer,
  reviews: reviewReducer
});



let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
