'use client';

import { useState } from 'react';
import Image from 'next/image';

const sizes = ['S', 'M', 'L', 'XL'];

export default function Chapter11Shop() {
  const [selectedSize, setSelectedSize] = useState('M');

  const handleAddToCart = () => {
    alert(`Added size ${selectedSize} to cart demo`);
  };

  return (
    <section
      id="ch11"
      className="chapter-section flex items-center justify-center bg-white text-black min-h-screen"
      data-title="SHOP"
    >
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Product Image */}
        <div className="relative aspect-square bg-gray-100 flex items-center justify-center overflow-hidden p-12">
          <div className="relative w-full h-full">
            <Image
              src="/images/core-hoodie.jpg"
              alt="Shop Hoodie"
              fill
              className="object-contain mix-blend-multiply"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-8">
          <div>
            <h2 className="font-display text-5xl md:text-6xl font-bold tracking-tighter leading-tight">
              TRAPSTAR IRONGATE HOODED PUFFER JACKET
            </h2>
            <p className="font-mono text-gray-500">IRONGATE / BLACK</p>
            <p className="font-display text-4xl mt-2 font-bold">£250</p>
          </div>

          <div className="space-y-4">
            <p className="font-bold text-sm uppercase">Select Size</p>
            <div className="flex gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 border border-black flex items-center justify-center transition-colors cursor-hover ${
                    selectedSize === size
                      ? 'bg-black text-white'
                      : 'hover:bg-black hover:text-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-black/10">
            <button
              onClick={handleAddToCart}
              className="w-full bg-hundred-red text-white font-display text-2xl py-4 hover:bg-black transition-colors duration-300 cursor-hover"
            >
              ADD TO BAG
            </button>
            <p className="text-center text-xs mt-2 text-gray-500">Free shipping UK wide.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
