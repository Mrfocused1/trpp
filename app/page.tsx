'use client';

import CustomCursor from '@/components/ui/CustomCursor';
import LoadingScreen from '@/components/ui/LoadingScreen';
import HUD from '@/components/ui/HUD';
import NoiseOverlay from '@/components/ui/NoiseOverlay';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';

import Chapter01Stamp from '@/components/sections/Chapter01Stamp';
import Chapter02Ends from '@/components/sections/Chapter02Ends';
import Chapter03Code from '@/components/sections/Chapter03Code';
import Chapter04Route from '@/components/sections/Chapter04Route';
import Chapter05Sound from '@/components/sections/Chapter05Sound';
import Chapter11Shop from '@/components/sections/Chapter11Shop';
import Chapter12SignOff from '@/components/sections/Chapter12SignOff';

const TOTAL_CHAPTERS = 10;

export default function Home() {
  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <LoadingScreen />
      <NoiseOverlay />
      <HUD totalChapters={TOTAL_CHAPTERS} />

      <main id="smooth-wrapper">
        <div id="smooth-content">
          <Chapter01Stamp />
          <Chapter02Ends />
          <Chapter03Code />
          <Chapter04Route />
          <Chapter05Sound />
          <Chapter11Shop />
          <Chapter12SignOff />
        </div>
      </main>
    </SmoothScrollProvider>
  );
}
