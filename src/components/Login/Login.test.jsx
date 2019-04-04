import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import Login from './Login';

configure({ adapter: new Adapter() });
describe('<App />', () => {
  it('h1 contains correct text', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('h2').text()).toBe('Kindly login below');
  });
  it('matches the snapshot', () => {
    const tree = shallow(<Login />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
