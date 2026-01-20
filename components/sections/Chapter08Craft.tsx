'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const specs = [
  { id: 'spec-1', title: '480GSM FLEECE', desc: 'Heavyweight for winter streets.' },
  { id: 'spec-2', title: 'REVERSE WEAVE', desc: 'Prevents vertical shrinkage.' },
  { id: 'spec-3', title: 'DOUBLE STITCH', desc: 'Reinforced seams for durability.' },
];

export default function Chapter08Craft() {
  const whiteJacketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const whiteJacket = whiteJacketRef.current;

    if (!whiteJacket) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#ch08',
        start: 'top top',
        end: '+=1500',
        scrub: 1,
        pin: true,
        pinSpacing: true,
        id: 'tech-specs-reveal',
        anticipatePin: 1,
      },
    });

    // Reveal white jacket from bottom to top like rising temperature
    tl.fromTo(
      whiteJacket,
      { clipPath: 'inset(100% 0 0 0)' },
      { clipPath: 'inset(0% 0 0 0)', ease: 'none' }
    );

    // Reveal specs as temperature rises
    tl.to('#spec-1', { opacity: 1, duration: 0.1 }, 0.2);
    tl.to('#spec-2', { opacity: 1, duration: 0.1 }, 0.5);
    tl.to('#spec-3', { opacity: 1, duration: 0.1 }, 0.8);

    return () => {
      tl.kill();
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, []);

  return (
    <section
      id="ch08"
      className="chapter-section h-screen bg-neutral-900 overflow-hidden"
      data-title="CRAFT"
    >
      <div className="container mx-auto h-full flex items-center justify-center relative px-4">
        {/* SVG Seam Interaction */}
        <div className="relative w-full max-w-3xl md:aspect-video border border-white/5 bg-white/5 rounded-lg p-6 md:p-10">
          <h3 className="font-mono text-xs text-hundred-red uppercase mb-6 md:mb-0 md:absolute md:top-6 md:left-6">
            Technical Specifications
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 h-full">
            <div className="flex flex-col justify-center space-y-6 md:space-y-8 md:pr-10 order-2 md:order-1">
              {specs.map((spec) => (
                <div
                  key={spec.id}
                  id={spec.id}
                  className="spec-item opacity-30 transition-opacity duration-300"
                >
                  <h4 className="font-display text-xl md:text-2xl">{spec.title}</h4>
                  <p className="text-sm md:text-xs text-gray-400">{spec.desc}</p>
                </div>
              ))}
            </div>
            <div className="relative flex items-center justify-center min-h-[300px] md:min-h-0 order-1 md:order-2">
              {/* Base Jacket - Dark Gray */}
              <div className="absolute inset-0 opacity-40">
                <Image
                  src="/images/jacket.svg"
                  alt="Jacket Base"
                  fill
                  className="object-contain"
                  style={{ filter: 'brightness(0.4) contrast(1.5)' }}
                />
              </div>

              {/* White Jacket - Revealed on Scroll (Rising Temperature) */}
              <div
                ref={whiteJacketRef}
                className="absolute inset-0"
                style={{ clipPath: 'inset(100% 0 0 0)' }}
              >
                <Image
                  src="/images/jacket.svg"
                  alt="Jacket Heated"
                  fill
                  className="object-contain"
                  style={{
                    filter: 'brightness(20) saturate(0) contrast(2)',
                    mixBlendMode: 'screen'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
