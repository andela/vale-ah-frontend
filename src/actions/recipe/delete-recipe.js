import Axios from 'axios';
import { toast } from 'react-toastify';
import {
  DELETE_RECIPE_REQUEST,
  DELETE_RECIPE_SUCCESS,
  DELETE_RECIPE_FAILURE,
} from '../action-types';
import { getAuthToken, normalizeErrors } from '../../utils/helpers';

/**
 * @returns {Action} recipe creation action
 */
// const updateRecipeRequest = () => ({
//   type: UPDATE_RECIPE_REQUEST,
// });

/**
 * Action to be dispatched with delete recipe as payload
 * @param {object} payload dispatch payload
 * @returns {Action} delete recipe success
 */
const deleteRecipeSuccess = payload => ({
  type: DELETE_RECIPE_SUCCESS,
  payload,
});

/**
 * Action to be dispatched with recipe delete errors as payload
 * @param {object} payload dispatch payload
 * @returns {Action} delete recipe failure
 */
const deleteRecipeFailure = payload => ({
  type: DELETE_RECIPE_FAILURE,
  payload,
});

/**
 *  Recipe creation action creator
 * @param {object} recipeData recipeDelete payload
 * @param {object} slug recipe slug payload
 * @returns {undefined} dispatch
 */
const deleteRecipe = (recipeData, slug) => async dispatch => {
  dispatch({ type: DELETE_RECIPE_REQUEST });
  try {
    const response = await Axios.delete(
      `${process.env.API_BASE_URL}/recipes/${slug}`,
      recipeData,
      { headers: { authorization: getAuthToken() } }
    );

    dispatch(deleteRecipeSuccess(response.data));
  } catch (error) {
    const errors = normalizeErrors(error);

    errors.messages.forEach(err => {
      toast.error(err);
    });

    dispatch(deleteRecipeFailure(errors));
  }
};

export default deleteRecipe;
