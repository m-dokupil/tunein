import { useCallback, memo } from 'react';
import styled from 'styled-components';
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';
import useStore from '../store/useStore';
import mediaSession from '../features/mediaSession';

const PlayerWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f3f4f6;
  padding: 1rem;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
`;

const VolumeControl = styled.input`
  -webkit-appearance: none;
  width: 100px;
  height: 4px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    background: #4299e1;
    cursor: pointer;
    border-radius: 50%;
  }

  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    background: #4299e1;
    cursor: pointer;
    border-radius: 50%;
  }
`;

const Player: React.FC = () => {
  const { playerState, toggle, play, stations, setVolume } = useStore();
  const { isPlaying, currentStation, volume } = playerState;

  const handleSkip = useCallback((direction: 'next' | 'prev') => {
    if (!currentStation) return;
    const currentIndex = stations.findIndex(s => s.id === currentStation.id);
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % stations.length;
    } else {
      nextIndex = (currentIndex - 1 + stations.length) % stations.length;
    }
    play(stations[nextIndex]);
  }, [currentStation, stations, play]);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  }, [setVolume]);

  mediaSession(currentStation, { toggle, handleSkip });

  if (!currentStation) return null;

  return (
    <PlayerWrapper>
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center">
          <img loading="lazy" src={currentStation.imgUrl} alt={currentStation.name} className="w-16 h-16 object-cover rounded-lg" />
          <div className="ml-4 ">
            <h3 className="text-lg font-semibold line-clamp-1">{currentStation.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-3">{currentStation.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="flex items-center mr-4">
            <Volume2 className="w-5 h-5 text-blue-500 mr-2" />
            <VolumeControl
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
          <button
            onClick={() => handleSkip('prev')}
            className="text-blue-500 hover:text-blue-600 focus:outline-none"
          >
            <SkipBack className="w-6 h-6" />
          </button>
          <button
            onClick={toggle}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          <button
            onClick={() => handleSkip('next')}
            className="text-blue-500 hover:text-blue-600 focus:outline-none"
          >
            <SkipForward className="w-6 h-6" />
          </button>
        </div>
      </div>
    </PlayerWrapper>
  );
};

export default memo(Player);
