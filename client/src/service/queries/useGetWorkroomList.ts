import { getWorkrommList } from '@/service/apis/MyPage';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { IWorkroom } from '@/service/types/MyPage';

export const useGetWorkroomList = (): UseQueryResult<IWorkroom, Error> => {
  return useQuery({
    queryKey: ['workroomList'],
    queryFn: () => getWorkrommList(),
  });
};
