import { getBasicPresginedUrl } from '@/service/apis/MusicGen';
import { putUploadTrack } from '@/service/apis/Upload';
import { postSaveNonAISong } from '@/service/apis/Workspace';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface Props {
  workroomId: string;
  selectSong: string | undefined;
  mood: string;
  genre: string;
  title: string;
  instruments: string[];
  mergeFile: ArrayBuffer;
  imageFilePath: string;
}

export const useSingleUpload = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async ({
      workroomId,
      selectSong,
      mood,
      genre,
      title,
      instruments,
      mergeFile,
      imageFilePath,
    }: Props) => {
      const res = await getBasicPresginedUrl();
      console.log('res:', res);
      try {
        await putUploadTrack(res.basicSongPresignedUrl, mergeFile);
      } catch (error) {
        console.error('Error uploading file:', error);
      }

      const songPath = selectSong
        ? new URL(selectSong).pathname.slice(1) // 앞에 '/' 제거
        : res.basicSongFilePath;

      await postSaveNonAISong(
        workroomId,
        songPath,
        mood,
        genre,
        title,
        instruments,
        imageFilePath
      );
    },
    onSuccess: () => {
      router.push('/my');
    },
  });
};
