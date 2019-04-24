import axios from 'axios';
import shortid from 'shortid';
import { toast } from 'react-toastify';
import store from '../store/store';
import * as action from '../actions/auth/auth-actions';
import { appRef } from './refs';

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
export const handleMessages = (messages, type) => {
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
 *
 * @param {Object} params upload params
 * @returns {undefined}
 */
const cloudUpload = ({ mediaFiles, stepIndex, uploadType }) => {
  const uploads = mediaFiles.map(file => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.UPLOAD_PRESET);
    formData.append('timestamp', Date.now());

    return axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/upload`,
      formData
    );
  });

  axios
    .all(uploads)
    .then(res => {
      const mediaInfo = res.map(uploadResponse => ({
        resType: uploadResponse.data.resource_type,
        url: uploadResponse.data.url,
      }));

      if (uploadType === 'recipe_step') {
        window.dispatchEvent(
          new CustomEvent('step_upload_complete', {
            bubbles: true,
            detail: {
              mediaInfo,
              stepIndex,
            },
          })
        );
      }

      if (uploadType === 'recipe_video') {
        window.dispatchEvent(
          new CustomEvent('video_upload_complete', {
            bubbles: true,
            detail: {
              mediaInfo,
            },
          })
        );
      }

      toast.success('Media files uploaded successfully');
    })
    .catch(() =>
      toast.error('An error occured while attaching uploaded media files')
    );
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
 * @param {Event} e change event
 * @param {Event} e.target change eventtarget
 * @param {Object} options handler options
 * @returns {undefined}
 */
export const fileInputChangeHandler = (
  { target },
  { typeFilter, stepIndex, uploadType }
) => {
  if (target.files.length) toast.info('Processing uploads!');

  const mediaFiles = Array.from(target.files).reduce(
    (validFiles, currentFile) => {
      if (typeFilter.includes(currentFile.type.split('/')[0])) {
        return [...validFiles, currentFile];
      }

      toast.error(
        ` "${
          currentFile.name
        }" - has an unsupported file format and will be discarded.`
      );

      return validFiles;
    },
    []
  );

  if (mediaFiles.length) cloudUpload({ mediaFiles, stepIndex, uploadType });
};
