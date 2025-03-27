import { getTracks } from '@/service/apis/Workspace';
import { useQuery } from '@tanstack/react-query';
export const useGetTracks = (workroomId: string) => {
  return useQuery({
    queryKey: ['tracks', workroomId],
    queryFn: () => getTracks(workroomId),
  });
};
