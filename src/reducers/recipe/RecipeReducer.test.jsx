import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import recipeReducer, { initialState as recipeState } from './recipeReducer';

configure({ adapter: new Adapter() });
describe('recipe reducer', () => {
  it('should return the initial state', () => {
    expect(recipeReducer(undefined, {})).toEqual(recipeState);
  });
});
