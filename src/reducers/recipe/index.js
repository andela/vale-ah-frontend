import { combineReducers } from 'redux';
import createRecipe from './create-recipe';
import updateRecipe from './update-recipe';
import getRecipe from './get-recipe';

export default combineReducers({ createRecipe, updateRecipe, getRecipe });
