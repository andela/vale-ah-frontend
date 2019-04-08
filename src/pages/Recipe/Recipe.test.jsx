import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import Recipe from './Recipe';

configure({ adapter: new Adapter() });
describe('<Recipe />', () => {
  it('matches the snapshot', () => {
    const tree = shallow(<Recipe />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
