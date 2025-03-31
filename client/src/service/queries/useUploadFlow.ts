import {
  getRequestPresignedUrlTrack,
  postSuccess,
  putUploadTrack,
} from '@/service/apis/Upload';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUploadFlow = (category: string, audio: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const presignedUrl = await getRequestPresignedUrlTrack(category);
      console.log('presi:', presignedUrl);
      await putUploadTrack('presignedUrl', category, audio);
      await postSuccess(presignedUrl);
    },
    onSuccess: () => {
      console.log('모든 업로드 완료');
      queryClient.invalidateQueries({ queryKey: ['tracks'] });
    },
    onError: (err) => {
      console.error('업로드 중 에러 발생:', err);
    },
  });
};
