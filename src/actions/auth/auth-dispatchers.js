import axios from 'axios';
import * as actions from './auth-actions';
import {
  normalizeErrors,
  handleMessages,
  validateAuthInput,
} from '../../utils/helpers';

const baseUrl = `${process.env.API_BASE_URL}/users`;

/**
 * @param {object} data
 * @returns {undefined}
 */
export const loginUser = (data = {}) => async dispatch => {
  dispatch(actions.authRequestAction());
  try {
    const res = await axios.post(`${baseUrl}/login`, data);
    const { user } = res.data;
    localStorage.setItem('token', user.token);
    dispatch(actions.authSuccessAction(res.data));
  } catch (error) {
    const errors = normalizeErrors(error);
    handleMessages(errors.messages, 'error');
    dispatch(actions.authFailureAction(errors));
  }
};

/**
 * @param {object} data
 * @returns {undefined}
 */
export const registerUser = (data = {}) => async dispatch => {
  const validationErrors = validateAuthInput(data);
  if (validationErrors) dispatch(actions.authFailureAction(validationErrors));
  else {
    dispatch(actions.authRequestAction());
    try {
      const res = await axios.post(baseUrl, data);
      const { user } = res.data;
      localStorage.setItem('token', user.token);
      handleMessages(
        ['Registration successful', 'An email has been sent for verification'],
        'success'
      );
      dispatch(actions.authSuccessAction(res.data));
    } catch (error) {
      const errors = normalizeErrors(error);
      handleMessages(errors.messages, 'error');

      dispatch(actions.authFailureAction(errors));
    }
  }
};

/**
 * @returns {undefined}
 */
export const logoutUser = () => dispatch => {
  localStorage.removeItem('token');
  dispatch(actions.logoutAction());
};
