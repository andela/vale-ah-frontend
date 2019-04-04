import { GET_RECIPE } from '../actions/action-types';

const initialState = {
  '1a': {
    id: '1a',
    title: 'eba with milk',
    body: 'nothing beats the combo',
  },
  '2a': {
    id: '2a',
    title: 'eba with custard',
    body: 'I love it and you know it',
  },
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
