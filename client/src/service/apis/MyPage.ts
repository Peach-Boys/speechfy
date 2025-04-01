import { client } from '@/service/clients';
import { WorkroomList } from '@/service/types/Workspace';

export const getWorkrommList = async (): Promise<WorkroomList[]> => {
  try {
    const res = await client.get('/work/studio');
    return res.data;
  } catch (err: unknown) {
    throw new Error((err as Error).message);
  }
};
