'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Chapter07Hoodie() {
  const revealRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reveal = revealRef.current;
    const shine = shineRef.current;

    if (!reveal) return;

    gsap.to(reveal, {
      clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0% 100%)',
      scrollTrigger: {
        trigger: '#ch07',
        start: 'top center',
        end: 'center center',
        scrub: 1,
      },
    });

    if (shine) {
      gsap.to(shine, {
        x: '400%',
        scrollTrigger: {
          trigger: '#ch07',
          start: 'center 60%',
          toggleActions: 'play none none none',
        },
        duration: 1.5,
        ease: 'power2.inOut',
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      id="ch07"
      className="chapter-section flex items-center justify-center bg-hundred-concrete"
      data-title="THE HOODIE"
    >
      <div className="relative w-full max-w-4xl aspect-[4/5] md:aspect-video bg-black overflow-hidden group">
        {/* Background Product */}
        <Image
          src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=2574&auto=format&fit=crop"
          alt="Hoodie Background"
          fill
          className="object-cover opacity-30"
        />

        {/* Silhouette Reveal Container */}
        <div
          ref={revealRef}
          className="absolute inset-0 bg-hundred-black flex items-center justify-center"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}
        >
          <div className="relative w-full h-4/5">
            <Image
              src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=2574&auto=format&fit=crop"
              alt="The Hoodie"
              fill
              className="object-contain drop-shadow-2xl"
            />
          </div>
          {/* Shine Effect */}
          <div
            ref={shineRef}
            className="absolute top-0 left-0 w-24 h-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-y-12 translate-x-[-200%]"
          />
        </div>

        <div className="absolute bottom-10 right-10 z-30 text-right">
          <h2 className="font-display text-6xl font-bold tracking-tighter">THE ICON</h2>
          <p className="font-sans text-sm tracking-widest uppercase text-hundred-red">
            Heavyweight Cotton. London Fit.
          </p>
        </div>
      </div>
    </section>
  );
}
