import { useMutation } from '@tanstack/react-query';
import { login } from '@/service/apis/Login';
import { useRouter } from 'next/navigation';

export function useLogin() {
  const navigation = useRouter();
  return useMutation({
    mutationFn: (code: string) => login(code),
    mutationKey: ['login'],
    onSuccess: () => {
      navigation.push('/my');
    },
    onError: () => {
      navigation.push('/');
    },
  });
}
