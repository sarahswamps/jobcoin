import React from 'react';
import { shallow } from 'enzyme';
import { SendJobCoin } from './SendJobCoin';

describe('SendJobCoin', () => {
    let wrapper;
    let props;
    beforeEach(() => {
        jest.spyOn(window, 'alert').mockImplementation(() => {});
        props = {
            balance: '35',
            address: 'sarah',
            sendJobCoin: jest.fn(),
        };
        wrapper = shallow(<SendJobCoin {...props} />);
    });
    it('renders without crashing', () => {
        expect(wrapper.find('div.box')).toHaveLength(1);
    });
    it('should validate input with no input and return false', () => {
        expect(wrapper.instance().isValid()).toEqual(false);
    });
    it('isValid should return false if amountToSend is not a number', () => {
        wrapper.setState({ amountToSend: 'some text' });
        expect(wrapper.instance().isValid()).toEqual(false);
    });
    it('isValid should return false if amountToSend is not a number', () => {
        wrapper.setState({ amountToSend: '54' });
        expect(wrapper.instance().isValid()).toEqual(false);
    });
    it('isValid should return false if amountToSend is not a number', () => {
        wrapper.setState({ toAddress: '' });
        expect(wrapper.instance().isValid()).toEqual(false);
    });
    it('isValid should return false if amountToSend is not a number', () => {
        wrapper.setState({ toAddress: 'sarah' });
        expect(wrapper.instance().isValid()).toEqual(false);
    });
    it('isValid should return true if amountToSend is not a number', () => {
        wrapper.setState({
             toAddress: 'joe',
             amountToSend: '25',
        });
        expect(wrapper.instance().isValid()).toEqual(true);
    });
    it('should call action on button click with valid input', () => {
        wrapper.setState({
            toAddress: 'joe',
            amountToSend: '25',
       });
        wrapper.find('.button').simulate('click');
        expect(props.sendJobCoin).toHaveBeenCalled();
    });
    it('should not call action on button click with invalid input', () => {
        wrapper.setState({
            toAddress: 'sarah',
            amountToSend: 'sarah',
       });
        wrapper.find('.button').simulate('click');
        expect(props.sendJobCoin).not.toHaveBeenCalled();
    });
});
