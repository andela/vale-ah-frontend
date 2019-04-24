import authReducer from './auth';
import * as types from '../../actions/action-types';

const initialState = {
  user: null,
  errors: {},
  isLoading: false,
  isLoggedIn: false,
  success: false,
};

describe('AuthReducer', () => {
  const payload = {
    user: {
      email: 'helen@gmail.com',
      password: '12345678',
    },
  };
  it('should return initial state', () => {
    expect(authReducer(initialState, {})).toEqual(initialState);
  });
  it('should handle Login Request', () => {
    expect(
      authReducer(initialState, {
        type: types.AUTH_REQUEST,
      })
    ).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle Login Success', () => {
    expect(
      authReducer(initialState, {
        type: types.AUTH_SUCCESS,
        payload,
      })
    ).toEqual({
      ...initialState,
      success: true,
      isLoggedIn: true,
      user: {
        ...payload.user,
      },
    });
  });
  it('should handle Login Failure', () => {
    expect(
      authReducer(initialState, {
        type: types.AUTH_FAILURE,
        payload,
      })
    ).toEqual({
      ...initialState,
      errors: {
        ...payload,
      },
    });
  });

  it('should handle Logout', () => {
    expect(
      authReducer(initialState, {
        type: types.LOGOUT,
      })
    ).toEqual({
      ...initialState,
    });
  });

  it('should handle clearError', () => {
    const clearError = authReducer(initialState, {
      type: types.CLEAR_AUTH_ERROR,
    });
    expect(clearError.errors).toEqual({});
  });
});
