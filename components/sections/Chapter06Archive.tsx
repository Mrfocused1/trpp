'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Chapter06Archive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const container = containerRef.current;

    if (!wrapper || !container) return;

    const setupAnimation = () => {
      const isMobile = window.innerWidth <= 768;
      const panels = gsap.utils.toArray<HTMLElement>('#ch06-container > div');

      if (panels.length === 0) {
        console.warn('No panels found for archive horizontal scroll');
        return;
      }

      // Calculate total scroll distance
      const totalWidth = container.scrollWidth;
      const viewportWidth = window.innerWidth;
      const scrollDistance = totalWidth - viewportWidth;

      if (isMobile) {
        // On mobile, native horizontal scroll is handled by Tailwind classes
        // snap-x snap-mandatory on wrapper, snap-start on panels
        // No ScrollTrigger needed
      } else {
        // On desktop, use horizontal scroll animation
        gsap.to(container, {
          x: () => -scrollDistance,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper,
            pin: wrapper,
            scrub: 1,
            start: 'center center',
            end: () => `+=${totalWidth}`,
            invalidateOnRefresh: true,
            id: 'archive-horizontal-scroll',
          },
        });
      }
    };

    // Setup with a small delay to ensure DOM is ready
    const timer = setTimeout(setupAnimation, 200);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.id === 'archive-horizontal-scroll') {
          st.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={wrapperRef}
      id="ch06-wrapper"
      className="bg-white text-black overflow-x-auto md:overflow-hidden h-screen snap-x snap-mandatory md:snap-none"
      data-title="ARCHIVE"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      <div
        ref={containerRef}
        id="ch06-container"
        className="flex h-screen w-[400vw] md:w-[400vw]"
      >
        {/* Panel 1 */}
        <div className="w-screen h-full flex items-center justify-center border-r border-black/10 relative snap-start">
          <div className="text-center">
            <h3 className="font-display text-9xl font-bold tracking-tighter mb-4">THE ARCHIVE</h3>
            <p className="font-mono text-sm uppercase">Swipe to explore history</p>
          </div>
        </div>

        {/* Panel 2 */}
        <div className="w-screen h-full flex items-center justify-center border-r border-black/10 relative bg-gray-100 p-20 snap-start">
          <div className="relative w-3/4 h-3/4">
            <Image
              src="https://uk.trapstarlondon.com/cdn/shop/files/Jacket.jpg?v=1766750491&width=3840"
              alt="Archive 1"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-500 cursor-hover shadow-xl"
            />
          </div>
          <div className="absolute bottom-10 left-10 font-display text-4xl">01. EARLY DAYS</div>
        </div>

        {/* Panel 3 */}
        <div className="w-screen h-full flex items-center justify-center border-r border-black/10 relative bg-gray-50 p-20 snap-start">
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
        <div className="w-screen h-full flex items-center justify-center relative bg-black text-white p-20 snap-start">
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
