import {
  SOCIAL_LOGIN_REQUEST,
  SOCIAL_LOGIN_FAILURE,
  SOCIAL_LOGIN_SUCCESS,
} from '../../actions/action-types';

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  error: false,
  success: false,
};

/**
 * Social success reducer
 * @param {object} state
 * @param {object} action
 * @returns {object} new state
 */
const socialLoginStart = (state = initialState) => ({
  ...state,
  isLoading: true,
});
/**
 * Social success reducer
 * @param {object} state
 * @param {object} action
 * @returns {object} new state
 */
const socialLoginSuccess = (state, action) => ({
  ...state,
  success: true,
  response: action.payload,
  isLoggedIn: true,
});

/**
 * Social failure reducer
 * @param {object} state
 * @param {object} action
 * @returns {object} new state
 */
const socialLoginFailure = (state, action) => ({
  ...state,
  error: true,
  response: action.payload,
});

/**
 * Social reducer
 * @param {object} state
 * @param {object} action
 * @returns {object} new state
 */
const socialReducer = (state = initialState, action) => {
  switch (action.type) {
    case SOCIAL_LOGIN_REQUEST:
      return socialLoginStart(state, action);
    case SOCIAL_LOGIN_SUCCESS:
      return socialLoginSuccess(state, action);
    case SOCIAL_LOGIN_FAILURE:
      return socialLoginFailure(state, action);
    default:
      return state;
  }
};

export default socialReducer;
