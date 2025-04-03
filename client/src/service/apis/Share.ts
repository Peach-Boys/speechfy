import { client } from '@/service/clients';
import { IShareSong } from '@/types/song';

export const getShareSong = async (songId: number): Promise<IShareSong> => {
  try {
    console.log('songId 요청:', songId);
    const res = await client.get(`/song/share/${songId}`);
    console.log('res:', res.data);
    return res.data;
  } catch (err: unknown) {
    throw new Error((err as Error).message);
  }
};
