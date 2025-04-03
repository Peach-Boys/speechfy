import { client } from '@/service/clients';
import { INSTRUMENT_TYPE, StudioData } from '@/service/types/Workspace';
import { CreateResponse } from '@/types/workroom';

export const postCreateWorkroom = async (
  studioName: string
): Promise<CreateResponse> => {
  try {
    const res = await client.post('/work/studio', { studioName: studioName });
    return res.data;
  } catch (err: unknown) {
    throw new Error((err as Error).message);
  }
};

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
  workId: string,
  tracks: {
    track: number;
    order: number;
    trackName: string;
  }[]
): Promise<void> => {
  try {
    await client.put(`/work/studio/${workId}`, {
      tracks,
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

export const postChangeInstrument = async (
  recordId: number,
  instrumentType: INSTRUMENT_TYPE
): Promise<void> => {
  try {
    await client.post(`/ddsp`, {
      recordId: recordId,
      instrumentType: instrumentType,
    });
  } catch (err: unknown) {
    throw new Error((err as Error).message);
  }
};
