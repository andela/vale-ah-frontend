import { combineReducers } from 'redux';
import auth from './auth/auth';
import recipes from './recipe';
import upload from './upload';
import social from './auth/social-reducer';

export default combineReducers({
  auth,
  recipes,
  upload,
  social,
});
