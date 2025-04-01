import { useMutation } from '@tanstack/react-query';
import { login } from '@/service/apis/Login';

export function useLogin() {
  return useMutation({
    mutationFn: (code: string) => login(code),
    mutationKey: ['login'],
  });
}
