export interface BaseTrack {
  order: number;
  trackId: number;
  instrumentName: string;
  trackPresignedUrl: string;
  trackName: string;
  recordId: number;
}

export interface BaseRecord {
  recordId: number;
  recordPresignedUrl: string;
}

export interface TrackListItem {
  track: BaseTrack;
  record: BaseRecord;
}

export interface StudioData {
  studioId: number;
  studioName: string;
  trackList: TrackListItem[];
}

export enum INSTRUMENT_TYPE {
  TRUMPET,
  VIOLIN,
  DRUM,
  TENOR_SAXOPHONE,
}
