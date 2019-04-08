import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import expect from 'expect';
import thunk from 'redux-thunk';
import {
  GET_RECIPE,
  FETCH_RECIPES_REQUEST,
  FETCH_RECIPE_SUCCESS,
} from '../action-types';
import { fetchRecipes, getRecipe } from './recipe';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions ', () => {
  it('should create an action to get recipes', () => {
    const expectedAction = {
      type: GET_RECIPE,
    };
    expect(getRecipe()).toEqual(expectedAction);
  });
});

describe('fetchRecipes async actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('creates FETCH_RECIPE_SUCCESS after successfuly fetching recipes', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          id: '3a',
          title: 'eba with red oil',
          body: 'I hate it and you know it',
        },
      });
    });

    const expectedActions = [
      { type: FETCH_RECIPES_REQUEST },
      {
        type: FETCH_RECIPE_SUCCESS,
        recipes: {
          id: '3a',
          title: 'eba with red oil',
          body: 'I hate it and you know it',
        },
      },
    ];

    const store = mockStore({ recipes: {} });

    return store.dispatch(fetchRecipes()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
