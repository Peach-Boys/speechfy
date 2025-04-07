export type TTag = {
  id: number;
  label: string;
};

export interface IPreviewSong {
  songId: number;
  songSrc: string;
  instruments: TTag[];
  gerne: string;
  mood: string;
}

export interface IPreviewSongList {
  songList: IPreviewSong[];
}

export interface AISong {
  aiSongId: number;
  userId: number;
  studioId: number;
  viewCount: number;
  likesCount: number;
  mood: string;
  genre: string;
  name: string;
  isAIUsed: boolean;
}

export interface AISongList {
  aiSongList: AISong[];
}
