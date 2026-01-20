'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Chapter12SignOff() {
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const logo = logoRef.current;
    const links = linksRef.current;

    if (!logo || !links) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#ch12',
        start: 'center 70%',
      },
    });

    tl.to(logo, { opacity: 1, y: 0, duration: 1, ease: 'power4.out' }).to(
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
      <div className="space-y-8 z-10">
        {/* Trapstar Logo */}
        <div
          ref={logoRef}
          className="opacity-0 flex items-center justify-center"
        >
          <div className="relative w-96 h-32 md:w-[32rem] md:h-40">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHGoqE8W0VyW9wSDsDhU9JgoFaZcKLzwaExw&s"
              alt="Trapstar Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Social Links */}
        <div ref={linksRef} className="flex justify-center gap-6 opacity-0">
          <a
            href="#"
            className="cursor-hover hover:text-hundred-red transition-colors font-mono text-sm"
          >
            INSTAGRAM
          </a>
          <a
            href="#"
            className="cursor-hover hover:text-hundred-red transition-colors font-mono text-sm"
          >
            TIKTOK
          </a>
        </div>
      </div>

      {/* Final Footer */}
      <footer className="absolute bottom-6 w-full text-center text-xs text-gray-600 font-mono">
        &copy; 2026 TRAPSTAR. LONDON. ALL RIGHTS RESERVED.
      </footer>
    </section>
  );
}
