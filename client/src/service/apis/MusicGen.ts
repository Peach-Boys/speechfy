import { client } from '@/service/clients';
import { BasicPresginedURL } from '@/service/types/Upload';
import { AISong, CreateImageResponse } from '@/types/song';

export const getPreviewSongList = async (
  workroomId: string
): Promise<AISong[]> => {
  try {
    const res = await client.get(`/song/ai/${workroomId}`);
    return res.data;
  } catch (err: unknown) {
    throw new Error((err as Error).message);
  }
};

export const postPreviewSong = async (
  workroomId: string,
  songs: AISong
): Promise<void> => {
  try {
    await client.post(`/song/${workroomId}`, songs);
  } catch (err: unknown) {
    throw new Error((err as Error).message);
  }
};

export const getBasicPresginedUrl = async (): Promise<BasicPresginedURL> => {
  try {
    const res = await client.get('/song/basic/presignedUrl');
    return res.data;
  } catch (err: unknown) {
    throw new Error((err as Error).message);
  }
};

export const createImage = async (
  title: string,
  genre: string,
  mood: string
): Promise<CreateImageResponse> => {
  try {
    const res = await client.post('/song/cover', {
      title,
      genre,
      mood,
    });
    return res.data;
  } catch (err: unknown) {
    throw new Error((err as Error).message);
  }
};
