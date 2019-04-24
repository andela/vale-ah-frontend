import socialReducer from './social-reducer';
import * as types from '../../actions/action-types';

const initialState = {
  error: false,
  isLoading: false,
  isLoggedIn: false,
  success: false,
};

describe('SocialReducer', () => {
  const payload = {
    userData: {
      email: 'socialuser@email.com',
      password: 'socialluser',
    },
  };

  it('should return the initial state', () => {
    expect(socialReducer(initialState, {})).toEqual(initialState);
  });

  it('should handle social authentication request', () => {
    expect(
      socialReducer(initialState, {
        action: {
          type: types.SOCIAL_LOGIN_REQUEST,
        },
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
    });
  });

  it('should handle social success', () => {
    expect(
      socialReducer(initialState, {
        type: types.SOCIAL_LOGIN_SUCCESS,
        payload,
      })
    ).toEqual({
      ...initialState,
      isLoggedIn: true,
      response: payload,
      success: true,
    });
  });

  it('should handle social failure', () => {
    expect(
      socialReducer(initialState, {
        type: types.SOCIAL_LOGIN_FAILURE,
        payload,
      })
    ).toEqual({
      ...initialState,
      response: payload,
      error: true,
    });
  });
});
