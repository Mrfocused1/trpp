'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Chapter05Sound() {
  const waveformRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const waveform = waveformRef.current;
    if (!waveform) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        waveform,
        { strokeDasharray: 2000, strokeDashoffset: 2000 },
        {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: '#ch05',
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="ch05"
      className="relative w-full bg-hundred-black overflow-hidden md:min-h-screen"
      data-title="THE SOUND"
    >
      {/* Video Background - aspect ratio 16:9 on mobile, full screen on desktop */}
      <div className="absolute inset-0 w-full h-full md:h-full opacity-20">
        <div className="relative w-full h-full aspect-video md:aspect-auto">
          <iframe
            src="https://www.youtube.com/embed/CzkIb_kEF_M?autoplay=1&mute=1&loop=1&playlist=CzkIb_kEF_M&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
            className="absolute top-0 left-0 w-full h-full grayscale"
            allow="autoplay; encrypted-media; fullscreen"
            style={{ border: 'none', pointerEvents: 'none' }}
            title="Behind the Scenes Video"
          />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative flex flex-col justify-center items-center min-h-[56.25vw] md:min-h-screen py-10">
        <div className="z-10 text-center mix-blend-screen">
          <h2 className="font-display text-[12vw] leading-none text-white opacity-90 tracking-tighter">
            BEHIND THE<br />
            SCENES
          </h2>
        </div>

        {/* Waveform */}
        <svg className="w-full h-48 mt-10 z-10" viewBox="0 0 1000 100" preserveAspectRatio="none">
          <path
            ref={waveformRef}
            d="M0,50 Q25,0 50,50 T100,50 T150,50 T200,50 T250,50 T300,50 T350,50 T400,50 T450,50 T500,50 T550,50 T600,50 T650,50 T700,50 T750,50 T800,50 T850,50 T900,50 T950,50 T1000,50"
            fill="none"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
      </div>
    </section>
  );
}
