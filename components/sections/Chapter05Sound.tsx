'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

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
      className="chapter-section flex flex-col justify-center items-center bg-hundred-black overflow-hidden"
      data-title="THE SOUND"
    >
      <div className="absolute inset-0 opacity-20">
        <Image
          src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2670&auto=format&fit=crop"
          alt="Speaker Stack"
          fill
          className="object-cover grayscale"
        />
      </div>

      <div className="z-10 relative text-center mix-blend-screen">
        <h2 className="font-display text-[12vw] leading-none text-white opacity-90 tracking-tighter">
          RHYTHM &<br />
          GRIT
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
    </section>
  );
}
