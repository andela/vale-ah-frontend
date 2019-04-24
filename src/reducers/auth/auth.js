import * as types from '../../actions/action-types';

const initialState = {
  user: null,
  errors: {},
  isLoading: false,
  isLoggedIn: false,
  success: false,
};

/**
 * Auth reducer
 * @param {object} state
 * @param {Action} action
 * @returns {object} new state
 */
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_REQUEST:
      return { ...state, isLoading: true };

    case types.AUTH_SUCCESS:
      return {
        ...state,
        user: {
          ...action.payload.user,
        },
        isLoading: false,
        isLoggedIn: true,
        success: true,
      };

    case types.AUTH_FAILURE:
      return {
        ...state,
        errors: action.payload,
        isLoading: false,
        isLoggedIn: false,
        success: false,
      };

    case types.LOGOUT:
      return { ...initialState };

    case types.CLEAR_AUTH_ERROR:
      return { ...state, errors: {} };

    default:
      return state;
  }
};

export default authReducer;
