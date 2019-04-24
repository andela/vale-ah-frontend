import React from 'react';
import { mount } from 'enzyme';
import { Header } from 'semantic-ui-react';
import AuthHeader from './AuthHeader';

import SocialButton from '../SocialButton/SocialButton';

/**
 * @returns { object } props, enzymeWrapper
 */
const setup = () => {
  const props = {
    authType: 'Sign up',
    provider: 'Facebook',
  };
  const wrapper = mount(<AuthHeader {...props} />);

  return {
    props,
    wrapper,
  };
};

describe('components', () => {
  describe('AuthHeader', () => {
    it('should render self and subcomponents', () => {
      const { wrapper } = setup();
      expect(wrapper.find('header').hasClass('auth-header')).toBe(true);
      expect(wrapper.find(Header)).toHaveLength(1);
      expect(wrapper.find(SocialButton)).toHaveLength(3);
      const SocialProps = wrapper
        .find(SocialButton)
        .first()
        .props();
      expect(SocialProps.provider).toBe('Facebook');
      expect(SocialProps.authType).toBe('Sign up');
    });

    it('should change social button text', () => {
      const { wrapper } = setup();
      wrapper.setProps({ authType: 'login' });
      expect(wrapper.find('header').hasClass('auth-header')).toBe(true);
      expect(wrapper.find(Header)).toHaveLength(1);
      expect(wrapper.find(SocialButton)).toHaveLength(3);
      const SocialProps = wrapper
        .find(SocialButton)
        .first()
        .props();
      expect(SocialProps.provider).toBe('Facebook');
      expect(SocialProps.authType).toBe('Sign in');
    });
  });
});
