'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const communityMembers = [
  {
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2564&auto=format&fit=crop',
    role: 'Creative Director',
    alt: 'Person 1',
  },
  {
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2574&auto=format&fit=crop',
    role: 'Sound Engineer',
    alt: 'Person 2',
  },
  {
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2664&auto=format&fit=crop',
    role: 'Visual Artist',
    alt: 'Person 3',
  },
];

export default function Chapter09Community() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch('.community-card', {
        start: 'top 80%',
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="ch09"
      className="chapter-section min-h-screen bg-black py-24"
      data-title="COMMUNITY"
    >
      <div className="container mx-auto px-6">
        <h2 className="font-display text-6xl md:text-8xl mb-12 text-center">THE FAMILY</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {communityMembers.map((member, index) => (
            <div
              key={index}
              className="community-card group relative aspect-[3/4] overflow-hidden bg-gray-900 cursor-hover"
            >
              <Image
                src={member.image}
                alt={member.alt}
                fill
                className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div
                  className="font-display text-9xl text-transparent"
                  style={{ WebkitTextStroke: '1px white' }}
                >
                  100
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-red-600 text-white px-2 py-1 text-xs font-bold uppercase translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                {member.role}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
