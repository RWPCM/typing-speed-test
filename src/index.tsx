import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import TypingTest from './components/TypingTest';
import WpmChart from './components/WpmChart';
import { TEXT_OPTIONS } from './config/textOptions';

// Select a random text option
const targetText = TEXT_OPTIONS[Math.floor(Math.random() * TEXT_OPTIONS.length)];

const rootElement = document.getElementById('root') as HTMLElement;
if (!rootElement) {
  throw new Error('Failed to find root element');
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Router>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<TypingTest targetText={targetText} />} />
          <Route path="/history" element={<WpmChart />} />
        </Routes>
      </div>
    </Router>
  </React.StrictMode>
);
