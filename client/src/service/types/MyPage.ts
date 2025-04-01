export interface IWorkroom {
  studioId: number;
  name: string;
  trackInfo: string[];
  modifiedAt: string;
}

export interface ICompletedSong {
  songId: number;
  userId: number;
  title: string;
  completeUrl: string;
  viewCount: number;
  likes: number;
  imagePath: string;
  genre: string;
  mood: string;
  createdAt: string;
}
