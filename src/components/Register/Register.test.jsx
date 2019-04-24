import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import mockRouterOptions from '../../../test/__mocks__/mockRouter';
import Auth from '../Auth/Auth';
import { mockStore } from '../../../test/setupTests';

import Register from './Register';

const initialState = {
  auth: {
    response: {
      user: {
        token: 'rueueuue',
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
  signInUser: jest.fn(),
  registerUser: Promise.resolve({}),
};
const wrapper = mount(
  <Provider store={store}>
    <Router>
      <Register {...props} />
    </Router>
  </Provider>,
  mockRouterOptions
);

describe('<Register /> rendering', () => {
  it('should render one <Auth>', () => {
    expect(wrapper.find(Auth).exists()).toBe(true);
  });

  it('should redirect on register success>', () => {
    wrapper.setProps({ children: <Register {...props} success /> });
    expect(wrapper.find('Redirect')).toHaveLength(1);
    expect(wrapper.find(Auth).exists()).toBe(false);
  });
});
