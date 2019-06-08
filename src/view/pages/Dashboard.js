import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {createStructuredSelector} from "reselect";
import JobCoinBalance from '../components/JobCoinBalance';
import JobCoinHistory from '../components/JobCoinHistory';
import SendJobCoin from '../components/SendJobCoin';
import styles from '../JobCoin.module.css'
import { addressSelector } from '../../model/JobCoinSelector';

class _Dashboard extends PureComponent {
    static propTypes = {
        signOff: PropTypes.func,
        address: PropTypes.string,
    };
    static defaultProps = {
        address: '',
    }
    
    signOff = () => this.props.signOff();
    render() {
        return (
            <div className={styles.wrapper}>
                    <div className={styles.header}>
                        <span>JobCoin Sender</span>
                        <div>
                            <span><b>{this.props.address}</b> is signed in</span>
                            <span className={styles.link} onClick={this.signOff}>Sign Out</span>
                        </div>
                    </div>
                    <div className={styles.dashboard}>
                        <div className={styles.leftSide}>
                            <JobCoinBalance />
                            <SendJobCoin />
                        </div>
                        <div className={styles.rightSide}>
                            <JobCoinHistory />
                        </div>
                    </div>

            </div>
        )
    }
}

const mapSelectors = createStructuredSelector({
    address: addressSelector,
});
const mapActionCreators = {
    signOff: () => ({
        type: 'SIGN_OFF',
    })
};

export default connect(mapSelectors, mapActionCreators) (_Dashboard);
