import { useState, useCallback, useEffect } from 'react';
import { Star, ChevronDown, ChevronUp } from 'lucide-react';

const STARS = [1, 2, 3, 4, 5];

const FilterBar: React.FC<{
  onFilter: (filters: {
    reliability: number;
    popularity: number;
    tags: string[];
  }) => void;
  availableTags: string[];
}> = ({ onFilter, availableTags }) => {
  const [reliability, setReliability] = useState(0);
  const [popularity, setPopularity] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [hoveredPopularityStar, setHoveredPopularityStar] = useState<
    number | null
  >(null);
  const [hoveredReliabilityStar, setHoveredReliabilityStar] = useState<
    number | null
  >(null);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleTagSelect = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSetReliability = (star: number) => {
    setReliability(reliability === star ? 0 : star);
  };

  const handleSetPopularity = (star: number) => {
    setPopularity(popularity == star ? 0 : star);
  };

  const handleFilterChange = useCallback(() => {
    onFilter({ reliability, popularity, tags: selectedTags });
  }, [reliability, popularity, selectedTags]);

  useEffect(() => {
    handleFilterChange();
  }, [handleFilterChange]);

  return (
    <div
      className="cursor-pointer mb-4 p-4 rounded-lg border-2 border-gray-200"
      onClick={() => setIsCollapsed(!isCollapsed)}
    >
      <div className="flex justify-between items-center">
        <h4 className="font-semibold">Filters</h4>
        <button className="text-gray-500 hover:text-gray-700">
          {isCollapsed ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronUp className="w-4 h-4" />
          )}
        </button>
      </div>
      <div
        className={`${isCollapsed ? 'hidden' : 'mt-4'} bg-gray-100 rounded-lg`}
      >
        {isCollapsed ? null : (
          <div
            className="flex flex-col items-center justify-between"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div>
                <div className="flex mb-2 items-center">
                  <h4 className="mr-2">Reliability</h4>
                  {STARS.map(star => (
                    <Star
                      key={star}
                      className={`w-6 h-6 cursor-pointer ${
                        (hoveredReliabilityStar || reliability) >= star
                          ? 'text-yellow-500 fill-yellow-500'
                          : 'text-gray-300 fill-gray-300'
                      }`}
                      onClick={() => handleSetReliability(star)}
                      onMouseEnter={() => setHoveredReliabilityStar(star)}
                      onMouseLeave={() => setHoveredReliabilityStar(null)}
                      onTouchEnd={() => setHoveredReliabilityStar(null)}
                    />
                  ))}
                </div>

                <div className="flex items-center">
                  <h4 className="mr-1">Popularity</h4>
                  {STARS.map(star => (
                    <Star
                      key={star}
                      className={`w-6 h-6 cursor-pointer ${
                        (hoveredPopularityStar || popularity) >= star
                          ? 'text-yellow-500 fill-yellow-500'
                          : 'text-gray-300 fill-gray-300'
                      }`}
                      onClick={() => handleSetPopularity(star)}
                      onMouseEnter={() => setHoveredPopularityStar(star)}
                      onMouseLeave={() => setHoveredPopularityStar(null)}
                      onTouchEnd={() => setHoveredPopularityStar(null)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center">
                  <div className="flex flex-wrap">
                    {availableTags.map(tag => (
                      <span
                        key={tag}
                        className={`cursor-pointer inline-block rounded-full mb-2 px-2 py-1 text-xs font-semibold mr-1 mb-1 ${
                          selectedTags.includes(tag)
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                        onClick={() => {
                          handleTagSelect(tag);
                          handleFilterChange();
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
