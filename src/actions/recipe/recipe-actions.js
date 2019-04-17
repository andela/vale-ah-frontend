import * as types from '../action-types';

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
  type: types.GET_RECIPE_SUCCESS,
  payload,
});
/**
 * @returns {Action} get recipe failure action
 * @param {object} payload
 */
export const getRecipeFailureAction = payload => ({
  type: types.GET_RECIPE_FAILURE,
  payload,
});
