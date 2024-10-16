import { useEffect, Suspense, lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import useStore from './store/useStore';
import Header from './components/Header';
import ErrorFallback from './components/ErrorFallback';

const StationList = lazy(() => import('./components/StationList'));
const Player = lazy(() => import('./components/Player'));

const API_URL = 'https://s3-us-west-1.amazonaws.com/cdn-web.tunein.com/stations.json';

function App() {
  const { fetchStations } = useStore();

  useEffect(() => {
    fetchStations(API_URL);
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div className="min-h-screen bg-gray-100 pb-24">
          <Header />
          <main className="container mx-auto px-4 mb-24">
            <Suspense fallback={<div className="text-2xl font-semibold">Loading stations...</div>}>
              <StationList />
            </Suspense>
          </main>
          <Suspense fallback={null}>
            <Player />
          </Suspense>
        </div>
    </ErrorBoundary>
  );
}

export default App;
