import {
  SOCIAL_LOGIN_FAILURE,
  SOCIAL_LOGIN_SUCCESS,
  SOCIAL_LOGIN_REQUEST,
} from '../action-types';
import { checkAuth } from '../../utils/helpers';

/**
 * @returns {object} -
 */
export const socialLoginStart = () => ({
  type: SOCIAL_LOGIN_REQUEST,
});
/**
 * @param {*} payload
 * @returns {object} type and payload
 */
export const socialLoginSuccess = payload => ({
  type: SOCIAL_LOGIN_SUCCESS,
  payload,
});

/**
 * @param {*} payload
 * @returns {object} type and error
 */
export const socialLoginFailure = payload => ({
  type: SOCIAL_LOGIN_FAILURE,
  payload,
});

/**
 * @param {string} token - oauth provider
 * @param {string} history - oauth provider
 * @returns {fn} login dispatch function
 */
export const socialLogin = (token, history) => dispatch => {
  dispatch(socialLoginStart());
  try {
    localStorage.setItem('token', token);
    dispatch(socialLoginSuccess(token));
    checkAuth();
    history.push('/recipes/create');
  } catch (error) {
    dispatch(socialLoginFailure(error));
  }
};
