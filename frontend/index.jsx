import ReactDOM from 'react-dom';
import React from 'react';
import App from './app';
import GlobalStyles from './src/GlobalStyles/GlobalStyles';

const root = ReactDOM.createRoot(document.getElementById('app'));

const element = (
  <GlobalStyles>
    <App />
  </GlobalStyles>
);

root.render(element);
