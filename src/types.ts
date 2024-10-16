export interface Station {
  id: string;
  imgUrl: string;
  name: string;
  description: string;
  streamUrl: string;
  reliability?: number;
  popularity?: number;
  tags: string[];
}

export interface PlayerState {
  isPlaying: boolean;
  currentStation: Station | null;
  volume: number;
}