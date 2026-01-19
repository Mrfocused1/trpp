'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const codeItems = [
  { title: 'Consistency', number: '001' },
  { title: 'Loyalty', number: '002' },
  { title: 'Craft', number: '003' },
];

export default function Chapter03Code() {
  useEffect(() => {
    gsap.from('.code-item', {
      y: 50,
      opacity: 0,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '#ch03',
        start: 'top 60%',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      id="ch03"
      className="chapter-section flex flex-col justify-center items-center bg-hundred-black py-24"
      data-title="THE CODE"
    >
      <div className="container mx-auto px-6">
        <div className="space-y-0">
          {codeItems.map((item, index) => (
            <div
              key={item.number}
              className={`code-item group ${
                index === 0 ? 'border-t' : ''
              } border-b border-white/20 py-10 flex justify-between items-center cursor-hover hover:bg-white/5 transition-colors`}
            >
              <span className="font-display text-5xl md:text-8xl font-bold uppercase text-gray-500 group-hover:text-white transition-colors duration-500">
                {item.title}
              </span>
              <span className="font-mono text-sm text-hundred-red opacity-0 group-hover:opacity-100 transition-opacity">
                {item.number}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
