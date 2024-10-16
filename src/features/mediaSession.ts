import { useEffect } from 'react';
import type { Station } from '../types';

type PlayerControls = {
  toggle: () => void;
  handleSkip: (direction: 'next' | 'prev') => void;
};

const mediaSession = (currentStation: Station | null, { toggle, handleSkip }: PlayerControls) => {
  useEffect(() => {
    if (!currentStation) return;

    navigator.mediaSession.metadata = new window.MediaMetadata({
      title: currentStation.name,
      artist: currentStation.name,
      artwork: [
        { src: currentStation.imgUrl, sizes: '96x96', type: 'image/png' },
        { src: currentStation.imgUrl, sizes: '128x128', type: 'image/png' },
        { src: currentStation.imgUrl, sizes: '192x192', type: 'image/png' },
        { src: currentStation.imgUrl, sizes: '256x256', type: 'image/png' },
        { src: currentStation.imgUrl, sizes: '384x384', type: 'image/png' },
        { src: currentStation.imgUrl, sizes: '512x512', type: 'image/png' },
      ],
    });

    navigator.mediaSession.setActionHandler('play', toggle);
    navigator.mediaSession.setActionHandler('pause', toggle);
    navigator.mediaSession.setActionHandler('previoustrack', () => handleSkip('prev'));
    navigator.mediaSession.setActionHandler('nexttrack', () => handleSkip('next'));

    return () => {
      navigator.mediaSession.setActionHandler('play', null);
      navigator.mediaSession.setActionHandler('pause', null);
      navigator.mediaSession.setActionHandler('previoustrack', null);
      navigator.mediaSession.setActionHandler('nexttrack', null);
    };
  }, [currentStation, toggle, handleSkip]);
};

export default mediaSession;