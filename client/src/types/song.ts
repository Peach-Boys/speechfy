export type TTag = {
  id: number;
  label: string;
};

export interface IPreviewSong {
  songId: number;
  songSrc: string;
  instruments: TTag[];
  gerne: string;
  mood: string;
}

export interface IPreviewSongList {
  songList: IPreviewSong[];
}
