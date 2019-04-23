import axios from 'axios';
import {
  PASSWORD_RESET_FAILURE,
  PASSWORD_RESET_START,
  PASSWORD_RESET_SUCCESS,
} from '../action-types';

/**
 *
 * @returns
 * @returns {object} object
 */
export const passwordResetStart = () => ({
  type: PASSWORD_RESET_START,
});

/**
 *
 * @param {payload} payload
 * @returns
 * @returns {object} object
 */
export const passwordResetSuccess = payload => ({
  type: PASSWORD_RESET_SUCCESS,
  payload,
});

/**
 *
 * @param {payload} payload
 * @returns
 * @returns {object} object
 */
export const passwordResetFailure = payload => ({
  type: PASSWORD_RESET_FAILURE,
  payload,
});

/**
 *
 * @param {*} password
 * @param {*} token
 * @returns
 * @returns {dispatch} dispatch
 */
export const changePassword = (password, token) => dispatch => {
  dispatch(passwordResetStart());
  axios
    .post(
      'http://localhost:3000/api/users/reset-password',
      { password },
      {
        headers: { Authorization: token },
      }
    )
    .then(res => {
      dispatch(passwordResetSuccess(res.data));
    })
    .catch(err => {
      dispatch(passwordResetFailure(err.response.data.errors));
    });
};
