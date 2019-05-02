import faker from 'faker';
import axios from 'axios';
import * as types from '../../action-types';
import * as actions from '../password-reset';
import { mockStore } from '../../../../test/setupTests';

const payload = {
  response: {
    email: faker.internet.email(),
  },
};

describe('actions', () => {
  it('should create an action for initializing password reset mail', () => {
    const expectedAction = {
      type: types.PASSWORD_RESET_START,
    };
    expect(actions.passwordResetStart()).toEqual(expectedAction);
  });

  it('should create an action when email sent is successful', () => {
    const expectedAction = {
      type: types.PASSWORD_RESET_SUCCESS,
      payload,
    };
    expect(actions.passwordResetSuccess(payload)).toEqual(expectedAction);
  });

  it('should create an action for an unsucessful password reset mail', () => {
    const expectedAction = {
      type: types.PASSWORD_RESET_FAILURE,
      payload,
    };
    expect(actions.passwordResetFailure(payload)).toEqual(expectedAction);
  });
});

describe('Reset Password Actions', () => {
  it('should handle password reset mail success', () => {
    const store = mockStore();
    const expectedActions = [
      { type: types.PASSWORD_RESET_START },
      {
        type: types.PASSWORD_RESET_SUCCESS,
        payload: 'success',
      },
    ];
    axios.post.mockResolvedValue({ data: 'success' });
    return store.dispatch(actions.changePassword()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should handle password reset mail success', () => {
    const store = mockStore();
    const expectedActions = [
      { type: types.PASSWORD_RESET_START },
      {
        type: types.PASSWORD_RESET_FAILURE,
        payload: 'failed',
      },
    ];
    axios.post.mockRejectedValue({ response: { data: { errors: 'failed' } } });
    return store.dispatch(actions.changePassword()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
