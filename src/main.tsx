import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Ensure there's a root element to render the app into
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root DOM element with id "root" not found.');
}

// Initialize React 18 root API
const root = createRoot(rootElement);

// Mount the main App component inside React.StrictMode for highlighting potential problems
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
