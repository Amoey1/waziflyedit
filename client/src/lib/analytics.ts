declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    gaReady: boolean;
  }
}

let gaInitialized = false;

export const initGA = (): Promise<void> => {
  return new Promise((resolve) => {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

    if (!measurementId) {
      console.warn('Missing required Google Analytics key: VITE_GA_MEASUREMENT_ID');
      resolve();
      return;
    }

    if (gaInitialized) {
      resolve();
      return;
    }

    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script1.onload = () => {
      window.gaReady = true;
      gaInitialized = true;
      resolve();
    };
    script1.onerror = () => resolve();
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.textContent = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${measurementId}');
    `;
    document.head.appendChild(script2);
  });
};

export const isGAReady = () => typeof window !== 'undefined' && window.gaReady === true;

export const trackPageView = (url: string) => {
  if (typeof window === 'undefined' || !window.gtag || !window.gaReady) return;
  
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!measurementId) return;
  
  window.gtag('config', measurementId, {
    page_path: url
  });
};

export const trackEvent = (
  action: string, 
  category?: string, 
  label?: string, 
  value?: number
) => {
  if (typeof window === 'undefined' || !window.gtag || !window.gaReady) return;
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
