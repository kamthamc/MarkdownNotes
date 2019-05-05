import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Store from './Store';
import App from './App';
import { createGlobalStyle } from "styled-components";


const GlobalStyle = createGlobalStyle`
  html, body, #app {
    height: 100%;
    margin: 0;
  }
  * {
    box-sizing: border-box;
  }
`;

const store = Store();

const mountNode = document.getElementById("app");

ReactDOM.render((
    <Provider store={store}>
        <Router>
            <App />
        </Router>
        <GlobalStyle />
    </Provider>
), mountNode);
