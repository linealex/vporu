import { create } from 'zustand';

type Gender = 'male' | 'female';

interface BodyState {
  gender: Gender;
  setGender: (g: Gender) => void;
  height: number;
  setHeight: (h: number) => void;
  weight: number;
  setWeight: (w: number) => void;
}

const useBodyStore = create<BodyState>((set) => ({
  gender: 'male',
  setGender: (gender) => set({ gender }),
  height: 175,
  setHeight: (height) => set({ height }),
  weight: 70,
  setWeight: (weight) => set({ weight }),
}));

export default useBodyStore; 