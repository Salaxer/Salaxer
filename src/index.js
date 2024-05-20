import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';

import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');

// Crea un root
const root = createRoot(container);

// Rendering tu aplicación dentro del root
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
