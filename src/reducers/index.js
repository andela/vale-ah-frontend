import { combineReducers } from 'redux';
import auth from './auth/auth';
import recipes from './recipe';
import upload from './upload';
import recipes from './recipe/recipeReducer';
import passwordReset from './auth/password-reset-link';
import changePassword from './auth/password-reset';

export default combineReducers({
  auth,
  recipes,
  upload,
  passwordReset,
  changePassword,
});
