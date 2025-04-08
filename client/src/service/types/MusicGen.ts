export type TTag = {
  id: number;
  label: string;
};

export interface IPreviewSong {
  basicSongUFilePath: string;
  mood: string;
  genre: string;
  name: string;
  instruments: string[];
}

export interface AISong {
  aiSongId: number;
  userId: number;
  studioId: number;
  viewCount: number;
  likesCount: number;
  signedUrl: string;
  mood: string;
  genre: string;
  instruments: string[];
  name: string;
  isAIUsed: boolean;
}

export interface AISongList {
  songList: AISong[];
}

export interface IBasicResponse {
  basicSongId: string;
  userId: string;
  studioId: string;
  viewCount: number;
  likesCount: number;
  mood: string;
  genre: string;
  name: string;
  isAIUsed: boolean;
}
