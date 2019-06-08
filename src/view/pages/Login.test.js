import React from 'react';
import { shallow } from 'enzyme';
import { Login } from './Login';

describe('Login', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.find('div.login')).toHaveLength(1);
    });
    it('should call action when submitting', () => {
        const props = {
            signInWithAddress: jest.fn(),
        }
        const wrapper = shallow(<Login {...props} />);
        wrapper.find('.button').simulate('click');
        expect(props.signInWithAddress).toHaveBeenCalled();
    });
    it('should set state when entering text into the input box', () => {
        const sampleText = 'some sample text.';
        const event = { target: { value: sampleText } };
        const wrapper = shallow(<Login />);
        wrapper.instance().handleChange(event);
        expect(wrapper.state('address')).toEqual(sampleText);
    });
});
