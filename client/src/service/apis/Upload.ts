import { client } from '@/service/clients';
import { IPresignedURL } from '@/service/types/Upload';
import { TrackListItem } from '@/service/types/Workspace';

export const getRequestPresignedUrlTrack = async (
  workroomId: string
): Promise<IPresignedURL> => {
  try {
    return await client.post(`/S3/presignedUrl/${workroomId}`);
  } catch (err: unknown) {
    throw new Error((err as Error).message);
  }
};

export const putUploadTrack = async (
  presignedUrl: string,
  audio: string
): Promise<string> => {
  try {
    return await client.put(`/${presignedUrl}`, audio);
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
  instrumentId: number,
  order: number,
  trackUUID: string,
  recordUUID: string
): Promise<TrackListItem> => {
  try {
    return await client.post(`/work/track/${workroomId}`, {
      data: { instrumentId, order, trackUUID, recordUUID },
    });
  } catch (err: unknown) {
    throw new Error((err as Error).message);
  }
};
