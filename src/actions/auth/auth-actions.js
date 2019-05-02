import * as types from '../action-types';

/**
 * @returns {Action} clear error action
 */
export const clearError = () => ({
  type: types.CLEAR_AUTH_ERROR,
});

/**
 * @returns {Action} auth request action
 */
export const authRequestAction = () => ({
  type: types.AUTH_REQUEST,
});

/**
 * @param {object} payload
 * @returns {Action} auth success action
 */
export const authSuccessAction = payload => ({
  type: types.AUTH_SUCCESS,
  payload,
});

/**
 * @returns {object} - social start action
 */
export const socialLoginStart = () => ({
  type: types.SOCIAL_LOGIN_REQUEST,
});

/**
 * @param {*} payload
 * @returns {object} type and payload
 */
export const socialLoginSuccess = payload => ({
  type: types.SOCIAL_LOGIN_SUCCESS,
  payload,
});

/**
 * @param {*} payload
 * @returns {object} type and payload
 */
export const socialLoginFailure = payload => ({
  type: types.SOCIAL_LOGIN_FAILURE,
  payload,
});

/**
 * @param {object} payload
 * @returns {Action} auth failure action
 */
export const authFailureAction = payload => ({
  type: types.AUTH_FAILURE,
  payload,
});

/**
 * @returns {Action} logout action
 */
export const logoutAction = () => ({ type: types.LOGOUT });
