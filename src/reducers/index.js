import { combineReducers } from 'redux';
import recipes from './recipe/recipeReducer';

export default combineReducers({
  recipes,
});
