import * as types from '../../actions/action-types';

const initialState = {
  response: null,
  isLoading: false,
  success: false,
};

/**
 * Upload reducer
 * @param {*} state
 * @param {*} action
 * @returns {object} new state
 */
const uploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPLOAD_MEDIA:
      return { ...state, isLoading: true, success: false };

    case types.MEDIA_UPLOAD_SUCCESS:
      return { success: true, response: action.payload, isLoading: false };

    case types.MEDIA_UPLOAD_RESET:
      return state;
    default:
      return state;
  }
};

export default uploadReducer;
