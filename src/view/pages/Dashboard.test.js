import React from 'react';
import { shallow } from 'enzyme';
import { Dashboard } from './Dashboard';
import JobCoinBalance from '../components/JobCoinBalance';
import SendJobCoin from '../components/SendJobCoin';
import JobCoinHistory from '../components/JobCoinHistory';

describe('Dashboard', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<Dashboard />);
        expect(wrapper.find('.wrapper')).toHaveLength(1);
    });
    it('should render header', () => {
        const wrapper = shallow(<Dashboard />);
        expect(wrapper.find('.header')).toHaveLength(1);
    });
    it('should render job coin balance component', () => {
        const wrapper = shallow(<Dashboard />);
        expect(wrapper.find(JobCoinBalance)).toHaveLength(1);
    });
    it('should render send job coin component', () => {
        const wrapper = shallow(<Dashboard />);
        expect(wrapper.find(SendJobCoin)).toHaveLength(1);
    });
    it('should render history component', () => {
        const wrapper = shallow(<Dashboard />);
        expect(wrapper.find(JobCoinHistory)).toHaveLength(1);
    });
});
