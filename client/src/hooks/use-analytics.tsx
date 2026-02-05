import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { trackPageView, isGAReady } from '../lib/analytics';

export const useAnalytics = () => {
  const [location] = useLocation();
  const prevLocationRef = useRef<string | null>(null);
  const initialTrackedRef = useRef(false);
  
  useEffect(() => {
    const checkAndTrack = () => {
      if (!initialTrackedRef.current && isGAReady()) {
        trackPageView(location);
        initialTrackedRef.current = true;
      }
    };

    if (prevLocationRef.current === null) {
      checkAndTrack();
      prevLocationRef.current = location;
    } else if (location !== prevLocationRef.current) {
      trackPageView(location);
      prevLocationRef.current = location;
    }

    if (!initialTrackedRef.current) {
      const timer = setTimeout(checkAndTrack, 100);
      return () => clearTimeout(timer);
    }
  }, [location]);
};
