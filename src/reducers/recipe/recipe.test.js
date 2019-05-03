import recipeReducer from './recipe';
import * as types from '../../actions/action-types';

const initalState = { recipe: {}, isLoading: false };

it('should start loading when request is sent', () => {
  const { isLoading } = recipeReducer(initalState, {
    type: types.GET_RECIPE_REQUEST,
  });
  expect(isLoading).toBe(true);
});

it('should handle get recipe success', () => {
  const { isLoading, ...recipe } = recipeReducer(initalState, {
    type: types.GET_SINGLE_RECIPE_SUCCESS,
    payload: { recipe: { id: 7, title: 'Egusi' } },
  });
  expect(recipe).toEqual({ recipe: {}, id: 7, title: 'Egusi' });
  expect(isLoading).toBe(false);
});

it('should handle get recipe failure', () => {
  const { recipe, isLoading, errors } = recipeReducer(initalState, {
    type: types.GET_SINGLE_RECIPE_FAILURE,
    payload: { message: ['Network Error'] },
  });
  expect(recipe).toEqual({});
  expect(isLoading).toBe(false);
  expect(errors).toEqual({ message: ['Network Error'] });
});
