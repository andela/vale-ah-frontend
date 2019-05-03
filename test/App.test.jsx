import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import App from '../src/App';
import Routes from '../src/routes/Routes';
import { mockStore } from './setupTests';

const wrapper = mount(
  <Provider store={mockStore({ auth: { isLoggedIn: false } })}>
    <App />
  </Provider>
);
describe('<App/> rendering', () => {
  it('should render one <Routes> component', () => {
    expect(wrapper.find(Routes)).toHaveLength(1);
  });

  it('matches the snapshot', () => {
    const tree = shallow(<App />);
    expect(toJSON(tree)).toMatchSnapshot();
  });
});
