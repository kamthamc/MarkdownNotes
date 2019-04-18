import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';


import rootReducer from './Reducers/';
import {App} from './App';

const store = createStore(rootReducer);

const mountNode = document.getElementById("app");

ReactDOM.render((
    <Provider store={store}>
        <App name="jane" />
    </Provider>
), mountNode);
