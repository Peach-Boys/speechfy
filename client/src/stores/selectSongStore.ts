import { IPreviewSong } from '@/types/song';
import { create } from 'zustand';

interface ISelectSong {
  selectSong: IPreviewSong | null;
  setSelectSong: (song: IPreviewSong) => void;
}

export const useSelectSongStore = create<ISelectSong>((set, get) => ({
  selectSong: null,
  setSelectSong: (song) => {
    const current = get().selectSong;
    if (current && current.songId === song.songId) {
      set({ selectSong: null });
    } else {
      set({ selectSong: song });
    }
  },
}));
