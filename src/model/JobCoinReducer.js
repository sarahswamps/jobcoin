import { Map } from 'immutable';

const initialState = Map({
    isSignedIn: false,
    address: '',
    transactions: [],
    balance: 0,
});

const ACTION_HANDLERS = {
    'LOAD_ADDRESS_DATA': (state, action) => state.set('address', action.address)
        .set('transactions', action.addressData.transactions)
        .set('balance', action.addressData.balance)
        .set('isSignedIn', true),
    'SIGN_OFF': (state) => state.set('address', '')
        .set('transactions', [])
        .set('balance', 0)
        .set('isSignedIn', false),
};

function reducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}

export default reducer;
