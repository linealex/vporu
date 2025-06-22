import React from 'react';
import useBodyStore from '../zustand/useBodyStore';

const BodySelector: React.FC = () => {
  const { gender, setGender, height, setHeight, weight, setWeight } = useBodyStore();

  return (
    <div className="flex gap-4 items-end">
      <div>
        <label className="block text-sm font-medium">Gender</label>
        <select value={gender} onChange={e => setGender(e.target.value as 'male' | 'female')} className="border rounded px-2 py-1">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Height (cm)</label>
        <input type="number" value={height} min={140} max={210} onChange={e => setHeight(Number(e.target.value))} className="border rounded px-2 py-1 w-20" />
      </div>
      <div>
        <label className="block text-sm font-medium">Weight (kg)</label>
        <input type="number" value={weight} min={40} max={150} onChange={e => setWeight(Number(e.target.value))} className="border rounded px-2 py-1 w-20" />
      </div>
    </div>
  );
};

export default BodySelector; 