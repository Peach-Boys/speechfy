export type TTag = {
  id: number;
  label: string;
};

export interface IPreviewSong {
  songId: number;
  userId: number;
  title: string;
  songPresignedUrl: string;
  viewCount: number;
  likes: number;
  imagePresignedUrl: string;
  genre: string;
  mood: string;
  createdAt: string;
  aiused: boolean;
}

export interface IPreviewSongList {
  songList: IPreviewSong[];
}

export interface IShareSong {
  songName: string;
  imageCloudFrontUrl: string;
  songCloudFrontUrl: string;
}

export interface CreateImageResponse {
  imageUrl: string;
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
