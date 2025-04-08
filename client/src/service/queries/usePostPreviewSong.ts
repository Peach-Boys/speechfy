import { getBasicPresginedUrl, postPreviewSong } from '@/service/apis/MusicGen';
import { putUploadTrack } from '@/service/apis/Upload';
import { IPreviewSong } from '@/service/types/MusicGen';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Props {
  mergedAudio: ArrayBuffer;
  genre: string;
  mood: string;
  instruments: string[];
}

export const usePostPreviewSong = (workroomId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ mergedAudio, genre, mood }: Props) => {
      const res = await getBasicPresginedUrl();

      try {
        await putUploadTrack(res.basicSongPresignedUrl, mergedAudio);
      } catch (err: unknown) {
        throw new Error((err as Error).message);
      }

      const song: IPreviewSong = {
        basicSongUFilePath: res.basicSongFilePath,
        genre: genre,
        mood: mood,
        name: '',
        instruments: [],
      };

      return postPreviewSong(workroomId, song);
    },
    onSuccess: () => {
      alert('노래가 완성되면 알려드릴게요!');
      queryClient.invalidateQueries({
        queryKey: ['previewSongList', workroomId],
      });
    },
  });
};
