import { IShareSong } from '@/types/song';
import axios from 'axios';
const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
export const getShareSong = async (songId: number): Promise<IShareSong> => {
  try {
    const res = await axios.get(`${API_BASE}/song/share/${songId}`);
    return res.data;
  } catch (err: unknown) {
    throw new Error((err as Error).message);
  }
};
