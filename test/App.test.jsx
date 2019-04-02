import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import App from '../src/pages/App';

configure({ adapter: new Adapter() });
describe('<App />', () => {
  it('h1 contains correct text', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('h1').text()).toBe('Welcome to Naija Chop Chop');
  });
  it('matches the snapshot', () => {
    const tree = shallow(<App />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
