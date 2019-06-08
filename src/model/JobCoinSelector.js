import { createSelector } from 'reselect';
const dateOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };

export const jobCoinSelector = state => state.jobcoin;
export const isSignedInSelector = createSelector(
    jobCoinSelector, jobcoin => jobcoin.get('isSignedIn')
);
export const addressSelector = createSelector(
    jobCoinSelector, jobcoin => jobcoin.get('address')
);
export const balanceSelector = createSelector(
    jobCoinSelector, jobcoin => jobcoin.get('balance')
);
export const transactionsSelector = createSelector(
    jobCoinSelector, jobcoin => jobcoin.get('transactions')
);
export const transactionsAsBarChartDataSelector = createSelector(
    transactionsSelector, transactions => {
        const data = [];
        transactions.forEach(transaction => {
            data.push({
                date: (new Date(transaction.timestamp)).toLocaleDateString('en-US', dateOptions),
                amount: transaction.amount,
                to: transaction.toAddress,
                from: transaction.fromAddress,
                initialEntry: !(!!transaction.fromAddress),
            })
        });
        return data;
    }
)
