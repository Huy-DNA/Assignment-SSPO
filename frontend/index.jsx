import ReactDOM from 'react-dom/client';
import React from 'react';
import { Provider } from 'react-redux';
import App from './app';
import store from './src/store/store';

const root = ReactDOM.createRoot(document.getElementById('app'));

const element = (
  <Provider store={store}>
    <App />
  </Provider>
);

root.render(element);
