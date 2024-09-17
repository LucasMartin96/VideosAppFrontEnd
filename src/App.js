// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import VideoListPage from './pages/VideoListPage';
import VideoViewPage from './pages/VideoViewPage';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/list" element={<VideoListPage />} />
        <Route path="/view" element={<VideoViewPage />} />
      </Routes>
    </Router>
  );
};

export default App;
