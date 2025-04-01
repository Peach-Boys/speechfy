import { getWorkrommList } from '@/service/apis/MyPage';
import { useQuery } from '@tanstack/react-query';

export const useGetWorkroomList = () => {
  return useQuery({
    queryKey: ['workroomList'],
    queryFn: () => getWorkrommList(),
  });
};
