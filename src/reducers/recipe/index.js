import { combineReducers } from 'redux';
import createRecipe from './create-recipe';
import updateRecipe from './update-recipe';
import deleteRecipe from './delete-recipe';

export default combineReducers({
  createRecipe,
  updateRecipe,
  deleteRecipe,
});
