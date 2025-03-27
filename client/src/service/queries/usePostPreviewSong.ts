import { postPreviewSongList } from '@/service/apis/MusicGen';
import { IPreviewSong } from '@/service/types/MusicGen';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostPreviewSong = (workroomId: string, song: IPreviewSong) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => postPreviewSongList(workroomId, song),
    onSuccess: () => {
      alert('노래가 추가되었습니다.');
      queryClient.invalidateQueries({
        queryKey: ['previewSongList', workroomId],
      });
    },
  });
};
