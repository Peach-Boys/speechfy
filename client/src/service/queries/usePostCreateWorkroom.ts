import { postCreateWorkroom } from '@/service/apis/Workspace';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const usePostCreateWorkroom = (studioName: string) => {
  const router = useRouter();
  return useMutation({
    mutationFn: () => postCreateWorkroom(studioName),
    onSuccess: (data) => {
      router.push(`/workroom/${data.studioId}`);
    },
  });
};
