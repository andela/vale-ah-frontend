import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Modal, Button } from 'semantic-ui-react';
import { mount } from 'enzyme';
import store from '../../store/store';
import Navbar from '../../components/Navbar/Navbar';
import Banner from '../../components/Banner/Banner';
import Home from './Home';

const props = {
  openModal: jest.fn(),
  closeModal: jest.fn(),
  signIn: jest.fn(),
  path: '/:authType(login|register)?',
  loginSuccess: 'success',
  match: {
    params: { authType: '/' },
  },
  history: {
    push: jest.fn(),
  },
};

// eslint-disable-next-line require-jsdoc
const mountComponent = (newProps = {}) => {
  const properties = {
    ...props,
    ...newProps,
  };
  return mount(
    <Provider store={store}>
      <Router>
        <Home {...properties} />
      </Router>
    </Provider>
  );
};

const wrapper = mountComponent();
describe('<Home/> rendering', () => {
  it('should render one <Navbar>', () => {
    expect(wrapper.find(Navbar)).toHaveLength(1);
  });
  it('should render one <Banner>', () => {
    expect(wrapper.find(Banner)).toHaveLength(1);
  });
  it('should render one <Modal>', () => {
    expect(wrapper.find(Modal)).toHaveLength(1);
  });

  it('should close login modal on close button click>', () => {
    const component = wrapper.find('Home');
    const addReceipeButton = component.find(Button).at(1);
    addReceipeButton.simulate('click');
    expect(component.instance().state.modalOpened).toBe(true);
    const closeModal = component.find('.close.icon');
    closeModal.simulate('click');
    expect(component.instance().state.modalOpened).toBe(false);
  });

  it('should open login modal>', () => {
    const component = wrapper.find('Home');
    const addReceipeButton = component.find(Button).at(1);
    addReceipeButton.simulate('click');
    expect(component.instance().state.modalOpened).toBe(true);
  });

  it('should open register modal>', () => {
    const homeWrapper = mountComponent({
      match: {
        params: { authType: 'register' },
      },
    });
    const component = homeWrapper.find('Register');
    expect(component).toHaveLength(1);
  });
});
