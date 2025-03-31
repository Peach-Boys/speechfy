import { client } from '@/service/clients';
import { TrackListItem } from '@/service/types/Workspace';

export const getRequestPresignedUrlTrack = async (
  uploadType: string
): Promise<string> => {
  try {
    return await client.post(`/S3/${uploadType}`);
  } catch (err: unknown) {
    throw new Error((err as Error).message);
  }
};

export const putUploadTrack = async (
  presignedUrl: string,
  uploadType: string,
  audio: string
): Promise<string> => {
  try {
    return await client.put(`/${presignedUrl}/${uploadType}`, audio);
  } catch (err: unknown) {
    throw new Error((err as Error).message);
  }
};

export const postSuccess = async (
  presignedUrl: string
): Promise<TrackListItem> => {
  try {
    return await client.post(`/work/check/`, presignedUrl);
  } catch (err: unknown) {
    throw new Error((err as Error).message);
  }
};
