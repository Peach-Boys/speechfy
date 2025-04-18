import { client } from '@/service/clients';
import { IBasicResponse, IPreviewSong } from '@/service/types/MusicGen';
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
  songs: IPreviewSong
): Promise<IBasicResponse> => {
  try {
    const res = await client.post(
      `song/studios/${workroomId}/basic/save`,
      songs
    );
    return res.data;
  } catch (err: unknown) {
    throw new Error((err as Error).message);
  }
};

export const postAIRequest = async (workroomId: string, songId: string) => {
  try {
    await client.post(`song/studios/${workroomId}/ai`, { basicSongId: songId });
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
