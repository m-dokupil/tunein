import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Station, PlayerState } from '../types';

const SORT_BY_DESC = 'popularity';

interface AudioRef {
  current: HTMLAudioElement | null;
}

interface StoreState {
  stations: Station[];
  playerState: PlayerState;
  lastUpdated: number | null;
  play: (station: Station) => void;
  pause: () => void;
  toggle: () => void;
  setVolume: (volume: number) => void;
  fetchStations: (url: string) => Promise<void>;
}

const useStore = create<StoreState>()(
  persist(
    (set, get) => {
      let audioRef: AudioRef = { current: null };

      return {
        stations: [],
        playerState: {
          isPlaying: false,
          currentStation: null,
          volume: 1,
        },
        lastUpdated: null,
        play: station => {
          const { playerState } = get();

          if (audioRef.current) {
            audioRef.current.pause();
          }

          audioRef.current = new Audio(station.streamUrl);
          audioRef.current.volume = playerState.volume;
          audioRef.current.play();

          set({
            playerState: {
              isPlaying: true,
              currentStation: station,
              volume: playerState.volume,
            },
          });
        },
        pause: () => {
          const { playerState } = get();

          if (audioRef.current && playerState.currentStation) {
            audioRef.current.pause();
            set(state => ({
              playerState: { ...state.playerState, isPlaying: false },
            }));
          }
        },
        toggle: () => {
          const { playerState, play, pause } = get();

          if (playerState.isPlaying) {
            pause();
          } else if (playerState.currentStation) {
            play(playerState.currentStation);
          }
        },
        setVolume: (volume: number) => {
          if (audioRef.current) {
            audioRef.current.volume = volume;
          }

          set(state => ({ playerState: { ...state.playerState, volume } }));
        },
        fetchStations: async (url: string) => {
          try {
            const { lastUpdated, stations } = get();
            const now = Date.now();

            // Station cache for 1h
            if (lastUpdated && now - lastUpdated < 3600000 && stations.length > 0) return;

            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            const { data } = await response.json();

            set({
              stations: [...data].sort(
                (a, b) => b[SORT_BY_DESC] - a[SORT_BY_DESC]
              ),
              lastUpdated: now,
            });
          } catch (error) {
            console.error('Error fetching stations:', error);
            throw error;
          }
        },
      };
    },
    {
      name: 'mini-tunein-storage',
      partialize: state => ({
        stations: state.stations,
        playerState: { volume: state.playerState.volume },
        lastUpdated: state.lastUpdated,
      }),
    }
  )
);

export default useStore;
