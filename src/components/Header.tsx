import { memo } from 'react';
import { Radio } from 'lucide-react';

const Header: React.FC = () => (
  <header className="bg-blue-600 text-white py-6 mb-8">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-center">
        <Radio className="w-8 h-8 mr-3" />
        <h1 className="text-3xl font-bold">Mini TuneIn</h1>
      </div>
    </div>
  </header>
);

export default memo(Header);