'use client';

import { useState } from 'react';

export default function Chapter10Drop() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Email submitted: ${email}`);
    setEmail('');
  };

  return (
    <section
      id="ch10"
      className="chapter-section flex items-center justify-center bg-hundred-charcoal"
      data-title="DROP SYSTEM"
    >
      <div className="container mx-auto max-w-2xl px-6">
        <div className="bg-black border border-white/10 p-8 md:p-12 relative overflow-hidden group hover:border-white/30 transition-colors duration-500">
          {/* UI Console Effect */}
          <div className="absolute top-0 left-0 w-full h-1 bg-hundred-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>

          <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
            <h2 className="font-display text-4xl">SYSTEM STATUS</h2>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="font-mono text-xs text-green-500">ONLINE</span>
            </div>
          </div>

          <div className="space-y-6 font-mono text-sm text-gray-400">
            <div className="flex justify-between items-center cursor-hover hover:text-white transition-colors">
              <span>NEXT DROP</span>
              <span className="text-white">JAN 26 / 20:00 GMT</span>
            </div>
            <div className="flex justify-between items-center cursor-hover hover:text-white transition-colors">
              <span>QUANTITY</span>
              <span className="text-white">LIMITED / 500 UNITS</span>
            </div>
            <div className="flex justify-between items-center cursor-hover hover:text-white transition-colors">
              <span>ACCESS</span>
              <span className="text-white">MEMBERS ONLY</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-12">
            <input
              type="email"
              placeholder="ENTER EMAIL FOR ACCESS"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-white/30 py-2 font-display text-xl focus:outline-none focus:border-hundred-red transition-colors text-white placeholder-gray-600 cursor-hover"
              required
            />
          </form>
        </div>
      </div>
    </section>
  );
}
