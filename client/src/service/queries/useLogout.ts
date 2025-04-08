import { logout } from '@/service/apis/Login';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function useLogin() {
  const navigation = useRouter();
  return useMutation({
    mutationFn: () => logout(),
    mutationKey: ['logout'],
    onSuccess: () => {
      navigation.push('/');
    },
    onError: () => {
      navigation.push('/error');
    },
  });
}
