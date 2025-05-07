import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import RosterPage from './components/RosterPage';
import LineupPage from './components/LineupPage';
import { PlayerProvider } from './context/PlayerContext';
import './styles/application.css';

function App() {
  return (
    <PlayerProvider>
      <Router>
        <div className="app-container">
          <Header />
          <div className="content-container">
            <Routes>
              <Route path="/" element={<RosterPage />} />
              <Route path="/lineup" element={<LineupPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </PlayerProvider>
  );
}

export default App;