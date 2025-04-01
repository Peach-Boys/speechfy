import { getCompletedSongList } from '@/service/apis/MyPage';
import { useQuery } from '@tanstack/react-query';

export const useGetCompletedSongList = () => {
  return useQuery({
    queryKey: ['completeSongList'],
    queryFn: () => getCompletedSongList(),
  });
};
