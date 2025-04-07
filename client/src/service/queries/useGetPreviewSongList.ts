import { getPreviewSongList } from '@/service/apis/MusicGen';
import { AISong } from '@/types/song';
import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

export const useGetPreviewSongList = (
  workroomId: string
): UseQueryResult<AISong[], Error> => {
  return useQuery<AISong[], Error>({
    queryKey: ['previewSongList', workroomId],
    queryFn: () => getPreviewSongList(workroomId),
  });
};
