import { getTracks } from '@/service/apis/Workspace';
import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import { StudioData } from '../types/Workspace';
export const useGetTracks = (
  workroomId: string
): UseQueryResult<StudioData, Error> => {
  return useQuery<StudioData, Error>({
    queryKey: ['tracks', workroomId],
    queryFn: () => getTracks(workroomId),
  });
};
