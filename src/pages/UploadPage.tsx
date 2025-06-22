import React from 'react';
import ClothingUploadForm from '../ui/ClothingUploadForm';
import { Link } from 'react-router-dom';

const UploadPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center py-6 gap-6">
      <h1 className="text-2xl font-bold">Upload Clothing Model</h1>
      <ClothingUploadForm />
      <Link to="/tryon" className="text-blue-600 underline">Back to Try-On</Link>
    </div>
  );
};

export default UploadPage; 