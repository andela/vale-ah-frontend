import axios from 'axios';
import * as types from '../action-types';
import { normalizeErrors, handleMessages } from '../../utils/helpers';

const baseUrl = process.env.API_BASE_URL;

/**
 * @returns {Action} get recipe request action
 */
export const getRecipesRequestAction = () => ({
  type: types.GET_RECIPES_REQUEST,
});
/**
 * @returns {Action} get recipe success action
 * @param {object} payload
 */
export const getRecipesSuccessAction = payload => ({
  type: types.GET_ALL_RECIPES_SUCCESS,
  payload,
});
/**
 * @returns {Action} get recipe failure action
 * @param {object} payload
 */
export const getRecipesFailureAction = payload => ({
  type: types.GET_ALL_RECIPES_FAILURE,
  payload,
});

/**
 * @returns {undefined}
 * @param {string} slug
 */
export const getAllRecipes = () => async dispatch => {
  dispatch(getRecipesRequestAction());
  try {
    const res = await axios.get(`${baseUrl}/recipes`);
    dispatch(getRecipesSuccessAction(res.data));
  } catch (error) {
    const errors = normalizeErrors(error);
    handleMessages(errors.messages, 'error');
    dispatch(getRecipesFailureAction(errors));
  }
};
