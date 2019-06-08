/* eslint-disable */
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

const extendedRouterReducer = (state, action) => {
    switch (action.type) {
        default:
            return router(state, action);
    }
};

export const makeRootReducer = asyncReducers =>
    combineReducers({
        // <- Mounted at modals.
        // Add sync reducers here
        router: extendedRouterReducer,
        ...asyncReducers,
    });

// injecting reducer dynamically
export const injectReducer = (store, { key, reducer }) => {
    store.asyncReducers[key] = reducer;
    store.replaceReducer(makeRootReducer(store.asyncReducers));
};

// adding all reducers at startup time
export const initReducers = store => {
    // inject reducers to store
    injectReducer(store, { key: "jobcoin", reducer: require('./model/JobCoinReducer').default });
    // injectReducer(store, { key: 'user', reducer: require('./auth/reducer').default });
};

export default makeRootReducer;