import axios from 'axios';
import {
  GET_RECIPE,
  FETCH_RECIPE_SUCCESS,
  FETCH_RECIPE_FAILURE,
  FETCH_RECIPES_REQUEST,
} from '../action-types';

/**
 * @description - Get all recipe
 * @param {object} recipes
 * @returns {object} - type object
 */
export const getRecipe = () => ({
  type: GET_RECIPE,
});

/**
 * @returns {object } type object
 */
const fetchRecipesStart = () => ({
  type: FETCH_RECIPES_REQUEST,
});

/**
 * @param {*} recipes
 * @returns {object }  type and payload
 */
const fetchRecipesSuccess = recipes => ({
  type: FETCH_RECIPE_SUCCESS,
  recipes,
});

/**
 * @param {*} error
 * @returns {object } type and error payload
 */
const fetchRecipesFail = error => ({
  type: FETCH_RECIPE_FAILURE,
  error,
});

/**
 * @description fetchRecipes
 * @returns {object} dispatches response
 */
export const fetchRecipes = () => dispatch => {
  dispatch(fetchRecipesStart());

  return axios({
    url: `/api/recipes`,
    method: 'get',
  })
    .then(res => {
      dispatch(fetchRecipesSuccess(res.data));
      return res;
    })
    .catch(error => {
      dispatch(fetchRecipesFail(error));
      return error;
    });
};
