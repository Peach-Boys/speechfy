import { client } from '@/service/clients';
import { IPreviewSong } from '@/service/types/MusicGen';
import { IPreviewSongList } from '@/types/song';

export const getPreviewSongList = async (
  workroomId: string
): Promise<IPreviewSongList> => {
  try {
    const res = await client.get(`/song/${workroomId}`);
    return res.data;
  } catch (err: unknown) {
    throw new Error((err as Error).message);
  }
};

export const postPreviewSongList = async (
  workroomId: string,
  songs: IPreviewSong
): Promise<IPreviewSong> => {
  try {
    const res = await client.post(`/song/${workroomId}`, songs);
    return res.data;
  } catch (err: unknown) {
    throw new Error((err as Error).message);
  }
};
