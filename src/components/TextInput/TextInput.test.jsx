import React from 'react';
import { shallow } from 'enzyme';
import TextInput from './TextInput';

/**
 * @returns { object } props, wrapper
 */
const setup = () => {
  const props = {
    name: 'name',
    type: 'type',
    value: 'value',
    placeholder: 'placeholder',
    classNames: 'txt-field',
    onChange: jest.fn(),
    errorExists: () => ({
      name: ['name is required'],
    }),
    errors: {
      name: ['name is required'],
    },
  };
  const wrapper = shallow(<TextInput {...props} />);

  return {
    props,
    wrapper,
  };
};

describe('components', () => {
  describe('TextInput', () => {
    it('should render self and subcomponents', () => {
      const { wrapper } = setup();
      expect(wrapper.find('Fragment').exists()).toBe(true);
      const InputProps = wrapper.find('input').props();
      expect(InputProps.value).toBe('value');
      expect(InputProps.placeholder).toBe('placeholder');
      expect(InputProps.classNames).toBe('txt-field');
    });

    it('should render self and subcomponents', () => {
      const { wrapper } = setup();
      expect(wrapper.find('Fragment')).toHaveLength(1);
      const InputProps = wrapper.find('input').props();
      expect(InputProps.value).toBe('value');
      expect(InputProps.placeholder).toBe('placeholder');
    });
  });
});
