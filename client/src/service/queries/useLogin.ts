import { login } from '@/service/apis/Login';
import { useAuthStore } from '@/stores/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function useLogin() {
  const navigation = useRouter();
  const { setIsLogin } = useAuthStore();
  return useMutation({
    mutationFn: (code: string) => login(code),
    mutationKey: ['login'],
    onSuccess: () => {
      setIsLogin(true);
      navigation.push('/my');
    },
    onError: () => {
      navigation.push('/error');
    },
  });
}
