import axios from 'axios';
import {
  PASSWORD_RESET_LINK_FAILURE,
  PASSWORD_RESET_LINK_START,
  PASSWORD_RESET_LINK_SUCCESS,
} from '../action-types';

/**
 *
 * @returns
 * @returns {object} object
 */
export const passwordResetStart = () => ({
  type: PASSWORD_RESET_LINK_START,
});

/**
 *
 * @param {payload} payload
 * @returns
 * @returns {object} object
 */
export const passwordResetSuccess = payload => ({
  type: PASSWORD_RESET_LINK_SUCCESS,
  payload,
});

/**
 *
 * @param {payload} payload
 * @returns
 * @returns {object} object
 */
export const passwordResetFailure = payload => ({
  type: PASSWORD_RESET_LINK_FAILURE,
  payload,
});

/**
 *
 * @param {*} email
 * @returns
 * @returns {dispatch} dispatch
 */
export const sendResetLink = email => dispatch => {
  dispatch(passwordResetStart());
  return axios
    .post('http://localhost:3000/api/users/reset-password/email', { email })
    .then(res => {
      dispatch(passwordResetSuccess(res.data.message));
    })
    .catch(err => {
      dispatch(passwordResetFailure(err.response.data.errors));
    });
};
