/* eslint-disable */
import { fork, take } from 'redux-saga/effects';

export default function*(getState) {
    yield fork(null, getState);
}
export function injectSagas(store, sagas) {
    sagas.map(store.runSaga);
}
// adding all sagas at startup time
export const initSagas = store => {
    // inject sagas to store
    injectSagas(store, require('./model/JobCoinSaga').default);
};
