import CreateRecord from '@/components/features/Track/CreateRecord';
import { QueryClient } from '@tanstack/react-query';

export default function Home() {
  const queryClient = new QueryClient();
  // 수정 가능한 페이지, 테스트를 위해 app/page.tsx를 많이 건드릴 예정입니다.
  return <CreateRecord />;
}
