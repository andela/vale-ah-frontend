import { GET_RECIPE } from '../actions/action-types';

const initialState = {
  recipes: [
    {
      id: 1,
      title: 'eba with milk',
      body: 'nothing beats the combo',
    },
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPE:
      return {
        ...state,
      };
    default:
      return state;
  }
};
