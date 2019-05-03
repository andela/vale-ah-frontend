import * as types from '../../actions/action-types';

const initialState = { recipes: [], isLoading: false };

/**
 * @returns {object} next state
 * @param {object} state
 * @param {Action} action
 */
const recipesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_RECIPES_REQUEST:
      return { ...state, isLoading: true };

    case types.GET_ALL_RECIPES_SUCCESS:
      return { ...state, recipes: action.payload.recipes, isLoading: false };

    case types.GET_ALL_RECIPES_FAILURE:
      return { ...state, errors: action.payload, isLoading: false };

    default:
      return state;
  }
};

export default recipesReducer;
