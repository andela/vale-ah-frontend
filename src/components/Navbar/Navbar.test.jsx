import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Image, Menu, Button } from 'semantic-ui-react';
import { mount } from 'enzyme';
import Navbar from './Navbar';
import mockRouterOptions from '../../../test/__mocks__/mockRouter';
import { mockStore } from '../../../test/setupTests';

const props = {
  openModal: jest.fn(),
  signIn: {
    isLoggedIn: false,
  },
};

const initState = {
  auth: {
    isLoading: false,
    response: null,
    error: null,
    success: false,
  },
};
const store = mockStore(initState);

const wrapper = mount(
  <Provider store={store}>
    <Router>
      <Navbar {...props} />
    </Router>
  </Provider>,
  mockRouterOptions
);

describe('<Navbar/> rendering', () => {
  it('should render one <Menu>', () => {
    expect(wrapper.find(Menu).exists()).toBe(true);
  });
  it('should render an Image', () => {
    expect(wrapper.find(Image).exists()).toBe(true);
  });
  it('should render Button', () => {
    expect(wrapper.find(Button).hasClass('link')).toBe(true);
  });
  it('should link to  create recipe page if user is logged in', () => {
    const navbar = mount(
      <Provider store={mockStore({ auth: { isLoggedIn: true } })}>
        <Router>
          <Navbar {...props} />
        </Router>
      </Provider>
    );
    expect(
      navbar
        .find('.logout')
        .at(0)
        .text()
    ).toBe('Logout');
  });
});
