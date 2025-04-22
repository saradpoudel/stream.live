import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import MatchDetail from './components/MatchDetail';  // Import MatchDetail
import ErrorBoundary from './components/ErrorBoundary';  // Import ErrorBoundary

import './index.css';  // Tailwind CSS

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/match/:matchId" element={<MatchDetail />} /> {/* Match Detail page route */}
        </Routes>
      </ErrorBoundary>
    </Router>
  </React.StrictMode>
);