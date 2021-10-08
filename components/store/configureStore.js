import { createWrapper } from 'next-redux-wrapper';
import { createStore, combineReducers } from 'redux';
import reducer from "./reducer/index";
import { composeWithDevTools } from "redux-devtools-extension"
import { persistStore } from 'redux-persist';

function configureStore() {
    const store = createStore(reducer, composeWithDevTools());
    store.__persistor = persistStore(store);
    return store;
}

const wrapper = createWrapper(configureStore, {
    // debug: process.env.NODE_ENV === 'dev'
});

export default wrapper;