import { client } from '@/service/clients';
import { ICompletedSong, IWorkroom } from '@/service/types/MyPage';

export const getWorkrommList = async (): Promise<IWorkroom[]> => {
  try {
    const res = await client.get('/work/studio');
    return res.data;
  } catch (err: unknown) {
    throw new Error((err as Error).message);
  }
};

export const getCompletedSongList = async (): Promise<ICompletedSong[]> => {
  try {
    const res = await client.get('/song');
    return res.data;
  } catch (err: unknown) {
    throw new Error((err as Error).message);
  }
};
