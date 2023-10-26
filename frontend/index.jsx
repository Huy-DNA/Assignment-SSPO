import * as ReactDOM from "react-dom/client";
import React from "react";
import App from './app';
// import hcmutLogo from './assets/images/hcmutlogo.jpg';

const root = ReactDOM.createRoot(
  document.getElementById('app')
);

const element = <App />;/*<img src={hcmutLogo} alt='HCMUT logo'></img>*/
root.render(element);
