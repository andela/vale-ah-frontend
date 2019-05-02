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
});
