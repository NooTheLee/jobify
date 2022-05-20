import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'normalize.css';
import reportWebVitals from './reportWebVitals';

import { AppProvider } from './context/appContext'

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>

  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
