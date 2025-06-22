import React, { useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import useBodyStore from '../zustand/useBodyStore';
import { useLocation } from 'react-router-dom';

function getAvatarPath(gender: string, height: number) {
  return `/models/avatars/${gender}_${height}.glb`;
}
function getClothingPath(product: string) {
  return `/models/clothes/${product}.glb`;
}

const AvatarModel: React.FC<{ url: string }> = ({ url }) => {
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { scene } = useGLTF(url);
    return <primitive object={scene} />;
  } catch {
    return <group />;
  }
};

const ClothingModel: React.FC<{
  url: string;
  scale: number;
  offset: [number, number, number];
}> = ({ url, scale, offset }) => {
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { scene } = useGLTF(url);
    return <primitive object={scene} scale={scale} position={offset} />;
  } catch {
    return <group />;
  }
};

const TryOnViewer: React.FC = () => {
  const { gender, height } = useBodyStore();
  const location = useLocation();
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const product = params.get('product') || 'tshirt';

  const avatarUrl = getAvatarPath(gender, height);
  const clothingUrl = getClothingPath(product);

  // Manual clothing adjustment state
  const [clothingScale, setClothingScale] = useState(1);
  const [clothingOffset, setClothingOffset] = useState<[number, number, number]>([0, 0, 0]);

  // Fallback state
  const [avatarError, setAvatarError] = useState(false);
  const [clothingError, setClothingError] = useState(false);

  // Custom loader with error handling
  const SafeAvatar = () => {
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { scene } = useGLTF(avatarUrl);
      return <primitive object={scene} />;
    } catch {
      setAvatarError(true);
      return null;
    }
  };
  const SafeClothing = () => {
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { scene } = useGLTF(clothingUrl);
      return <primitive object={scene} scale={clothingScale} position={clothingOffset} />;
    } catch {
      setClothingError(true);
      return null;
    }
  };

  return (
    <div className="relative w-full h-full">
      {/* Fallback overlays */}
      {avatarError && (
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div className="bg-white bg-opacity-90 p-4 rounded shadow text-red-600 text-lg font-bold">Avatar not found</div>
        </div>
      )}
      {clothingError && (
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div className="bg-white bg-opacity-90 p-4 rounded shadow text-orange-600 text-lg font-bold">Clothing model missing</div>
        </div>
      )}
      <div className="absolute top-2 left-2 z-10 bg-white bg-opacity-80 p-2 rounded shadow flex gap-2 items-center">
        <label className="text-xs">Clothing Scale
          <input type="range" min={0.8} max={1.2} step={0.01} value={clothingScale} onChange={e => setClothingScale(Number(e.target.value))} className="mx-2" />
        </label>
        <label className="text-xs">X
          <input type="number" value={clothingOffset[0]} step={0.01} onChange={e => setClothingOffset([Number(e.target.value), clothingOffset[1], clothingOffset[2]])} className="w-12 mx-1" />
        </label>
        <label className="text-xs">Y
          <input type="number" value={clothingOffset[1]} step={0.01} onChange={e => setClothingOffset([clothingOffset[0], Number(e.target.value), clothingOffset[2]])} className="w-12 mx-1" />
        </label>
        <label className="text-xs">Z
          <input type="number" value={clothingOffset[2]} step={0.01} onChange={e => setClothingOffset([clothingOffset[0], clothingOffset[1], Number(e.target.value)])} className="w-12 mx-1" />
        </label>
      </div>
      <Canvas camera={{ position: [0, 1.5, 3] }} className="w-full h-full">
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 7]} intensity={0.7} />
        {/* Avatar */}
        {!avatarError ? <SafeAvatar /> : null}
        {/* Clothing */}
        {!clothingError ? <SafeClothing /> : null}
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default TryOnViewer; 