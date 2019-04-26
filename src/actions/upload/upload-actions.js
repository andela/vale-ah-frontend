import * as types from '../action-types';

/**  Action to be dispatched uploading media
 * @returns {Action} media upload initiator
 */
export const mediaUploadRequest = () => ({
  type: types.UPLOAD_MEDIA,
});

/**
 * Action to be dispatched with uploaded media payload
 * @param {object} payload dispatch payload
 * @returns {Action} media upload success
 */
export const uploadSuccess = payload => ({
  type: types.MEDIA_UPLOAD_SUCCESS,
  payload,
});

/**
 * Action to be dispatched with uploaded media payload
 * @param {object} payload dispatch payload
 * @returns {Action} media upload success
 */
export const mediaUploadStateReset = payload => ({
  type: types.MEDIA_UPLOAD_RESET,
  payload,
});
