import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';

const middlewares = [thunk];

if (process.env.NODE_ENV === `development`) {
  middlewares.push(createLogger());
}

const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
