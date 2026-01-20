'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

export default function Chapter01Stamp() {
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const logo = logoRef.current;
    const text = textRef.current;
    const line = lineRef.current;

    if (!logo || !text || !line) return;

    const tl = gsap.timeline();

    // Flicker effect
    tl.to(logo, { opacity: 1, duration: 0.1, repeat: 3, yoyo: true })
      .to(logo, { opacity: 1, duration: 0.5 })
      // Slam solid
      .to(logo, {
        webkitTextStroke: '0px white',
        color: 'white',
        duration: 0.1,
        scale: 1.05,
        ease: 'elastic.out(1, 0.3)',
      })
      .to(text, { opacity: 1, y: 0, duration: 1 }, '-=0.2')
      .fromTo(
        line,
        { strokeDasharray: 1000, strokeDashoffset: 1000 },
        { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut' },
        '-=0.5'
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="ch01"
      className="chapter-section flex items-center justify-center bg-hundred-black relative"
      data-title="THE STAMP"
    >
      <div className="absolute inset-0 z-0 opacity-40">
        <Image
          src="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=2574&auto=format&fit=crop"
          alt="Street Texture"
          fill
          className="object-cover grayscale brightness-50"
          priority
        />
      </div>
      <div className="z-10 text-center relative">
        {/* Glitchy Logo */}
        <div className="overflow-hidden mb-6">
          <div
            ref={logoRef}
            className="font-display text-[15vw] leading-none font-bold tracking-tighter text-transparent"
            style={{ WebkitTextStroke: '2px white', opacity: 0 }}
          >
            TRAPSTAR
          </div>
        </div>
        <p
          ref={textRef}
          className="text-xl md:text-2xl font-light tracking-widest uppercase opacity-0"
        >
          Commitment. Showing Up. Staying Solid.
        </p>
      </div>
      {/* Animated Route Line SVG */}
      <svg
        className="absolute bottom-10 left-0 w-full h-24 stroke-white/20"
        preserveAspectRatio="none"
      >
        <path
          ref={lineRef}
          d="M0,12 L500,12"
          fill="none"
          strokeWidth="1"
        />
      </svg>
    </section>
  );
}
