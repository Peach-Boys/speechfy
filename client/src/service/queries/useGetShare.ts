import { useQuery } from '@tanstack/react-query';
import { getShareSong } from '../apis/Share';

export const useGetShare = (songId: number) => {
  return useQuery({
    queryKey: ['share', songId],
    queryFn: () => getShareSong(songId),
  });
};
