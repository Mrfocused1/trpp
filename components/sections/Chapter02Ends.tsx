'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Chapter02Ends() {
  const gridRef = useRef<SVGRectElement>(null);
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textReveals = useRef<(HTMLElement | null)[]>([]);
  const sigPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    const imgContainer = imgContainerRef.current;
    const title = titleRef.current;
    const sigPath = sigPathRef.current;

    if (!grid || !imgContainer || !title || !sigPath) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#ch02',
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    });

    // 1. Grid draws
    tl.from(grid, { opacity: 0, duration: 1 })
      // 2. Image Reveal (Clip Path)
      .from(imgContainer, {
        clipPath: 'inset(0 100% 0 0)',
        duration: 1.5,
        ease: 'power3.inOut',
      }, '-=0.5')
      // 3. Title reveal
      .from(title, {
        yPercent: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      }, '-=1')
      // 4. Text reveals
      .to(textReveals.current.filter(Boolean), {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
      }, '-=0.5')
      // 5. Signature Draw
      .from(sigPath, {
        strokeDasharray: 300,
        strokeDashoffset: 300,
        duration: 2,
        ease: 'power2.out',
      }, '-=1');

    return () => {
      tl.kill();
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, []);

  return (
    <section
      id="ch02"
      className="chapter-section relative h-screen w-full overflow-hidden flex flex-col justify-end p-6 md:p-12 pt-32 bg-hundred-bg"
      data-title="THE ENDS"
    >
      {/* Background SVG Grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-ch02" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect
            ref={gridRef}
            width="100%"
            height="100%"
            fill="url(#grid-ch02)"
            className="stroke-hundred-dark"
          />
        </svg>
      </div>

      {/* Hero Media - Video on Mobile, Image on Desktop */}
      <div className="absolute top-0 right-0 w-full md:w-[60vw] h-full z-0">
        <div ref={imgContainerRef} className="w-full h-full relative">
          {/* Mobile Video */}
          <video
            className="md:hidden w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src="/images/ends-mobile.mp4" type="video/mp4" />
          </video>

          {/* Desktop Image */}
          <Image
            src="https://uk.trapstarlondon.com/cdn/shop/files/Tri.jpg?v=1768768049&width=1200"
            alt="Trapstar London"
            fill
            className="hidden md:block object-cover"
            priority
          />
          <div className="absolute inset-0 bg-hundred-bg opacity-10"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl">
        <div className="overflow-hidden">
          <h1
            ref={titleRef}
            className="font-display text-[15vw] md:text-[8vw] leading-[0.85] tracking-tighter text-white md:text-hundred-dark"
          >
            TRAPSTAR
          </h1>
        </div>
        <div className="overflow-hidden mt-4">
          <p
            ref={(el) => {
              textReveals.current[0] = el;
            }}
            className="text-lg md:text-xl font-light tracking-wide max-w-md opacity-0 text-white md:text-black"
          >
            Born in The Ends. Built for the streets.
            <br />
            London&apos;s finest since day one.
          </p>
        </div>

        <div
          ref={(el) => {
            textReveals.current[1] = el;
          }}
          className="flex gap-8 mt-12 opacity-0"
        >
          <button className="cursor-hover font-medium border-b border-hundred-dark pb-1 hover:text-hundred-red hover:border-hundred-red transition-all">
            Shop New In
          </button>
          <button className="cursor-hover font-medium text-gray-500 hover:text-hundred-dark transition-colors">
            View Collection
          </button>
        </div>
      </div>

      {/* Signature SVG */}
      <div className="absolute bottom-12 right-12 w-32 h-32 z-20 hidden md:block">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full stroke-hundred-dark fill-none"
          strokeWidth="2"
        >
          <path
            ref={sigPathRef}
            d="M10,90 Q30,10 50,50 T90,90"
            strokeLinecap="round"
          />
          <text x="60" y="30" className="font-sans text-[10px] fill-current stroke-none">
            EST. 2024
          </text>
        </svg>
      </div>
    </section>
  );
}
