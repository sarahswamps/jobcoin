import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { connect } from 'react-redux';
import {createStructuredSelector} from "reselect";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import { transactionsAsBarChartDataSelector, addressSelector } from '../../model/JobCoinSelector';
import styles from '../JobCoin.module.css'

function CustomTooltip({ payload, label, active }) {
    if (active) {
        const data = payload && payload[0] ? payload[0].payload : {};
        return data.initialEntry ? (
            <div className={styles.tooltip}>
                {data.to} started account with ${data.amount} on {data.date}
            </div>
        ) : (
            <div className={styles.tooltip}>
                {data.to} was paid ${data.amount} on {data.date} by {data.from}
            </div>
        );
    }
    return null;
}

class _JobCoinHistory extends PureComponent {
    static propTypes = {
        transactions: PropTypes.arrayOf(PropTypes.shape({})),
        address: PropTypes.string,
    };
    static defaultProps = {
        transactions: [],
        address: '',
    }

    renderBarChart = () => {
        return (
            <BarChart width={800} height={300} data={this.props.transactions}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip content={<CustomTooltip />}/>
                <XAxis dataKey="shortDate"/>
                <YAxis/>
                <Tooltip/>
                <Legend />
                <Bar dataKey="amount" fill="#82ca9d" />
            </BarChart>
        );
    }

    render() {
        return (
            <div className={cx(styles.history, styles.box)}>
                <div className={styles.boxTitle}>Transaction History</div>
                <div className={styles.boxBody}>{this.renderBarChart()}</div>
            </div>
        )
    }
}

const mapSelectors = createStructuredSelector({
    transactions: transactionsAsBarChartDataSelector,
    address: addressSelector,
});
const mapActionCreators = {
};

export default connect(mapSelectors, mapActionCreators) (_JobCoinHistory);
