import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { DemoDeck } from './pages/DemoDeck';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DemoDeck />
  </React.StrictMode>
);

