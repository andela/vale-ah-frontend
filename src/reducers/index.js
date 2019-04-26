import { combineReducers } from 'redux';
import auth from './auth/auth';
import recipes from './recipe';
import upload from './upload';

export default combineReducers({
  auth,
  recipes,
  upload,
});
