import { client } from '@/service/clients';
import { IPresignedURL } from '@/service/types/Upload';
import { TrackListItem } from '@/service/types/Workspace';
import axios from 'axios';

export const getRequestPresignedUrlTrack = async (
  workroomId: string
): Promise<IPresignedURL> => {
  try {
    const res = await client.get(`/S3/presignedUrl/${workroomId}`);
    return res.data;
  } catch (err: unknown) {
    throw new Error((err as Error).message);
  }
};

export const putUploadTrack = async (
  presignedUrl: string,
  audio: ArrayBuffer
): Promise<string> => {
  try {
    const instance = axios.create({
      baseURL: presignedUrl,
      withCredentials: true,
      headers: {
        'Content-Type': 'audio/mpeg',
      },
    });
    return await instance.put('', audio);
  } catch (err: unknown) {
    throw new Error((err as Error).message);
  }
};

export const deleteFail = async (
  workroomId: string,
  trackUUID: string | null,
  recordUUID: string | null
) => {
  try {
    await client.delete(`/wrok/track/${workroomId}`, {
      data: { trackUUID, recordUUID },
    });
  } catch (err: unknown) {
    throw new Error((err as Error).message);
  }
};

export const postSuccess = async (
  workroomId: string,
  instrument: string,
  order: number,
  trackUUID: string,
  recordUUID: string
): Promise<TrackListItem> => {
  try {
    return await client.post(`/work/track/${workroomId}`, {
      data: { instrument, order, trackUUID, recordUUID },
    });
  } catch (err: unknown) {
    throw new Error((err as Error).message);
  }
};
