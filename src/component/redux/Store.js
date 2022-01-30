import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {persistStore} from 'redux-persist';
import reducer from './RootReducer';

const middleware = [
    thunk
];

export const store = createStore(reducer, compose(applyMiddleware(...middleware)));
export const persistedStore = persistStore(store)
