import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {createStructuredSelector} from "reselect";
import { isSignedInSelector } from '../../model/JobCoinSelector';
import Dashboard from './Dashboard';
import Login from './Login';

export class JobCoin extends PureComponent {
    static propTypes = {
        isSignedIn: PropTypes.bool,
    };
    static defaultProps = {
        isSignedIn: false,
    }
    render() {
        return this.props.isSignedIn ? <Dashboard /> : <Login />
    }
}

const mapSelectors = createStructuredSelector({
    isSignedIn: isSignedInSelector,
});
const mapActionCreators = {
};

export default connect(mapSelectors, mapActionCreators) (JobCoin);
