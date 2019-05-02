import axios from 'axios';
import faker from 'faker';
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
      const token = faker.random.uuid();
      const getItem = jest.fn(() => token);
      Object.defineProperty(window, 'localStorage', {
        writable: true,
        value: {
          getItem,
        },
      });

      const mockData = {
        data: {
          user: { name: 'Test' },
        },
      };

      axios.get.mockResolvedValue(mockData);
      const user = await helpers.checkAuth();

      expect(getItem).toHaveBeenCalledWith('token');
      expect(user).toEqual(mockData.data);
    });
  });
});
