import { getPreviewSongList } from '@/service/apis/MusicGen';
import { IPreviewSong } from '@/service/types/MusicGen';
import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

export const useGetPreviewSongList = (
  workroomId: string
): UseQueryResult<IPreviewSong[], Error> => {
  return useQuery<IPreviewSong[], Error>({
    queryKey: ['previewSongList', workroomId],
    queryFn: () => getPreviewSongList(workroomId),
  });
};
