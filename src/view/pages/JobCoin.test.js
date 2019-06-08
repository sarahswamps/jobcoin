import React from 'react';
import { shallow } from 'enzyme';
import { JobCoin } from './JobCoin';
import Login from './Login';
import Dashboard from './Dashboard';

describe('JobCoin', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<JobCoin />);
        expect(wrapper.find(Login)).toHaveLength(1);
    });
    it('should render dashboard if isSignedIn', () => {
        const wrapper = shallow(<JobCoin isSignedIn />);
        expect(wrapper.find(Dashboard)).toHaveLength(1);

    })
});
