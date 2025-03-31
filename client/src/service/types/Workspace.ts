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

export interface TrackListItem {
  order: number;
  track: BaseTrack;
  record: BaseRecord;
}

export interface StudioData {
  studioName: string;
  trackList: TrackListItem[];
}

export enum INSTRUMENT_TYPE {
  GUITAR,
  KEYBOARD,
  DRUM,
  BASS,
}
