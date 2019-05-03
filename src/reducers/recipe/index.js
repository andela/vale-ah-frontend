import { combineReducers } from 'redux';
import createRecipe from './create-recipe';
import recipesReducer from './recipes';

export default combineReducers({ createRecipe, recipesReducer });
