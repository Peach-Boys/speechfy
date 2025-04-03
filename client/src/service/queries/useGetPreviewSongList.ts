import { getPreviewSongList } from '@/service/apis/MusicGen';
import { IPreviewSongList } from '@/types/song';
import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

export const useGetPreviewSongList = (
  workroomId: string
): UseQueryResult<IPreviewSongList, Error> => {
  return useQuery<IPreviewSongList, Error>({
    queryKey: ['previewSongList', workroomId],
    queryFn: () => getPreviewSongList(workroomId),
  });
};
