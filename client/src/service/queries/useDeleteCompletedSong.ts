import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCompletedSong } from '../apis/MyPage';

export const useDeleteCompletedSong = (songId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteCompletedSong(songId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['completeSongList'] });
    },
  });
};
