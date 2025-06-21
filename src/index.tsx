import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import TypingTest from './components/TypingTest';
import WpmChart from './components/WpmChart';

const targetText1 = "This is wonderful, I am exercising to type on a keyboard";
const targetText2 = "C'est formidable, je m'entraîne à dactylographier";
const targetText3 = "Es ist wunderbar, ich trainiere mich auf die Tastatur";
const targetText = targetText2;

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
