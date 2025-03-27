import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteAllTrack } from '../apis/Workspace';

export const useDeleteAllTrack = (workId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteAllTrack(workId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tracks'] });
    },
  });
};
