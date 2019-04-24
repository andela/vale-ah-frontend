import Axios from 'axios';
import { toast } from 'react-toastify';
import {
  CREATE_RECIPE,
  CREATE_RECIPE_SUCCESS,
  CREATE_RECIPE_FAILURE,
} from '../action-types';
import { getAuthToken, normalizeErrors } from '../../utils/helpers';

/**
 * @returns {Action} recipe creation action
 */
// const createRecipe = () => ({
//   type: CREATE_RECIPE,
// });

/**
 * Action to be dispatched with created recipe as payload
 * @param {object} payload dispatch payload
 * @returns {Action} recipe creation success
 */
const recipeCreationSuccess = payload => ({
  type: CREATE_RECIPE_SUCCESS,
  payload,
});

/**
 * Action to be dispatched with recipe creation errors as payload
 * @param {object} payload dispatch payload
 * @returns {Action} recipe creation failure
 */
const recipeCreationFailure = payload => ({
  type: CREATE_RECIPE_FAILURE,
  payload,
});

/**
 *  Recipe creation action creator
 * @param {object} recipeData recipeCreation payload
 * @returns {undefined} dispatch
 */
const recipeCreator = recipeData => async dispatch => {
  dispatch({ type: CREATE_RECIPE });
  try {
    const response = await Axios.post(
      `${process.env.API_BASE_URL}/recipes`,
      recipeData,
      { headers: { authorization: getAuthToken() } }
    );

    dispatch(recipeCreationSuccess(response.data.recipe));
    toast.success('Recipe Created');
  } catch (error) {
    const errors = normalizeErrors(error);

    if (errors.messages) {
      errors.messages.forEach(err => {
        toast.error(err);
      });
    }

    dispatch(recipeCreationFailure(errors));
  }
};

export default recipeCreator;
