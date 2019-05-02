import {
  PASSWORD_RESET_START,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILURE,
} from '../../actions/action-types';

const initialState = {
  isChanging: false,
  errors: [],
  response: '',
  success: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PASSWORD_RESET_START:
      return {
        ...state,
        isChanging: true,
      };
    case PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        isChanging: false,
        response: action.payload,
        success: true,
        errors: null,
      };
    case PASSWORD_RESET_FAILURE:
      return {
        ...state,
        isChanging: false,
        response: null,
        errors: action.payload,
        success: false,
      };
    default:
      return state;
  }
};
