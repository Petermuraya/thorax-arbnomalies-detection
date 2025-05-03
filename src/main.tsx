
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Set up the React root with error handling
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root DOM element with id "root" not found.');
}

// Make sure we pass proper types to createRoot
const root = createRoot(rootElement);

// Mount the main App component inside React.StrictMode for highlighting potential problems
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
