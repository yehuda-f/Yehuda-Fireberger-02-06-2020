import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { CssBaseline, ThemeProvider } from '@material-ui/core';

import './index.css';
import { App } from './App/App';
import { store } from './utils';
import theme from './theme';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline />
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
