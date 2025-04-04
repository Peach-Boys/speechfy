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
  songTitle: string;
  imageCloudFrontUrl: string;
  songCloudFrontUrl: string;
}

export interface CreateImageResponse {
  imageUrl: string;
}
