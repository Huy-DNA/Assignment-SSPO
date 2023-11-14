import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './app';
import GlobalStyles from './src/globalStyles/GlobalStyles';

const root = ReactDOM.createRoot(document.getElementById('app'));

const element = (
  <GlobalStyles>
    <App />
  </GlobalStyles>
);

root.render(element);
