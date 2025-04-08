import { logout } from '@/service/apis/Login';
import { useAuthStore } from '@/stores/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function useLogin() {
  const { setIsLogin } = useAuthStore();
  const navigation = useRouter();
  return useMutation({
    mutationFn: () => logout(),
    mutationKey: ['logout'],
    onSuccess: () => {
      setIsLogin(false);
      navigation.push('/');
    },
    onError: () => {
      navigation.push('/error');
    },
  });
}
