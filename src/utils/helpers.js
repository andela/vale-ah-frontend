import shortid from 'shortid';
import Axios from 'axios';
import { toast } from 'react-toastify';

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
 * Get token from localstorage
 * @returns {string} bearer token
 */
export const getAuthToken = () => localStorage.getItem('naija_chopchop_token');

/**
 * Get generate unique identifier
 * @returns {string} id
 */
export const generateKey = () => shortid.generate();

/**
 *
 * @param {Object} params upload params
 * @returns {undefined}
 */
const cloudUpload = ({ mediaFiles, stepIndex }) => {
  const uploads = mediaFiles.map(file => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.UPLOAD_PRESET);
    formData.append('timestamp', Date.now());

    return Axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/upload`,
      formData
    );
  });

  Axios.all(uploads)
    .then(res => {
      const mediaInfo = res.map(uploadResponse => ({
        resType: uploadResponse.data.resource_type,
        url: uploadResponse.data.url,
      }));

      if (stepIndex >= 0) {
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

      toast.success('Media files uploaded successfully');
    })
    .catch(() =>
      toast.error('An error occured while attaching uploaded media files')
    );
};

/**
 *
 * @param {Event} e change event
 * @param {Event} e.target change eventtarget
 * @param {Array} typeFilter array of allowed formats
 * @returns {undefined}
 */
export const fileInputChangeHandler = (
  { target },
  { typeFilter, stepIndex }
) => {
  if (target.files.length) toast.info('Processing uploads');

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

  if (mediaFiles.length) cloudUpload({ mediaFiles, stepIndex });
};
