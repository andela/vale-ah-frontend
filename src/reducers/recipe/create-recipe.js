import {
  CREATE_RECIPE,
  CREATE_RECIPE_SUCCESS,
  CREATE_RECIPE_FAILURE,
} from '../../actions/action-types';

const initialState = {
  pending: false,
  created: false,
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
const createRecipe = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_RECIPE:
      return { ...state, pending: true };

    case CREATE_RECIPE_SUCCESS:
      return { ...state, pending: false, created: true, recipe: payload };

    case CREATE_RECIPE_FAILURE:
      return { ...state, pending: false, errors: payload };

    default:
      return { ...state };
  }
};

export default createRecipe;
