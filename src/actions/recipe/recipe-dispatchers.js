import axios from 'axios';
import * as actions from './recipe-actions';
import { normalizeErrors, handleMessages } from '../../utils/helpers';

/**
 *  Recipe creation action creator
 * @param {object} recipeData recipeCreation payload
 * @returns {undefined} dispatch
 */
export const create = recipeData => async dispatch => {
  dispatch(actions.recipeCreationRequest());
  try {
    const response = await axios.post(
      `${process.env.API_BASE_URL}/recipes`,
      recipeData,
      { headers: { authorization: localStorage.getItem('token') } }
    );

    dispatch(actions.recipeCreationSuccess(response.data.recipe));
  } catch (error) {
    const errors = normalizeErrors(error);

    handleMessages(errors.messages, 'error');

    dispatch(actions.recipeCreationFailure(errors));
  }
};

/**
 * @returns {undefined}
 * @param {string} slug
 */
export const getSingleRecipe = slug => async dispatch => {
  dispatch(actions.getRecipeRequestAction());
  try {
    const res = await axios.get(`${process.env.API_BASE_URL}/recipes/${slug}`);
    dispatch(actions.getRecipeSuccessAction(res.data));
  } catch (error) {
    const errors = normalizeErrors(error);
    handleMessages(errors.messages, 'error');
    dispatch(actions.getRecipeFailureAction(errors));
  }
};

/**
 *  Recipe update action creator
 * @param {object} recipeData recipeUpdate payload
 * @param {string} slug recipeUpdate payload
 * @returns {undefined} dispatch
 */
export const updateSingleRecipe = (recipeData, slug) => async dispatch => {
  dispatch(actions.recipeUpdateRequest());
  try {
    const response = await axios.put(
      `${process.env.API_BASE_URL}/recipes/${slug}`,
      recipeData,
      { headers: { authorization: localStorage.getItem('token') } }
    );

    dispatch(actions.recipeUpdateSuccess(response.data.recipe));
  } catch (error) {
    const errors = normalizeErrors(error);

    handleMessages(errors.messages, 'error');

    dispatch(actions.recipeUpdateFailure(errors));
  }
};
