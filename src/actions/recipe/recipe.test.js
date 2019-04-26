import faker from 'faker';
import axios from 'axios';
import { mockStore } from '../../../test/setupTests';
import * as types from '../action-types';
import * as actions from './recipe-actions';

const mockRes = {
  data: {
    recipe: {
      title: 'Egusi Soup',
      slug: faker.helpers.slugify('Egusi Soup'),
      ingredients: ['water', 'egusi', 'garri'],
      steps: {
        '1': {
          description: faker.lorem.sentence(),
          images: [faker.image.food()],
        },
      },
      cookingTime: 500,
      preparationTime: 200,
      videoList: [],
    },
  },
};

const store = mockStore({ recipe: {}, isLoading: false });

describe('async', () => {
  it('should handle get recipe success', async () => {
    const expectedActions = [
      { type: types.GET_RECIPE_REQUEST },
      {
        type: types.GET_SINGLE_RECIPE_SUCCESS,
        payload: mockRes.data,
      },
    ];
    await axios.get.mockResolvedValue(mockRes);
    await store.dispatch(actions.getSingleRecipe(mockRes.data.recipe.slug));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
