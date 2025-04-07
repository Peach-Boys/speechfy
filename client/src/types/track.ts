export interface BaseTrack {
  trackId: number;
  instrumentName: string;
  trackUrl: string;
  trackName: string;
}

export interface BaseRecord {
  recordId: number;
  recordUrl: string;
}

export interface ITrack extends BaseTrack, BaseRecord {
  isPlaying: boolean;
  order: number;
}
