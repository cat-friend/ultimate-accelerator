import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import challengeReducer from './challenge';
import clanReducer from './clan';
import userReducer from './user';
import accelerateReducer from './accelerate';
import legendReducer from './legend';
import weaponReducer from './weapon';

const rootReducer = combineReducers({
  session,
  user: userReducer,
  challenges: challengeReducer,
  clans: clanReducer,
  legends: legendReducer,
  weapons: weaponReducer,
  accelerate: accelerateReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
