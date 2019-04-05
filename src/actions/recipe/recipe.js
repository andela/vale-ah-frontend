import { GET_RECIPE } from '../action-types';

/**
 * @description - Get all recipe
 * @param {object} recipes
 * @returns {object} - dispatches the type
 */
export const getRecipe = () => ({
  type: GET_RECIPE,
});
