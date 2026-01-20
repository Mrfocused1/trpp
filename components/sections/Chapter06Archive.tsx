'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Chapter06Archive() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.innerWidth > 768) {
        const horizontalSections = gsap.utils.toArray('#ch06-container > div');
        gsap.to(horizontalSections, {
          xPercent: -100 * (horizontalSections.length - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: '#ch06-wrapper',
            pin: true,
            scrub: 1,
            snap: 1 / (horizontalSections.length - 1),
            end: '+=3000',
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="ch06-wrapper" className="bg-white text-black overflow-hidden" data-title="ARCHIVE">
      <div id="ch06-container" className="flex h-screen w-[400vw] md:w-[400vw]">
        {/* Panel 1 */}
        <div className="w-screen h-full flex items-center justify-center border-r border-black/10 relative">
          <div className="text-center">
            <h3 className="font-display text-9xl font-bold tracking-tighter mb-4">THE ARCHIVE</h3>
            <p className="font-mono text-sm uppercase">Swipe to explore history</p>
          </div>
        </div>

        {/* Panel 2 */}
        <div className="w-screen h-full flex items-center justify-center border-r border-black/10 relative bg-gray-100 p-20">
          <div className="relative w-3/4 h-3/4">
            <Image
              src="https://images.unsplash.com/photo-1549497557-047f078d46db?q=80&w=2670&auto=format&fit=crop"
              alt="Archive 1"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-500 cursor-hover shadow-xl"
            />
          </div>
          <div className="absolute bottom-10 left-10 font-display text-4xl">01. EARLY DAYS</div>
        </div>

        {/* Panel 3 */}
        <div className="w-screen h-full flex items-center justify-center border-r border-black/10 relative bg-gray-50 p-20">
          <div className="relative w-3/4 h-3/4">
            <Image
              src="https://images.unsplash.com/photo-1614713568397-b30b7e6d20cc?q=80&w=2670&auto=format&fit=crop"
              alt="Archive 2"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-500 cursor-hover shadow-xl"
            />
          </div>
          <div className="absolute bottom-10 left-10 font-display text-4xl">02. FIRST RUN</div>
        </div>

        {/* Panel 4 */}
        <div className="w-screen h-full flex items-center justify-center relative bg-black text-white p-20">
          <div className="w-3/4 text-center">
            <h2 className="font-display text-8xl mb-6">BUILT TO LAST</h2>
            <p className="text-xl max-w-2xl mx-auto">
              Every stitch tells a story. Every tear is a memory.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
