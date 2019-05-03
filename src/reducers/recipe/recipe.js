import * as types from '../../actions/action-types';

const initialState = {
  isLoading: false,
  ingredients: [],
  steps: {},
  preparationTime: 0,
  cookingTime: 0,
  videoList: [],
};

/**
 * @returns {object} next state
 * @param {object} state
 * @param {Action} action
 */
const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_RECIPE_REQUEST:
      return { ...state, isLoading: true };

    case types.GET_SINGLE_RECIPE_SUCCESS:
      return { ...state, ...action.payload.recipe, isLoading: false };

    case types.GET_SINGLE_RECIPE_FAILURE:
      return { ...state, errors: action.payload, isLoading: false };

    default:
      return state;
  }
};

export default recipeReducer;
