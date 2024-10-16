
import { ToastContainer, toast } from 'react-toastify';
import { useMemo, useState } from 'react';
import { memo } from 'react';
import { Station } from '../types';
import { Radio, Star, Flame, ChartNoAxesColumnIncreasing as Chart } from 'lucide-react';
import useStore from '../store/useStore';
import FilterBar from './FilterBar';
import 'react-toastify/dist/ReactToastify.css';

const StationCard: React.FC<{ station: Station }> = memo(({ station }) => {
  const play = useStore((state) => state.play);
  const { currentStation } = useStore((state) => state.playerState);
  const cardActive = currentStation && currentStation.id === station.id ? 'bg-blue-100' : 'bg-white';
  const cardUnreachable = !station.reliability ? 'cursor-not-allowed' : '';
  const getReliabilityColor = (reliability: number): string => {
    reliability = Math.max(0, Math.min(reliability, 100));
  
    const hue = (reliability / 100) * 120;
    const saturation = 70;
    const lightness = 50;
  
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };
  const reliabilityColor = useMemo(() => getReliabilityColor(station.reliability || 0), [station.reliability]);

  const handleStationClick = () => {
    if (!station.reliability) {
      toast.error('This station is currently unavailable.');
    } else {
      play(station);
    }
  };

  return (
    <div
      className={`${cardActive} ${cardUnreachable} mb-4 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer`}
      onClick={handleStationClick}
    >
      <div className="flex items-center mb-2">
        <img src={station.imgUrl} alt={station.name} className="w-6 h-6 mr-2 object-cover rounded-lg" />
        <h3 className="text-lg font-semibold flex items-center">
          {station.name}
          {station.reliability ? (
            <Radio className="w-6 h-6 text-blue-500 ml-2" />
          ) : null}
          {station.popularity && station.popularity > 4.5 ? (
            <Flame className="w-4 h-4 text-red-500 ml-2" />
          ) : null}
          
        </h3>
      </div>
      <p className="text-sm text-gray-600 mb-2">{station.description}</p>
      <div className="flex items-center text-sm text-gray-500">
        {station.popularity ? (
          <>
            <Star className="w-4 h-4 mr-1 fill-yellow-500 text-yellow-500" />
            <span className="mr-2">{station.popularity.toFixed(1)}</span>
          </>
        ) : null }
        {station.reliability ? (
          <>
            <Chart className="w-4 h-4 mr-1" style={{ color: reliabilityColor }}/>
            <span className="font-semibold" style={{ color: reliabilityColor }}>
              {station.reliability.toFixed()}%
            </span>
          </>
        ) : null }
      </div>
      <div className="mt-2">
        {station.tags.map((tag, index) => (
          <span key={index} className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-1 mb-1">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
});

const StationList: React.FC = () => {
  const stations = useStore((state) => state.stations);
  const [filteredStations, setFilteredStations] = useState<Station[]>(stations);
  
  const availableTags = Array.from(
    new Set(stations.flatMap((station) => station.tags))
  );

  const handleFilter = ({ reliability, popularity, tags }: { reliability: number; popularity: number; tags: string[] }) => {
    let filtered = stations;

    if (reliability > 0) {
      const reliabilityThreshold = reliability * 20;
      filtered = filtered.filter((station) => station.reliability && station.reliability >= reliabilityThreshold);
    }

    if (popularity > 0) {
      filtered = filtered.filter((station) => station.popularity && station.popularity >= popularity);
    }

    if (tags.length > 0) {
      filtered = filtered.filter((station) => tags.every((tag) => station.tags.includes(tag)));
    }

    setFilteredStations(filtered);
  };

  return (
    <div className="h-full overflow-auto">
      <div className="relative w-full md:w-1/2 mx-auto">
        <FilterBar onFilter={handleFilter} availableTags={availableTags} />
        {filteredStations.length > 0 ? (
          filteredStations.map((station) => (
            <StationCard key={station.id} station={station} />
          ))
        ) : (
          <p>No stations found with the selected filters.</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default StationList;
