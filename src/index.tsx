import 'typeface-roboto';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Store from './Store';
import App from './App';
import { createGlobalStyle } from "styled-components";


const GlobalStyle = createGlobalStyle`

  @import 'https://fonts.googleapis.com/css?family=Fira+Sans:300,300i,400,400i,500,500i,700,700i&subset=latin-ext';
  @import 'https://fonts.googleapis.com/css?family=Roboto+Mono:300,400&subset=latin-ext';
  @import 'https://cdnjs.cloudflare.com/ajax/libs/normalize/4.2.0/normalize.min.css';

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
