import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { GET_RECIPE } from '../action-types';
import { getRecipe } from './recipe';

configure({ adapter: new Adapter() });

describe('actions', () => {
  it('should create an action to get recipes', () => {
    const expectedAction = {
      type: GET_RECIPE,
    };
    expect(getRecipe()).toEqual(expectedAction);
  });
});
