import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './reducer';

export const history = createHistory({
  basname: '',
  hashType: 'slash'
});

/**
 * Logs all actions and states after they are dispatched.
 */
const logger = store => next => action => {
  console.groupCollapsed(action.type);
  console.log('Previous state', store.getState());
  console.info('Dispatch', action);
  let result = next(action);
  console.log('Next state', store.getState());
  console.groupEnd(action.type);
  return result;
};

const initialState = {};
const enhancers = [];
const middleware = [
  thunk,
  routerMiddleware(history),
  logger
];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

export default createStore(
  rootReducer,
  initialState,
  composedEnhancers
);

