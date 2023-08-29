import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk'
import { WaiterAppData, RequestData, RequestClearanceData } from './Waiter redux elements/reducers';
import { ChefAppData } from './Chef redux elements/reducer';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const Logger = createLogger();
const rootReducer = combineReducers({WaiterAppData, RequestData, RequestClearanceData, ChefAppData})
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, Logger))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
