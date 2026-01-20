'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface HUDProps {
  totalChapters: number;
}

export default function HUD({ totalChapters }: HUDProps) {
  const [currentChapter, setCurrentChapter] = useState({ index: 0, title: 'THE STAMP' });
  const [progress, setProgress] = useState(0);
  const [showShop, setShowShop] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chapters = document.querySelectorAll('.chapter-section, #ch06-wrapper');

    chapters.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section as HTMLElement,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => updateChapter(index, section),
        onEnterBack: () => updateChapter(index, section),
      });
    });

    function updateChapter(index: number, section: Element) {
      const title = section.getAttribute('data-title') || 'CHAPTER';
      setCurrentChapter({ index, title });

      const percent = ((index + 1) / totalChapters) * 100;
      setProgress(percent);

      // Pulse stamp animation
      if (stampRef.current) {
        gsap.fromTo(
          stampRef.current,
          { scale: 1.5, opacity: 1 },
          { scale: 1, opacity: 0, duration: 0.5 }
        );
      }

      // Show CTAs based on chapter
      setShowShop(index > 5);
      setShowJoin(index > 7);
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [totalChapters]);

  useEffect(() => {
    if (progressRef.current) {
      gsap.to(progressRef.current, { width: `${progress}%`, duration: 0.5 });
    }
  }, [progress]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-start mix-blend-difference text-white">
      <div className="flex flex-col">
        <div className="relative w-24 h-8">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHGoqE8W0VyW9wSDsDhU9JgoFaZcKLzwaExw&s"
            alt="Trapstar Logo"
            fill
            className="object-contain object-left"
            priority
          />
        </div>
      </div>

      <div className="flex flex-col items-end">
        <div className="flex items-center gap-4">
          <a
            href="#join"
            className={`cursor-hover text-sm font-medium tracking-wide hover:text-hundred-red transition-all duration-500 ${
              showJoin ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            JOIN DROP
          </a>
          <a
            href="#shop"
            className={`cursor-hover text-sm font-bold tracking-wide bg-white text-black px-4 py-1 hover:bg-hundred-red hover:text-white transition-all duration-500 ${
              showShop ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            SHOP
          </a>
        </div>

        {/* Route Progress Line */}
        <div className="mt-4 w-32 h-[1px] bg-white/20 relative">
          <div
            ref={progressRef}
            className="absolute top-0 left-0 h-full bg-hundred-red w-0"
          />
          {/* Mini Stamp */}
          <div
            ref={stampRef}
            className="absolute top-1/2 -translate-y-1/2 right-0 w-3 h-3 border border-white rounded-full flex items-center justify-center opacity-0"
          >
            <div className="w-1 h-1 bg-hundred-red rounded-full" />
          </div>
        </div>
      </div>
    </nav>
  );
}
