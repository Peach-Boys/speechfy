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

export const deleteWorkroom = async (studioId: number): Promise<void> => {
  try {
    await client.delete(`/work/studio/${studioId}`);
  } catch (err: unknown) {
    throw new Error((err as Error).message);
  }
};

export const deleteCompletedSong = async (songId: number): Promise<void> => {
  try {
    await client.delete(`/song/download/${songId}`);
  } catch (err: unknown) {
    throw new Error((err as Error).message);
  }
};
