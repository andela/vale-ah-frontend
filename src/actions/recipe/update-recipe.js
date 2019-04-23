import Axios from 'axios';
import { toast } from 'react-toastify';
import {
  UPDATE_RECIPE_REQUEST,
  UPDATE_RECIPE_SUCCESS,
  UPDATE_RECIPE_FAILURE,
} from '../action-types';
import { getAuthToken, normalizeErrors } from '../../utils/helpers';

/**
 * @returns {Action} recipe creation action
 */
// const updateRecipeRequest = () => ({
//   type: UPDATE_RECIPE_REQUEST,
// });

/**
 * Action to be dispatched with updated recipe as payload
 * @param {object} payload dispatch payload
 * @returns {Action} update recipe success
 */
const updateRecipeSuccess = payload => ({
  type: UPDATE_RECIPE_SUCCESS,
  payload,
});

/**
 * Action to be dispatched with recipe update errors as payload
 * @param {object} payload dispatch payload
 * @returns {Action} update recipe failure
 */
const updateRecipeFailure = payload => ({
  type: UPDATE_RECIPE_FAILURE,
  payload,
});

/**
 *  Recipe creation action creator
 * @param {object} recipeData recipeUpdate payload
 * @param {object} slug recipe slug payload
 * @returns {undefined} dispatch
 */
const updateRecipe = (recipeData, slug) => async dispatch => {
  dispatch({ type: UPDATE_RECIPE_REQUEST });
  try {
    const response = await Axios.put(
      `${process.env.API_BASE_URL}/recipes/${slug}`,
      recipeData,
      { headers: { authorization: getAuthToken() } }
    );

    dispatch(updateRecipeSuccess(response.data));
  } catch (error) {
    const errors = normalizeErrors(error);

    errors.messages.forEach(err => {
      toast.error(err);
    });

    dispatch(updateRecipeFailure(errors));
  }
};

export default updateRecipe;
