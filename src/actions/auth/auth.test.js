import axios from 'axios';
import faker from 'faker';
import * as types from '../action-types';
import * as actions from './auth-actions';
import * as dispatcher from './auth-dispatchers';
import { mockStore } from '../../../test/setupTests';

const payload = {
  user: {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: 'password',
    confirmPassword: 'password',
  },
};
const mockData = {
  data: {
    user: {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      token: faker.random.uuid(),
    },
  },
};
const mockData2 = {
  error: {
    response: {
      data: {
        errors: {
          message: ['Network Error'],
        },
      },
    },
  },
};

describe('actions', () => {
  it('should create an action for Login request', () => {
    const expectedAction = {
      type: types.AUTH_REQUEST,
    };
    expect(actions.authRequestAction()).toEqual(expectedAction);
  });

  it('should create an action for Login Success', () => {
    const expectedAction = {
      type: types.AUTH_SUCCESS,
      payload,
    };
    expect(actions.authSuccessAction(payload)).toEqual(expectedAction);
  });

  it('should create an action for Login Failure', () => {
    const expectedAction = {
      type: types.AUTH_FAILURE,
      payload,
    };
    expect(actions.authFailureAction(payload)).toEqual(expectedAction);
  });

  it('should create an action for logout', () => {
    const expectedAction = {
      type: types.LOGOUT,
    };
    expect(actions.logoutAction()).toEqual(expectedAction);
  });

  it('should create an action for clear error', () => {
    const expectedAction = {
      type: types.CLEAR_AUTH_ERROR,
    };
    expect(actions.clearError()).toEqual(expectedAction);
  });
});

describe('async', () => {
  it('should handle login success', async () => {
    const store = mockStore({});
    const expectedActions = [
      { type: types.AUTH_REQUEST },
      {
        type: types.AUTH_SUCCESS,
        payload: mockData.data,
      },
    ];
    await axios.post.mockResolvedValue(mockData);
    await store.dispatch(dispatcher.loginUser(payload));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should handle register success', async () => {
    const store = mockStore({});
    const expectedActions = [
      { type: types.AUTH_REQUEST },
      {
        type: types.AUTH_SUCCESS,
        payload: mockData.data,
      },
    ];
    await axios.post.mockResolvedValue(mockData);
    await store.dispatch(dispatcher.registerUser(payload.user));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should handle register failure', async () => {
    const store = mockStore({});
    const expectedNormalizedError = {
      password: ['password must be at least 8 characters long'],
      username: ['username must be at least 3 characters long'],
    };
    const expectedActions = [
      {
        type: types.AUTH_FAILURE,
        payload: expectedNormalizedError,
      },
    ];
    await axios.post.mockRejectedValue(mockData2.error);

    await store.dispatch(dispatcher.registerUser());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should handle login failure', async () => {
    const store = mockStore({});
    const expectedNormalizedError = { message: ['Network Error'] };
    const expectedActions = [
      { type: types.AUTH_REQUEST },
      {
        type: types.AUTH_FAILURE,
        payload: expectedNormalizedError,
      },
    ];
    await axios.post.mockRejectedValue(mockData2.error);

    await store.dispatch(dispatcher.loginUser());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should handle logout success', async () => {
    const store = mockStore({});
    const expectedActions = [{ type: types.LOGOUT }];
    store.dispatch(dispatcher.logoutUser());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
