import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {createStructuredSelector} from "reselect";
import { balanceSelector } from '../../model/JobCoinSelector';
import styles from '../JobCoin.module.css'

class _JobCoinBalance extends PureComponent {
    static propTypes = {
        balance: PropTypes.string,
    };
    static defaultProps = {
        balance: '',
    }
    render() {
        return (
            <div className={styles.box}>
                <div className={styles.boxTitle}>Balance</div>
                <div className={styles.boxBody}>${this.props.balance}</div>
            </div>
        )
    }
}

const mapSelectors = createStructuredSelector({
    balance: balanceSelector,
});
const mapActionCreators = {
};

export default connect(mapSelectors, mapActionCreators) (_JobCoinBalance);
