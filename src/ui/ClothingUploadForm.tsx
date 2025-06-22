import React, { useRef, useState } from 'react';

const ClothingUploadForm: React.FC = () => {
  const [productId, setProductId] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    setFile(f || null);
    if (f) setPreviewUrl(URL.createObjectURL(f));
    else setPreviewUrl(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !productId) return;
    // Simulate upload: in real app, save to /public/models/clothes/{productId}.glb
    alert(`Clothing model '${productId}' uploaded! (Simulated)`);
    setProductId('');
    setFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-start w-full max-w-md">
      <label className="block">
        <span className="text-sm font-medium">Product ID</span>
        <input type="text" value={productId} onChange={e => setProductId(e.target.value)} className="border rounded px-2 py-1 w-full" required />
      </label>
      <label className="block">
        <span className="text-sm font-medium">GLB File</span>
        <input type="file" accept=".glb" onChange={handleFileChange} ref={fileInputRef} className="block mt-1" required />
      </label>
      {previewUrl && (
        <div className="w-full">
          <span className="text-xs">Preview:</span>
          <model-viewer src={previewUrl} style={{ width: '100%', height: 200 }} camera-controls auto-rotate />
        </div>
      )}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Upload</button>
    </form>
  );
};

export default ClothingUploadForm; 