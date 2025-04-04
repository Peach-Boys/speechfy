import { getBasicPresginedUrl } from '@/service/apis/MusicGen';
import { putUploadTrack } from '@/service/apis/Upload';
import { postSaveNonAISong } from '@/service/apis/Workspace';
import { useMutation } from '@tanstack/react-query';

interface Props {
  workroomId: string;
  selectSong: string | undefined;
  mood: string;
  genre: string;
  title: string;
  instruments: string[];
  mergeFile: ArrayBuffer;
}

export const useSingleUpload = () => {
  return useMutation({
    mutationFn: async ({
      workroomId,
      selectSong,
      mood,
      genre,
      title,
      instruments,
      mergeFile,
    }: Props) => {
      const res = await getBasicPresginedUrl();
      console.log('res:', res);
      try {
        await putUploadTrack(res.basicSongPresignedUrl, mergeFile);
      } catch (error) {
        console.error('Error uploading file:', error);
      }

      await postSaveNonAISong(
        workroomId,
        selectSong ? selectSong : res.basicSongFilePath,
        mood,
        genre,
        title,
        instruments
      );
    },
  });
};
