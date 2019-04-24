import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import Auth from './Auth';
import { mockStore } from '../../../test/setupTests';

const props = {
  type: 'button',
  color: 'green',
  children: '',
  onClick: jest.fn(),
  register: jest.fn(),
  login: jest.fn(),
  match: {
    params: {
      authType: 'login',
    },
  },
  auth: {
    errors: {},
    isLoading: false,
  },
};

const initialState = {
  auth: {
    errors: {},
    isLoading: false,
  },
};

const store = mockStore(initialState);

const wrapper = mount(
  <Provider store={store}>
    <Router>
      <Auth {...props} />
    </Router>
  </Provider>
);

describe('<Auth/> rendering', () => {
  it('should render without crashing', () => {
    expect(wrapper.find('.auth').exists()).toBe(true);
    expect(wrapper.find('#authForm').exists()).toBe(true);
    expect(wrapper.find('.other-auth').exists()).toBe(true);
    expect(wrapper.find('AuthHeader').exists()).toBe(true);
  });

  it('the social buttons should be rendered with the correct props', () => {
    const SocialButtons = wrapper.find('SocialButton');
    expect(SocialButtons.at(0).props().provider).toEqual('Facebook');
    expect(SocialButtons.at(1).props().provider).toEqual('Google');
    expect(SocialButtons.at(2).props().provider).toEqual('Twitter');
  });

  it('input changes are handled correctly', () => {
    const instance = wrapper.find('AuthComponent').instance();
    const event = {
      target: {
        name: 'email',
        value: 'test@example.com',
      },
    };
    const expectedState = {
      user: {
        username: '',
        confirmPassword: '',
        password: 'password1',
        email: 'test@example.com',
      },
    };

    const EmailInput = wrapper.find('input').at(0);
    EmailInput.simulate('change', event);

    event.target.name = 'password';
    event.target.value = 'password1';

    const PasswordInput = wrapper.find('input').at(1);
    PasswordInput.simulate('change', event);

    expect(instance.state).toEqual(expectedState);
  });

  it('handles form submit correctly', () => {
    const Form = wrapper.find('form');
    const event = { preventDefault: jest.fn() };

    Form.simulate('submit', event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(store.getActions()).toEqual([{ type: 'AUTH_REQUEST' }]);
  });
});
