export interface BaseWorkroom {
  studioId: number;
  studioName: string;
  trackInfo: string[];
  modifiedAt: string;
  userId: number;
}

export interface BaseCompletedSong {
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
