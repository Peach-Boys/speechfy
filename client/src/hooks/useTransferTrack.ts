import {
  getRequestPresignedUrlTrack,
  postTransferSuccess,
  putUploadTrack,
} from '@/service/apis/Upload';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Props {
  workroomId: string;
  originalAudio: string;
  transAudio: string;
  instrument: string;
  trackName: string;
  order: number;
  trackId: number;
  recordId: number;
}

export const useTransferTrack = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      workroomId,
      transAudio,
      instrument,
      order,
      trackName,
      trackId,
      recordId,
    }: Props) => {
      const presignedUrl = await getRequestPresignedUrlTrack(workroomId);
      const transAudioData = await fetch(transAudio);
      const transAudioBuffer = await transAudioData.arrayBuffer();
      const { trackPresignedUrl, trackUUID } = presignedUrl;

      const [trackResult] = await Promise.allSettled([
        putUploadTrack(trackPresignedUrl, transAudioBuffer),
      ]);

      // 성공 여부 판단
      const isTrackSuccess = trackResult.status === 'fulfilled';

      if (!isTrackSuccess) {
        throw new Error('업로드 중 에러가 발생했습니다.');
      }

      await postTransferSuccess(
        workroomId,
        instrument,
        order,
        trackName,
        trackUUID,
        null,
        trackId,
        recordId
      );
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
