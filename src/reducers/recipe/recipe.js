import * as types from '../../actions/action-types';

export const initialState = {
  recipes: {
    title: 'How to prepare your finest recipe',
    ingredients: ['A spoon of awesomeness', 'A cup of dedication'],
    steps: {
      '1': {
        description: 'Add a spoon of awesomeness to the mixer',
        images: ['https://i.stack.imgur.com/xHWG8.jpg'],
      },
      '2': {
        description: 'Add a spoon of awesomeness to the mixer',
        images: ['https://i.stack.imgur.com/xHWG8.jpg'],
      },
    },
    cookingTime: 1000,
    preparationTime: 3000,
  },
  errors: {},
  isLoading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_RECIPE_REQUEST:
      return { ...state, isLoading: true };

    case types.GET_RECIPE_SUCCESS: {
      const { recipe } = action.payload;
      return { ...state, recipe, isLoading: false };
    }

    case types.GET_RECIPE_FAILURE: {
      const { errors } = action.payload;
      return { ...state, errors, isLoading: false };
    }

    default:
      return state;
  }
};
