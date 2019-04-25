import * as types from '../action-types';

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
