import * as ReactDOM from "react-dom/client";
import React from "react";
import hcmutLogo from './assets/images/hcmutlogo.jpg';

const root = ReactDOM.createRoot(
  document.getElementById('app')
);

const logo = <img src={hcmutLogo} alt='HCMUT logo'></img> 
root.render(logo);
