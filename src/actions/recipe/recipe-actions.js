import axios from 'axios';
import * as types from '../action-types';
import { normalizeErrors, handleMessages } from '../../utils/helpers';

const baseUrl = process.env.API_BASE_URL;

/**  Action to be dispatched when creating a recipe
 * @returns {Action} recipe creation success
 */
export const recipeCreationRequest = () => ({
  type: types.CREATE_RECIPE,
});

/**
 * Action to be dispatched with created recipe as payload
 * @param {object} payload dispatch payload
 * @returns {Action} recipe creation success
 */
export const recipeCreationSuccess = payload => ({
  type: types.CREATE_RECIPE_SUCCESS,
  payload,
});

/**
 * Action to be dispatched with recipe creation errors as payload
 * @param {object} payload dispatch payload
 * @returns {Action} recipe creation failure
 */
export const recipeCreationFailure = payload => ({
  type: types.CREATE_RECIPE_FAILURE,
  payload,
});

/**
 * @returns {Action} get recipe request action
 */
export const getRecipeRequestAction = () => ({
  type: types.GET_RECIPE_REQUEST,
});
/**
 * @returns {Action} get recipe success action
 * @param {object} payload
 */
export const getRecipeSuccessAction = payload => ({
  type: types.GET_SINGLE_RECIPE_SUCCESS,
  payload,
});
/**
 * @returns {Action} get recipe failure action
 * @param {object} payload
 */
export const getRecipeFailureAction = payload => ({
  type: types.GET_SINGLE_RECIPE_FAILURE,
  payload,
});

/**
 * @returns {undefined}
 * @param {string} slug
 */
export const getSingleRecipe = slug => async dispatch => {
  dispatch(getRecipeRequestAction());
  try {
    const res = await axios.get(`${baseUrl}/recipes/${slug}`);
    dispatch(getRecipeSuccessAction(res.data));
  } catch (error) {
    const errors = normalizeErrors(error);
    handleMessages(errors.messages, 'error');
    dispatch(getRecipeFailureAction(errors));
  }
};
