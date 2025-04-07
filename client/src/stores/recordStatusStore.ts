import { create } from 'zustand';

interface IRecordStatus {
  recordStatus: boolean;
  setRecordStatus: (status: boolean) => void;
}

export const useRecordStatusStore = create<IRecordStatus>((set) => ({
  recordStatus: false,

  setRecordStatus: (status) =>
    set(() => {
      return { recordStatus: status };
    }),
}));
