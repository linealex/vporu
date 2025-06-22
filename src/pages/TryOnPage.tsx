import React from 'react';
import TryOnViewer from '../three/TryOnViewer';
import BodySelector from '../ui/BodySelector';
import { Link } from 'react-router-dom';

const TryOnPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center py-6 gap-6">
      <h1 className="text-2xl font-bold">Virtual Try-On</h1>
      <BodySelector />
      <div className="w-full max-w-3xl h-[500px] bg-white rounded shadow">
        <TryOnViewer />
      </div>
      <Link to="/upload" className="text-blue-600 underline">Upload Clothing Model</Link>
    </div>
  );
};

export default TryOnPage; 