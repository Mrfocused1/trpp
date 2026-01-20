'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

export default function Chapter04Route() {
  const activePathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activePath = activePathRef.current;
    const dot = dotRef.current;
    const caption = captionRef.current;

    if (!activePath || !dot || !caption) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#ch04',
        start: 'top top',
        end: '+=2000',
        scrub: 1,
        pin: true,
      },
    });

    // Animate line drawing
    tl.fromTo(
      activePath,
      { strokeDasharray: 1000, strokeDashoffset: 1000 },
      { strokeDashoffset: 0, ease: 'none' }
    );

    // Animate dot along path
    tl.to(
      dot,
      {
        motionPath: {
          path: '#london-route',
          align: '#london-route',
          alignOrigin: [0.5, 0.5],
        },
        ease: 'none',
        duration: 1,
      },
      '<'
    );

    // Change caption text based on progress
    tl.call(() => {
      if (caption) caption.innerText = 'BRIXTON';
    }, [], 0.1);
    tl.call(() => {
      if (caption) caption.innerText = 'SOHO';
    }, [], 0.5);
    tl.call(() => {
      if (caption) caption.innerText = 'SHOREDITCH';
    }, [], 0.9);

    return () => {
      tl.kill();
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, []);

  return (
    <section
      id="ch04"
      className="chapter-section h-screen bg-hundred-concrete text-white overflow-hidden"
      data-title="THE TRAP JOURNEY"
    >
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-50"></div>

      <div className="container mx-auto px-6 h-full flex flex-col justify-center relative z-10">
        <h2 className="font-display text-4xl mb-4">THE TRAP JOURNEY</h2>
        {/* SVG Map */}
        <div className="relative w-full h-[60vh] border border-white/10 bg-black/20 backdrop-blur-sm rounded-sm">
          <svg
            id="route-map"
            className="w-full h-full"
            viewBox="0 0 800 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background Grid */}
            <path
              d="M0 100 H800 M0 200 H800 M0 300 H800 M0 400 H800"
              stroke="white"
              strokeOpacity="0.05"
            />
            <path
              d="M100 0 V500 M200 0 V500 M300 0 V500 M400 0 V500 M500 0 V500 M600 0 V500 M700 0 V500"
              stroke="white"
              strokeOpacity="0.05"
            />

            {/* The Route Path */}
            <path
              id="london-route"
              d="M100,400 C150,380 180,350 200,300 C250,200 300,150 400,150 C500,150 550,200 600,250 S700,300 750,200"
              stroke="#333"
              strokeWidth="2"
              strokeDasharray="10,5"
            />
            <path
              ref={activePathRef}
              id="london-route-active"
              d="M100,400 C150,380 180,350 200,300 C250,200 300,150 400,150 C500,150 550,200 600,250 S700,300 750,200"
              stroke="#cc1100"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* The Dot */}
            <circle ref={dotRef} r="8" fill="white" stroke="#cc1100" strokeWidth="2" />

            {/* Stops Text */}
            <text x="100" y="440" fill="white" fontFamily="Oswald" fontSize="14" opacity="0.5">
              BRIXTON
            </text>
            <text
              x="400"
              y="120"
              fill="white"
              fontFamily="Oswald"
              fontSize="14"
              opacity="0.5"
              textAnchor="middle"
            >
              SOHO
            </text>
            <text
              x="750"
              y="180"
              fill="white"
              fontFamily="Oswald"
              fontSize="14"
              opacity="0.5"
              textAnchor="end"
            >
              SHOREDITCH
            </text>
          </svg>

          <div
            ref={captionRef}
            className="absolute bottom-6 right-6 font-display text-4xl uppercase font-bold text-hundred-red tracking-tighter"
          >
            Origin Point
          </div>
        </div>
      </div>
    </section>
  );
}
