import React from 'react';
import ReactDOM from 'react-dom';
//import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Importing BrowserRouter only once
import './assets/css/bootstrap.min.css'; // Import Bootstrap CSS from assets
import './assets/css/now-ui-kit.min.css'; // Import Now UI Kit CSS from assets
import './index.css'; // Your custom global CSS

import App from "./App.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

