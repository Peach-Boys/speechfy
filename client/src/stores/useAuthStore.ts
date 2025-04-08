import { create } from 'zustand';

interface AuthStore {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLogin: false,
  setIsLogin: (value) => set({ isLogin: value }),
}));
