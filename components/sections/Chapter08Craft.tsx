'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

const specs = [
  { id: 'spec-1', title: '480GSM FLEECE', desc: 'Heavyweight for winter streets.' },
  { id: 'spec-2', title: 'REVERSE WEAVE', desc: 'Prevents vertical shrinkage.' },
  { id: 'spec-3', title: 'DOUBLE STITCH', desc: 'Reinforced seams for durability.' },
];

export default function Chapter08Craft() {
  const threadRef = useRef<SVGPathElement>(null);
  const needleRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const thread = threadRef.current;
    const needle = needleRef.current;

    if (!thread || !needle) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#ch08',
        start: 'top top',
        end: '+=1500',
        scrub: 1,
        pin: true,
      },
    });

    tl.fromTo(
      thread,
      { strokeDasharray: 1000, strokeDashoffset: 1000 },
      { strokeDashoffset: 0, ease: 'none' }
    );

    tl.to(
      needle,
      {
        motionPath: {
          path: '#seam-path',
          align: '#seam-path',
          alignOrigin: [0.5, 1],
          autoRotate: true,
        },
        ease: 'none',
        duration: 1,
      },
      '<'
    );

    // Reveal specs as needle passes
    tl.to('#spec-1', { opacity: 1, duration: 0.1 }, 0.2);
    tl.to('#spec-2', { opacity: 1, duration: 0.1 }, 0.5);
    tl.to('#spec-3', { opacity: 1, duration: 0.1 }, 0.8);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      id="ch08"
      className="chapter-section h-screen bg-neutral-900 overflow-hidden"
      data-title="CRAFT"
    >
      <div className="container mx-auto h-full flex items-center justify-center relative">
        {/* SVG Seam Interaction */}
        <div className="relative w-full max-w-3xl aspect-video border border-white/5 bg-white/5 rounded-lg p-10">
          <h3 className="absolute top-6 left-6 font-mono text-xs text-hundred-red uppercase">
            Technical Specifications
          </h3>

          <div className="grid grid-cols-2 h-full">
            <div className="flex flex-col justify-center space-y-8 pr-10">
              {specs.map((spec) => (
                <div
                  key={spec.id}
                  id={spec.id}
                  className="spec-item opacity-30 transition-opacity duration-300"
                >
                  <h4 className="font-display text-2xl">{spec.title}</h4>
                  <p className="text-xs text-gray-400">{spec.desc}</p>
                </div>
              ))}
            </div>
            <div className="relative flex items-center justify-center">
              {/* Seam Path Animation */}
              <svg className="w-full h-full absolute inset-0" viewBox="0 0 300 300">
                <path
                  id="seam-path"
                  d="M150,20 C150,20 180,50 150,80 C120,110 180,140 150,170 C120,200 180,230 150,260"
                  stroke="#333"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5,5"
                />
                <path
                  ref={threadRef}
                  d="M150,20 C150,20 180,50 150,80 C120,110 180,140 150,170 C120,200 180,230 150,260"
                  stroke="#cc1100"
                  strokeWidth="2"
                  fill="none"
                />

                {/* Needle */}
                <g ref={needleRef}>
                  <rect x="-1" y="-10" width="2" height="20" fill="#eee" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
