import { getBasicPresginedUrl, postPreviewSong } from '@/service/apis/MusicGen';
import { putUploadTrack } from '@/service/apis/Upload';
import { AISong } from '@/types/song';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Props {
  mergedAudio: ArrayBuffer;
}

export const usePostPreviewSong = (workroomId: string, song: AISong) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ mergedAudio }: Props) => {
      const res = await getBasicPresginedUrl();

      try {
        await putUploadTrack(res.basicSongPresignedUrl, mergedAudio);
      } catch (err: unknown) {
        throw new Error((err as Error).message);
      }
      return postPreviewSong(workroomId, song);
    },
    onSuccess: () => {
      alert('노래가 추가되었습니다.');
      queryClient.invalidateQueries({
        queryKey: ['previewSongList', workroomId],
      });
    },
  });
};
