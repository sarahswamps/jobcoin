import { Map } from 'immutable';
import { isSignedInSelector, addressSelector, balanceSelector, transactionsSelector, transactionsAsBarChartDataSelector } from './JobCoinSelector';

const transactions = [{
    amount: "50",
    timestamp: "2019-06-08T17:04:16.685Z",
    toAddress: "Sarah",
}, {
    amount: "25",
    fromAddress: "Sarah",
    timestamp: "2019-06-08T17:05:02.090Z",
    toAddress: "Bob",
}];

describe('job coin selectors', () => {
    let fakeState;
    const initialFakeState = { jobcoin: new Map({
        isSignedIn: false,
        address: '',
        transactions: [],
        balance: '0',
    }) };
    describe('testing with data', () => {
        beforeEach(() => {
            fakeState = {
                jobcoin: new Map({
                    isSignedIn: true,
                    address: 'Sarah',
                    balance: '35.42',
                    transactions,
                })
            };
        });
        it('isSignedInSelector should return true', () => {
            expect(isSignedInSelector(fakeState)).toEqual(true);
        });
        it('addressSelector should return Sarah', () => {
            expect(addressSelector(fakeState)).toEqual('Sarah');
        });
        it('addressSelector should return 35.42', () => {
            expect(balanceSelector(fakeState)).toEqual('35.42');
        });
        it('transactionsSelector should return transactions', () => {
            expect(transactionsSelector(fakeState)).toEqual(transactions);
        });
        it('transactionsAsBarChartDataSelector should return data', () => {
            const expected = [{
                date: 'June 8, 2019, 10:04:16 AM',
                shortDate: '6/8/2019',
                amount: '50',
                to: 'Sarah',
                from: undefined,
                initialEntry: true,
            }, {
                date: 'June 8, 2019, 10:05:02 AM',
                shortDate: '6/8/2019',
                amount: '25',
                to: 'Bob',
                from: 'Sarah',
                initialEntry: false,
            }];
            expect(transactionsAsBarChartDataSelector(fakeState)).toEqual(expected);
        });
    });
    describe('testing with no data', () => {
        it('isSignedInSelector should return false', () => {
            expect(isSignedInSelector(initialFakeState)).toEqual(false);
        });
        it('addressSelector should return Sarah', () => {
            expect(addressSelector(initialFakeState)).toEqual('');
        });
        it('addressSelector should return empty string', () => {
            expect(balanceSelector(initialFakeState)).toEqual('0');
        });
        it('transactionsSelector should return transactions', () => {
            expect(transactionsSelector(initialFakeState)).toEqual([]);
        });
        it('transactionsAsBarChartDataSelector should return empty array', () => {
            const expected = [];
            expect(transactionsAsBarChartDataSelector(initialFakeState)).toEqual(expected);
        });
    });
});