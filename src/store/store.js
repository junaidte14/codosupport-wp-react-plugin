import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

const hostname = window.location.hostname;
const loggerMiddleware = createLogger();
let dynamic_store;
if (hostname === "localhost" || hostname === "127.0.0.1") {
    dynamic_store = createStore(
        rootReducer,
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )
    );
}else{
    dynamic_store = createStore(
        rootReducer,
        applyMiddleware(
            thunkMiddleware
        )
    );
}

export const store = dynamic_store;