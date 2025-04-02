import { ITrack } from '@/types/track';
import { create } from 'zustand';

interface IWorkRoomStatus {
  tracks: ITrack[];
  setTracks: (tracks: ITrack[]) => void;
}

export const useWorkRoomStore = create<IWorkRoomStatus>((set) => ({
  tracks: [],

  setTracks: (status: ITrack[]) =>
    set(() => {
      return { tracks: status };
    }),
}));
