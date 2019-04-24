import { combineReducers } from 'redux';
import auth from './auth/auth';
import recipes from './recipe';

export default combineReducers({
  auth,
  recipes,
});
