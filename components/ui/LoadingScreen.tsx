'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function LoadingScreen() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;

    // Simulate asset loading
    const timer = setTimeout(() => {
      gsap.to(loader, {
        opacity: 0,
        duration: 0.8,
        onComplete: () => {
          setIsLoaded(true);
        },
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoaded) return null;

  return (
    <div id="loader" ref={loaderRef}>
      <div className="font-display text-4xl font-bold animate-pulse tracking-tighter">
        LOADING ASSETS...
      </div>
    </div>
  );
}
