import axios from 'axios';
import shortid from 'shortid';
import store from '../store/store';
import { appRef } from './refs';
import * as action from '../actions/auth/auth-actions';

/**
 * Normalizes errors from the backend
 * @param {object} error
 * @returns {object} normalized errors
 */
export const normalizeErrors = error => {
  if (error.message === 'Network Error') {
    return { messages: [error.message] };
  }
  const {
    data: { errors },
  } = error.response;
  return errors instanceof Array ? { messages: errors } : errors;
};

/**
 * @returns {undefined}
 */
export const checkAuth = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${process.env.API_BASE_URL}/user`, {
      headers: { authorization: token },
    });
    store.dispatch(action.authSuccessAction({ user: res.data.user }));
  } catch (error) {
    store.dispatch(action.clearError());
  }
};

/**
 * @returns {undefined}
 * @param {Array} messages
 * @param {string} type error or success
 */
export const handleMessages = (messages, type = 'success') => {
  if (messages && appRef.current)
    appRef.current.dispatchEvent(
      new CustomEvent('app-toast', {
        bubbles: true,
        detail: {
          messages,
          type,
        },
      })
    );
};

/**
 * Get generate unique identifier
 * @returns {string} id
 */
export const generateKey = () => shortid.generate();

/**
 * @param {Event} e
 * @param {*} filePickerRef
 * @returns {undefined}
 */
export const openFilePicker = (e, filePickerRef) => {
  if (e.keyCode && e.keyCode !== 13) return;

  filePickerRef.current.click();
};

/**
 * @returns {object} errors
 * @param {object} data
 * @param {errors} errors
 */
export const validateAuthInput = data => {
  const errors = {};
  if (!(data.username && data.username.length >= 3)) {
    errors.username = ['username must be at least 3 characters long'];
  }
  if (!/^[a-zA-Z0-9]*$/.test(data.password)) {
    errors.password = ['password must be alphanumeric'];
  }
  if (!(data.password && data.password.length >= 8)) {
    if (errors.password) {
      errors.password.push('password must be at least 8 characters long');
    } else errors.password = ['password must be at least 8 characters long'];
  }
  if (data.confirmPassword !== data.password) {
    errors.confirmPassword = ["passwords don't match"];
  }
  return Object.keys(errors).length ? errors : null;
};

/**
 * @param {ArrayLike} files change event
 * @param {Object} options  options
 * @returns {object} object of uploadable media files, errors
 */
export const preUploadAggregator = (files, options) => {
  const { typeFilter, stepIndex, uploadType } = options;

  const resultShape = {
    uploadPayload: { mediaFiles: [], stepIndex, uploadType },
    errors: [],
  };

  const result = Array.from(files).reduce((currentResult, currentFile) => {
    const { name, type } = currentFile;
    const {
      uploadPayload: { mediaFiles },
      errors,
    } = currentResult;

    if (typeFilter.includes(type.split('/')[0])) {
      mediaFiles.push(currentFile);
      currentResult.uploadPayload.mediaFiles = mediaFiles;
    } else
      errors.push(
        `"${name}" - has an unsupported file format and will be discarded.`
      );

    return currentResult;
  }, resultShape);

  return result;
};
