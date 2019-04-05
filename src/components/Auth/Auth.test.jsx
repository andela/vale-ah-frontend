import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import Auth from './Auth';

configure({ adapter: new Adapter() });
describe('<Auth />', () => {
  it('matches the snapshot', () => {
    const tree = shallow(<Auth authType="login" />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
