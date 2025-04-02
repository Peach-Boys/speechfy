import { IPreviewSong } from '@/types/song';

export const DUMMY_ADD_SONG: IPreviewSong = {
  songId: 0,
  songSrc: 'https://www.youtube.com/watch?v=K4DyBUG242c',
  instruments: [
    { id: 0, label: '기타' },
    { id: 1, label: '피아노' },
  ],
  gerne: '힙합',
  mood: '평화로운',
};
