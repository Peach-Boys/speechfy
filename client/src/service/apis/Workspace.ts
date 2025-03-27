import { client } from '@/service/clients';
import { StudioData } from '@/service/types/Workspace';

export const getTracks = async (workroomId: string): Promise<StudioData> => {
  try {
    const res = await client.get(`/work/studio/${workroomId}`);
    return res.data;
  } catch (err: unknown) {
    throw new Error((err as Error).message);
  }
};

export const deleteTrack = async (trackId: number): Promise<void> => {
  try {
    await client.delete(`/work/track/${trackId}`);
  } catch (err: unknown) {
    throw new Error((err as Error).message);
  }
};

export const updateTrack = async (
  workId: number,
  track: number,
  order: number,
  trackName: string
): Promise<void> => {
  try {
    await client.put(`/work/studio/${workId}`, {
      track: track,
      order: order,
      trackName: trackName,
    });
  } catch (err: unknown) {
    throw new Error((err as Error).message);
  }
};

export const deleteAllTrack = async (workId: string): Promise<void> => {
  try {
    await client.delete(`/work/studio/${workId}`);
  } catch (err: unknown) {
    throw new Error((err as Error).message);
  }
};
