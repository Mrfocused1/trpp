'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Chapter01Stamp() {
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const hasInteractedRef = useRef(false);

  useEffect(() => {
    const logo = logoRef.current;
    const line = lineRef.current;
    const video = videoRef.current;
    const videoContainer = videoContainerRef.current;
    const content = contentRef.current;
    const scrollIndicator = scrollIndicatorRef.current;

    if (!logo || !line || !video || !videoContainer || !content || !scrollIndicator) return;

    // Mobile detection
    const isMobile = window.innerWidth < 768;

    // Ensure video is loaded and ready
    const loadVideo = () => {
      if (video.readyState >= 2) {
        // Video has loaded enough to start
        video.pause();
        video.currentTime = 0;
      } else {
        // Wait for video to load
        video.addEventListener('loadeddata', () => {
          video.pause();
          video.currentTime = 0;
        }, { once: true });
      }
    };

    loadVideo();

    // iOS requires user interaction to enable video
    const enableVideoOnInteraction = () => {
      if (!hasInteractedRef.current && isMobile) {
        hasInteractedRef.current = true;
        video.load();
        video.play().then(() => {
          video.pause();
          video.currentTime = 0;
        }).catch(() => {
          // Video autoplay blocked, will work with scroll
        });
      }
    };

    // Add interaction listeners for iOS
    if (isMobile) {
      document.addEventListener('touchstart', enableVideoOnInteraction, { once: true });
      document.addEventListener('click', enableVideoOnInteraction, { once: true });
    }

    // Ensure video is visible initially
    gsap.set(videoContainer, { opacity: 1, scale: 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#ch01',
        start: 'top top',
        end: isMobile ? '+=100%' : '+=150%',
        scrub: 1,
        pin: true,
      },
    });

    // Play video based on scroll (0 to 0.4 of timeline)
    tl.to(video, {
      currentTime: video.duration || 3,
      duration: 0.4,
      ease: 'none',
    })
      // Fade out and scale video container (0.4 to 0.5)
      .to(videoContainer, { opacity: 0, scale: 1.2, duration: 0.1 }, 0.4)
      // Fade in content (0.5 to 0.6)
      .to(content, { opacity: 1, duration: 0.1 }, 0.5)
      // Flicker effect on logo (0.6 to 0.65)
      .to(logo, { opacity: 1, duration: 0.05 }, 0.6)
      // Slam solid (0.65 to 0.7)
      .to(
        logo,
        {
          webkitTextStroke: '0px white',
          color: 'white',
          scale: 1.05,
          ease: 'elastic.out(1, 0.3)',
        },
        0.65
      )
      // Line animation (0.7 to 1)
      .fromTo(
        line,
        { strokeDasharray: 1000, strokeDashoffset: 1000 },
        { strokeDashoffset: 0, duration: 0.3, ease: 'power2.inOut' },
        0.7
      );

    // Separate looping animation for scroll indicator
    gsap.to(scrollIndicator, {
      y: 10,
      duration: 1.5,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
    });

    // Load video metadata
    video.addEventListener('loadedmetadata', () => {
      ScrollTrigger.refresh();
    });

    return () => {
      tl.kill();
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      if (isMobile) {
        document.removeEventListener('touchstart', enableVideoOnInteraction);
        document.removeEventListener('click', enableVideoOnInteraction);
      }
    };
  }, []);

  return (
    <section
      id="ch01"
      className="chapter-section flex items-center justify-center bg-hundred-black relative overflow-hidden"
      data-title="THE STAMP"
    >
      {/* Video Intro Animation - Scroll Controlled */}
      <div
        ref={videoContainerRef}
        className="absolute inset-0 z-20 flex items-center justify-center bg-hundred-black"
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          playsInline
          preload="metadata"
          poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        >
          <source src="/images/trap-intro.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Background texture */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Image
          src="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=2574&auto=format&fit=crop"
          alt="Street Texture"
          fill
          className="object-cover grayscale brightness-50"
          priority
        />
      </div>

      {/* Content that appears after video */}
      <div ref={contentRef} className="z-10 text-center relative px-4 opacity-0">
        {/* Glitchy Logo */}
        <div>
          <div
            ref={logoRef}
            className="font-display text-[12vw] md:text-[10vw] leading-tight font-bold tracking-tighter text-transparent"
            style={{ WebkitTextStroke: '2px white', opacity: 0 }}
          >
            TRAPSTAR
          </div>
        </div>
      </div>

      {/* Animated Route Line SVG */}
      <svg
        className="absolute bottom-10 left-0 w-full h-24 stroke-white/20 z-10"
        preserveAspectRatio="none"
      >
        <path
          ref={lineRef}
          d="M0,12 L500,12"
          fill="none"
          strokeWidth="1"
        />
      </svg>

      {/* Scroll Down Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
      >
        <p className="text-white/40 text-xs font-mono uppercase tracking-widest">Scroll Down</p>
        <div className="w-px h-12 bg-white/20"></div>
      </div>
    </section>
  );
}
