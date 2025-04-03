import { client } from '@/service/clients';
import { IShareSong } from '@/types/song';

export const getShareSong = async (songId: number): Promise<IShareSong> => {
  try {
    const res = await client.get(`/song/share/${songId}`);
    return res.data;
  } catch (err: unknown) {
    throw new Error((err as Error).message);
  }
};
