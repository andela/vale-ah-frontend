import axios from 'axios';
import * as actions from './recipe-actions';

const baseUrl = `${process.env.API_BASE_URL}/recipes`;

/**
 * @returns {undefined}
 * @param {object} data
 */
export const getRecipe = data => async dispatch => {
  dispatch(actions.getRecipeRequestAction());
  try {
    const res = await axios.get(`${baseUrl}/${data.slug}`);
    dispatch(actions.getRecipeSuccessAction(res.data));
  } catch (error) {
    dispatch(actions.getRecipeFailureAction(error));
  }
};
