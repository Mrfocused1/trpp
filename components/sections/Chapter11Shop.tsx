'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const products = [
  {
    id: 1,
    name: 'TRAPSTAR IRONGATE HOODED PUFFER JACKET',
    category: 'IRONGATE / BLACK',
    price: '£250',
    image: '/images/core-hoodie.jpg',
  },
  {
    id: 2,
    name: 'TRAPSTAR DECODED HOODIE',
    category: 'DECODED / NAVY',
    price: '£180',
    image: 'https://uk.trapstarlondon.com/cdn/shop/files/Jacket.jpg?v=1766750491&width=3840',
  },
  {
    id: 3,
    name: 'TRAPSTAR SIGNATURE TRACKSUIT',
    category: 'SIGNATURE / BLACK',
    price: '£320',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=2787&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'TRAPSTAR SHOOTER VEST',
    category: 'SHOOTER / CAMO',
    price: '£200',
    image: 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?q=80&w=2787&auto=format&fit=crop',
  },
];

export default function Chapter11Shop() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const strip = stripRef.current;

    if (!wrapper || !strip) return;

    // Feature detection: check for touch capability and small viewport
    const isMobile = 'ontouchstart' in window && window.innerWidth <= 768;

    if (isMobile) {
      // On mobile, enable native horizontal scroll
      wrapper.style.overflowX = 'auto';
      wrapper.style.scrollSnapType = 'x mandatory';
      const productCards = wrapper.querySelectorAll('.product-card');
      productCards.forEach((card) => {
        (card as HTMLElement).style.scrollSnapAlign = 'start';
      });
    } else {
      // On desktop, use GSAP horizontal scroll
      let pinWrapWidth: number;
      let horizontalScrollLength: number;

      const refresh = () => {
        pinWrapWidth = strip.scrollWidth;
        horizontalScrollLength = pinWrapWidth - window.innerWidth;
      };

      refresh();

      // Pinning and horizontal scrolling
      gsap.to(strip, {
        scrollTrigger: {
          scrub: true,
          trigger: wrapper,
          pin: wrapper,
          start: 'center center',
          end: () => `+=${pinWrapWidth}`,
          invalidateOnRefresh: true,
          id: 'shop-horizontal-scroll',
        },
        x: () => -horizontalScrollLength,
        ease: 'none',
      });

      ScrollTrigger.addEventListener('refreshInit', refresh);
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.id === 'shop-horizontal-scroll') {
          st.kill();
        }
      });
    };
  }, []);

  return (
    <section
      id="ch11"
      className="bg-white text-black min-h-screen overflow-x-auto md:overflow-hidden"
      data-title="SHOP"
      data-lenis-prevent
    >
      <div
        ref={wrapperRef}
        className="horiz-gallery-wrapper h-screen overflow-x-auto md:overflow-hidden snap-x snap-mandatory md:snap-none"
        data-lenis-prevent-touch
        style={{
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-x pan-y',
          overscrollBehaviorX: 'contain'
        }}
      >
        <div
          ref={stripRef}
          className="horiz-gallery-strip flex flex-nowrap will-change-transform w-[400vw]"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card w-screen min-w-screen h-screen flex-shrink-0 flex items-center justify-center p-8 md:p-20 snap-start"
            >
              <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-100 flex items-center justify-center overflow-hidden p-8 md:p-12">
                  <div className="relative w-full h-full">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Product Details */}
                <div className="space-y-6 md:space-y-8">
                  <div>
                    <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tighter leading-tight">
                      {product.name}
                    </h2>
                    <p className="font-mono text-sm text-gray-500 mt-2">{product.category}</p>
                    <p className="font-display text-3xl md:text-4xl mt-4 font-bold">{product.price}</p>
                  </div>

                  <button className="w-full bg-hundred-red text-white font-display text-xl md:text-2xl py-3 md:py-4 hover:bg-black transition-colors duration-300 cursor-hover">
                    SHOP NOW
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
