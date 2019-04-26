import axios from 'axios';
import * as actions from './upload-actions';
import { handleMessages } from '../../utils/helpers';

/**
 *
 * @param {Object} payload upload payload
 * @returns {undefined}
 */
export const cloudUpload = payload => dispatch => {
  const { mediaFiles, stepIndex, uploadType } = payload;

  handleMessages(['Uploading media files']);
  dispatch(actions.mediaUploadRequest());

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

      dispatch(actions.mediaUploadStateReset());

      if (uploadType === 'recipe_step') {
        dispatch(
          actions.uploadSuccess({
            mediaInfo,
            stepIndex,
            uploadType,
          })
        );
      }

      if (uploadType === 'recipe_video') {
        dispatch(
          actions.uploadSuccess({
            mediaInfo,
            uploadType,
          })
        );
      }

      handleMessages(['Media files uploaded successfully']);
    })
    .catch(() => {
      handleMessages(
        ['An error occured while attaching uploaded media files'],
        'error'
      );
    });
};

/**
 * reset uploader State
 * @returns {undefined}
 */
export const resetUploader = () => actions.mediaUploadStateReset();
