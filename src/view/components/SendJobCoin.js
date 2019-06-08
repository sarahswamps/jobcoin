import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {createStructuredSelector} from "reselect";
import { balanceSelector, addressSelector } from '../../model/JobCoinSelector';
import styles from '../JobCoin.module.css'

export class SendJobCoin extends PureComponent {
    static propTypes = {
        balance: PropTypes.string,
        sendJobCoin: PropTypes.func,
        address: PropTypes.string,
    };
    static defaultProps = {
        balance: '',
        address: '',
    };
    state = {
        toAddress: '',
        amountToSend: '',
    };
    handleToAddress = (event) => {
        this.setState({ toAddress: event.target.value });
    };
    handleAmountToSend = (event) => {
        this.setState({ amountToSend: event.target.value });
    };
    isValid = () => {
        if (isNaN(this.state.amountToSend)) {
            alert('Amount must be a number.')
            return false;
        }
        const amountToSend = parseFloat(this.state.amountToSend);
        const addressAmount = parseFloat(this.props.balance);
        if (amountToSend > addressAmount) {
            alert('Amount is too great.  Please enter a number less than your balance.');
            return false;
        }
        if (this.state.toAddress === '') {
            alert('Please specify the destination address.')
            return false;
        }
        if (this.state.toAddress === this.props.address) {
            alert('It is silly to send Job Coin to yourself!');
            return false;
        }
        return true;
    };
    handleSend = () => {
        if (this.isValid()) {
            this.props.sendJobCoin(this.props.address, this.state.toAddress, parseFloat(this.state.amountToSend));
            this.setState({ toAddress: '', amountToSend: '' });
            alert('Job Coins Sent!')
        }
    }
    render() {
        return (
            <div className={styles.box}>
                <div className={styles.boxTitle}>Send Jobcoin</div>
                <div className={styles.boxBody}>
                    <label>
                        Destination Address:
                        <input type="text" value={this.state.toAddress} onChange={this.handleToAddress} />
                    </label>
                    <label>
                        Amount to Send:
                        <input type="text" value={this.state.amountToSend} onChange={this.handleAmountToSend} />
                    </label>
                    <div className={styles.button} onClick={this.handleSend}>Send Jobcoins</div>
                </div>
            </div>
        )
    }
}

const mapSelectors = createStructuredSelector({
    balance: balanceSelector,
    address: addressSelector,
});

const mapActionCreators = {
    sendJobCoin: (fromAddress, toAddress, amount) => ({
        type: 'SEND_JOB_COIN_TO',
        fromAddress,
        toAddress,
        amount,
    })
};

export default connect(mapSelectors, mapActionCreators) (SendJobCoin);
