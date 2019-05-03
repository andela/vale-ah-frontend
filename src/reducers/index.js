import { combineReducers } from 'redux';
import auth from './auth/auth';
import recipes from './recipe';
import recipe from './recipe/recipe';
import upload from './upload';

export default combineReducers({
  auth,
  recipes,
  upload,
  recipe,
});
