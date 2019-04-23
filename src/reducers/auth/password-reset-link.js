import {
  PASSWORD_RESET_LINK_START,
  PASSWORD_RESET_LINK_SUCCESS,
  PASSWORD_RESET_LINK_FAILURE,
} from '../../actions/action-types';

const initialState = {
  isSending: false,
  errors: [],
  response: '',
  success: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PASSWORD_RESET_LINK_START:
      return {
        ...state,
        isSending: true,
      };
    case PASSWORD_RESET_LINK_SUCCESS:
      return {
        ...state,
        isSending: false,
        response: action.payload,
        success: true,
        errors: [],
      };
    case PASSWORD_RESET_LINK_FAILURE:
      return {
        ...state,
        isSending: false,
        errors: action.payload,
        success: false,
      };
    default:
      return state;
  }
};
