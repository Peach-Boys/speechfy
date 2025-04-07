import { useMutation } from '@tanstack/react-query';
import { createImage } from '../apis/MusicGen';

export const useGenerateImage = () => {
  return useMutation({
    mutationFn: ({
      title,
      genre,
      mood,
    }: {
      title: string;
      genre: string;
      mood: string;
    }) => createImage(title, genre, mood),
  });
};
