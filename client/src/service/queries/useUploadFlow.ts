import {
  deleteFail,
  getRequestPresignedUrlTrack,
  postSuccess,
  putUploadTrack,
} from '@/service/apis/Upload';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Props {
  workroomId: string;
  originalAudio: string;
  transAudio: string;
  instrument: string;
  order: number;
}

export const useUploadFlow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      workroomId,
      originalAudio,
      transAudio,
      instrument,
      order,
    }: Props) => {
      const presignedUrl = await getRequestPresignedUrlTrack(workroomId);
      console.log('presi:', presignedUrl);
      const { trackPresignedUrl, recordPresignedUrl, trackUUID, recordUUID } =
        presignedUrl;

      const [trackResult, recordResult] = await Promise.allSettled([
        putUploadTrack(trackPresignedUrl, transAudio),
        putUploadTrack(recordPresignedUrl, originalAudio),
      ]);

      // 성공 여부 판단
      const isTrackSuccess = trackResult.status === 'fulfilled';
      const isRecordSuccess = recordResult.status === 'fulfilled';

      if (!isTrackSuccess || !isRecordSuccess) {
        await deleteFail(
          workroomId,
          isTrackSuccess ? null : trackUUID,
          isRecordSuccess ? null : recordUUID
        );
        throw new Error('업로드 중 에러가 발생했습니다.');
      }

      await postSuccess(workroomId, instrument, order, trackUUID, recordUUID);
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
