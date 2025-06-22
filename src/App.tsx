import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TryOnPage from './pages/TryOnPage';
import UploadPage from './pages/UploadPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Navigate to="/tryon" replace />} />
        <Route path="/tryon" element={<TryOnPage />} />
        <Route path="/upload" element={<UploadPage />} />
      </Routes>
    </div>
  );
}

export default App; 