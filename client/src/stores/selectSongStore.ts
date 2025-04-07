import { AISong } from '@/types/song';
import { create } from 'zustand';

interface ISelectSong {
  selectSong: AISong | null;
  setSelectSong: (song: AISong) => void;
}

export const useSelectSongStore = create<ISelectSong>((set, get) => ({
  selectSong: null,
  setSelectSong: (song) => {
    const current = get().selectSong;
    if (current && current.aiSongId === song.aiSongId) {
      set({ selectSong: null });
    } else {
      set({ selectSong: song });
    }
  },
}));
