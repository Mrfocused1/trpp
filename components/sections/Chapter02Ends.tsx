'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Chapter02Ends() {
  const maskRef = useRef<HTMLDivElement>(null);
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const mask = maskRef.current;
    if (!mask) return;

    // Mask reveal animation
    gsap.to(mask, {
      clipPath: 'circle(100% at 50% 50%)',
      scrollTrigger: {
        trigger: '#ch02',
        start: 'top center',
        end: 'center center',
        scrub: 1,
      },
    });

    // Text reveal animations
    revealRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: i * 0.2,
        scrollTrigger: {
          trigger: '#ch02',
          start: 'top 70%',
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      id="ch02"
      className="chapter-section flex items-center justify-center bg-hundred-charcoal"
      data-title="THE ENDS"
    >
      <div
        ref={maskRef}
        className="absolute inset-0 z-0 bg-hundred-black flex items-center justify-center overflow-hidden"
        style={{ clipPath: 'circle(0% at 50% 50%)' }}
      >
        <Image
          src="https://uk.trapstarlondon.com/cdn/shop/files/Tri.jpg?v=1768768049&width=1200"
          alt="Trapstar London"
          fill
          className="object-cover opacity-60"
        />
      </div>
      <div className="z-10 container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="hidden md:block"></div>
        <div className="max-w-xl">
          <h2
            ref={(el) => {
              revealRefs.current[0] = el;
            }}
            className="font-display text-6xl md:text-8xl font-bold uppercase mb-6 tracking-tighter translate-y-10 opacity-0"
          >
            Born in
            <br />
            <span className="text-hundred-red">The Ends.</span>
          </h2>
          <p
            ref={(el) => {
              revealRefs.current[1] = el;
            }}
            className="text-lg md:text-xl text-gray-400 font-light leading-relaxed translate-y-10 opacity-0"
          >
            We don&apos;t sell hype. We build heritage. Forged in the concrete
            valleys of London, defined by the late nights and the early starts.
          </p>
        </div>
      </div>
    </section>
  );
}
