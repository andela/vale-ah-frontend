import axios from 'axios';
import faker from 'faker';
import store from '../store/store';
import * as helpers from './helpers';

describe('Helpers', () => {
  it('it should handle network error', () => {
    const errors = {
      message: 'Network Error',
    };
    expect(helpers.normalizeErrors(errors)).toEqual({
      messages: ['Network Error'],
    });
  });

  it('it should handle user input error', () => {
    const errors = {
      response: {
        data: { errors: ['Invalid/Password'] },
      },
    };
    expect(helpers.normalizeErrors(errors)).toEqual({
      messages: ['Invalid/Password'],
    });
  });

  describe('checkAuth', () => {
    it('it should handle successful check Auth', async () => {
      const fakeDispatch = jest.fn(args => Promise.resolve(args));
      const token = faker.random.hexaDecimal;
      const getItem = jest.fn(() => token);
      Object.defineProperty(window, 'localStorage', {
        writable: true,
        value: {
          getItem,
        },
      });
      Object.defineProperty(store, 'dispatch', {
        writable: true,
        value: fakeDispatch,
      });
      const mockData = {
        data: {
          user: { name: 'Test' },
        },
      };
      axios.get.mockResolvedValue(mockData);
      await helpers.checkAuth();

      expect(getItem).toHaveBeenCalledWith('token');
      expect(fakeDispatch).toHaveBeenCalled();
      expect(fakeDispatch.mock.calls).toEqual([
        [{ type: 'AUTH_SUCCESS', payload: mockData.data }],
      ]);
    });
  });
});
