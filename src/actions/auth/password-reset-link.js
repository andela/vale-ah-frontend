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
export const passwordResetLinkStart = () => ({
  type: PASSWORD_RESET_LINK_START,
});

/**
 *
 * @param {payload} payload
 * @returns
 * @returns {object} object
 */
export const passwordResetLinkSuccess = payload => ({
  type: PASSWORD_RESET_LINK_SUCCESS,
  payload,
});

/**
 *
 * @param {payload} payload
 * @returns
 * @returns {object} object
 */
export const passwordResetLinkFailure = payload => ({
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
  dispatch(passwordResetLinkStart());
  return axios
    .post(`${process.env.API_BASE_URL}users/reset-password/email`, { email })
    .then(res => {
      dispatch(passwordResetLinkSuccess(res.data.message));
    })
    .catch(err => {
      dispatch(passwordResetLinkFailure(err.response.data.errors));
    });
};
