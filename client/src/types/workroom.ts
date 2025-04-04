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
  songPresignedUrl: string;
  viewCount: number;
  likes: number;
  imagePresignedUrl: string;
  genre: string;
  mood: string;
  createdAt: string;
  aiused: boolean;
}

export interface CreateResponse {
  studioId: number;
  studioName: string;
}
