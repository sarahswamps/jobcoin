import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {createStructuredSelector} from "reselect";
import { isSignedInSelector } from '../../model/JobCoinSelector';
import Dashboard from './Dashboard';
import Login from './Login';

class _Login extends PureComponent {
    static propTypes = {
        isSignedIn: PropTypes.bool,
    };
    render() {
        return this.props.isSignedIn ? <Dashboard /> : <Login />
    }
}

const mapSelectors = createStructuredSelector({
    isSignedIn: isSignedInSelector,
});
const mapActionCreators = {
};

export default connect(mapSelectors, mapActionCreators) (_Login);
