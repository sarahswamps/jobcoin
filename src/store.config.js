import { applyMiddleware, compose, createStore } from 'redux';

import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createHashHistory';
import { makeRootReducer, initReducers } from './reducers.config';
import { initSagas } from './sagas.config';

export const history = createHistory();

export default (initialState = {}) => {
    // ======================================================
    // Middleware Configuration
    // ======================================================
    const sagaMiddleware = createSagaMiddleware();
    const middleware = [sagaMiddleware, thunk, routerMiddleware(history)];

    // // ======================================================
    // // Store Enhancers
    // // ======================================================
    const enhancers = [];
    if (true) {
        const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
        if (typeof devToolsExtension === 'function') {
            enhancers.push(devToolsExtension());
        }
    }

    // // ======================================================
    // // Store Instantiation and HMR Setup
    // // ======================================================
    const store = createStore(makeRootReducer(), initialState, compose(applyMiddleware(...middleware), ...enhancers));

    // // sagaMiddleware.run(sagas)
    store.runSaga = sagaMiddleware.run;
    store.asyncReducers = {};

    // // initializing reducers to store
    initReducers(store);
    initSagas(store);
    return store;
};