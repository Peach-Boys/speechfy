import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteWorkroom } from '../apis/MyPage';

export const useDeleteWorkroom = (studioId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteWorkroom(studioId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workroomList'] });
    },
  });
};
