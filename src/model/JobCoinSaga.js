import { call, put, takeEvery} from 'redux-saga/effects';

function* signInAddress(payload) {
    try {
        const header = {
            method: "GET",
            headers: {
                Accept: 'application/json'
            }
        };
        const url = `http://jobcoin.gemini.com/upheaval/api/addresses/${payload.address}`;
        const getAddressesResponse = yield call(fetch, url,header);
        const addressData = yield getAddressesResponse.json();
        if (addressData.balance === '0' && addressData.transactions.length === 0) {
            alert('This user does not exist.')
        } else {
            yield put({type: "LOAD_ADDRESS_DATA", addressData, address: payload.address});
        }
    } catch (error) {
        console.log("yay", error);
    }
}

function* sendJobCoinTo(payload) {
    try {
        const { fromAddress, toAddress, amount } = payload;
        const args = `?fromAddress=${fromAddress}&toAddress=${toAddress}&amount=${amount}`;
        const header = {
            method: "POST",
            headers: {
                Accept: 'application/json'
            },
        };
        const url = `http://jobcoin.gemini.com/upheaval/api/transactions${args}`;
        const getSendJobCoinToResponse = yield call(fetch, url, header);
        const jobCoinResponse = yield getSendJobCoinToResponse.json();
        if (jobCoinResponse.status === 'OK') {
            yield put({type: 'SIGN_IN', address: fromAddress })
        } else {
            alert(`Error: ${jobCoinResponse.status}`);
        }
    } catch (error) {
        console.log("yay", error);
    }
}

export function* jobCoinSaga() {
    yield takeEvery('SIGN_IN', signInAddress)
    yield takeEvery('SEND_JOB_COIN_TO', sendJobCoinTo)
}

export default [jobCoinSaga]