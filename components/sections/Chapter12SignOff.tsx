'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Chapter12SignOff() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    const links = linksRef.current;

    if (!title || !links) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#ch12',
        start: 'center 70%',
      },
    });

    tl.to(title, { opacity: 1, y: 0, duration: 1, ease: 'power4.out' }).to(
      links,
      { opacity: 1, y: 0, duration: 1 },
      '-=0.5'
    );

    return () => {
      tl.kill();
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, []);

  return (
    <section
      id="ch12"
      className="chapter-section flex flex-col items-center justify-center bg-black text-white text-center"
      data-title="SIGN OFF"
    >
      <div className="space-y-6 z-10">
        <h2
          ref={titleRef}
          className="font-display text-8xl md:text-9xl font-bold tracking-tighter opacity-0"
        >
          STAY
          <br />1 HUNDRED.
        </h2>
        <div ref={linksRef} className="flex justify-center gap-6 opacity-0">
          <a
            href="#"
            className="cursor-hover hover:text-hundred-red transition-colors font-mono"
          >
            INSTAGRAM
          </a>
          <a
            href="#"
            className="cursor-hover hover:text-hundred-red transition-colors font-mono"
          >
            TIKTOK
          </a>
        </div>
      </div>
      {/* Final Footer */}
      <footer className="absolute bottom-6 w-full text-center text-xs text-gray-600 font-mono">
        &copy; 2026 1 HUNDRED. LONDON. ALL RIGHTS RESERVED.
      </footer>
    </section>
  );
}
