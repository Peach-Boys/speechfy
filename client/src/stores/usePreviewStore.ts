import { AISong } from '@/types/song';
import { create } from 'zustand';

interface PreviewStore {
  previewSongList: AISong[];
  addPreviewSong: (song: AISong) => void;
  setPreviewSongList: (songs: AISong[]) => void;
}

export const usePreviewStore = create<PreviewStore>((set) => ({
  previewSongList: [],
  addPreviewSong: (song) =>
    set((state) => ({
      previewSongList: [...state.previewSongList, song],
    })),
  setPreviewSongList: (songs) => set({ previewSongList: songs }),
}));
