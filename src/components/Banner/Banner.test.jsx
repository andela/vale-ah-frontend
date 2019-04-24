import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { mount } from 'enzyme';
import Banner from './Banner';
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
      <Banner {...props} />
    </Router>
  </Provider>,
  mockRouterOptions
);

describe('<Banner/> rendering', () => {
  it('should render one <Button>', () => {
    const button = wrapper.find(Button);
    expect(button.exists()).toBe(true);
    expect(button.props().to).toBe('/register');
  });

  it('Button should link to create recipe page if user is logged in', () => {
    const banner = mount(
      <Provider store={mockStore({ auth: { isLoggedIn: true } })}>
        <Router>
          <Banner {...props} />
        </Router>
      </Provider>,
      mockRouterOptions
    );
    expect(banner.find(Button).props().to).toBe('/recipes/create');
  });

  it('should render a h1', () => {
    expect(wrapper.find('h1').exists()).toBe(true);
  });
});
