import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './app';
import { Provider } from 'react-redux';
import store from './src/store/store';

const root = ReactDOM.createRoot(document.getElementById('app'));

const element = (
  <Provider store={store}>
    <App />
  </Provider>
);

root.render(element);
