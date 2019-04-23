import {
  DELETE_RECIPE_REQUEST,
  DELETE_RECIPE_SUCCESS,
  DELETE_RECIPE_FAILURE,
} from '../../actions/action-types';

const initialState = {
  pending: false,
  updates: false,
  recipe: {},
  errors: {},
};

/**
 *
 * @param {object} state reducer state
 * @param {Action} action  Action
 * @param {string} action.type  Action type
 * @param {object} action.payload  Action payload
 * @returns {object} updated state
 */
const deleteRecipe = (state = initialState, { type, payload }) => {
  switch (type) {
    case DELETE_RECIPE_REQUEST:
      return { ...state, pending: true };

    case DELETE_RECIPE_SUCCESS:
      return { ...state, pending: false, updated: true, recipe: payload };

    case DELETE_RECIPE_FAILURE:
      return { ...state, updated: false, errors: payload };

    default:
      return { ...state };
  }
};

export default deleteRecipe;
