import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Optional: your global styles
import App from './App';  // Main App component
import reportWebVitals from './reportWebVitals';  // Optional: performance measurement tool

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
  	<App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log)) or send to an analytics endpoint.
reportWebVitals();

