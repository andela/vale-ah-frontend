import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import faker from 'faker';
import mockRouterOptions from '../../../test/__mocks__/mockRouter';
import Auth from '../Auth/Auth';
import Login from './Login';
import { mockStore } from '../../../test/setupTests';

const initialState = {
  auth: {
    response: {
      user: {
        token: faker.random.uuid(),
      },
    },
    isLoading: false,
    errors: {},
  },
};

const store = mockStore(initialState);

const props = {
  errors: {},
  onClose: jest.fn(),
  success: false,
};
const wrapper = mount(
  <Provider store={store}>
    <Router>
      <Login {...props} />
    </Router>
  </Provider>,
  mockRouterOptions
);

describe('<Login /> rendering', () => {
  it('should render one <Auth>', () => {
    expect(wrapper.find(Auth).exists()).toBe(true);
  });

  it('should redirect on login success>', () => {
    wrapper.setProps({ children: <Login {...props} success /> });
    expect(wrapper.find('Redirect')).toHaveLength(1);
    expect(wrapper.find(Auth)).toHaveLength(0);
  });
});
