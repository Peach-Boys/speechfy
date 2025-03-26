export interface IAISong {
  id: number;
  tags: TTag[];
  url: string;
}

export type TTag = {
  id: number;
  label: string;
};
