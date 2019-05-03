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

// /////////////////

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

// //////////////////////
/**  Action to be dispatched when updating a recipe
 * @returns {Action} recipe creation success
 */
export const recipeUpdateRequest = () => ({
  type: types.UPDATE_RECIPE,
});

/**
 * Action to be dispatched with updated recipe as payload
 * @param {object} payload dispatch payload
 * @returns {Action} recipe update success
 */
export const recipeUpdateSuccess = payload => ({
  type: types.UPDATE_RECIPE_SUCCESS,
  payload,
});

/**
 * Action to be dispatched with recipe update errors as payload
 * @param {object} payload dispatch payload
 * @returns {Action} recipe update failure
 */
export const recipeUpdateFailure = payload => ({
  type: types.UPDATE_RECIPE_FAILURE,
  payload,
});
