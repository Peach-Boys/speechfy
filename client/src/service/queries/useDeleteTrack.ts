import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTrack } from '../apis/Workspace';

export const useDeleteTrack = (trackId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteTrack(trackId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tracks'] });
    },
  });
};
