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
