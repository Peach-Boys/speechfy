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
