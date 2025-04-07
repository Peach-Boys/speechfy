export interface IWorkroom {
  studioList: {
    studioId: number;
    studioName: string;
    trackInfo: string[];
    modifiedAt: string;
    userId: number;
  }[];
}

export interface ICompletedSong {
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

export interface ICompletedSongList {
  songList: ICompletedSong[];
}
