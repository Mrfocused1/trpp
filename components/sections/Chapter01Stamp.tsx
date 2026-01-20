'use client';

import { useEffect, useRef, useCallback } from 'react';
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

  // Refs for smooth video playback
  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const isVideoReadyRef = useRef(false);

  // Lerp function for smooth interpolation
  const lerp = useCallback((start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  }, []);

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

    // Smooth video time update using requestAnimationFrame with lerp
    const updateVideoTime = () => {
      if (!video || !isVideoReadyRef.current) {
        rafIdRef.current = requestAnimationFrame(updateVideoTime);
        return;
      }

      // Lerp factor - higher = more responsive, lower = smoother
      // 0.1 provides very smooth interpolation
      const lerpFactor = 0.1;

      // Smoothly interpolate current time towards target
      currentTimeRef.current = lerp(
        currentTimeRef.current,
        targetTimeRef.current,
        lerpFactor
      );

      // Only update video if the difference is significant (avoid micro-updates)
      const timeDiff = Math.abs(video.currentTime - currentTimeRef.current);
      if (timeDiff > 0.01) {
        // Clamp to valid range
        const clampedTime = Math.max(0, Math.min(currentTimeRef.current, video.duration || 0));
        video.currentTime = clampedTime;
      }

      rafIdRef.current = requestAnimationFrame(updateVideoTime);
    };

    // Start the animation loop
    rafIdRef.current = requestAnimationFrame(updateVideoTime);

    // Ensure video is loaded and ready
    const onVideoReady = () => {
      video.pause();
      video.currentTime = 0;
      currentTimeRef.current = 0;
      targetTimeRef.current = 0;
      isVideoReadyRef.current = true;
      ScrollTrigger.refresh();
    };

    if (video.readyState >= 3) {
      // HAVE_FUTURE_DATA or better
      onVideoReady();
    } else {
      video.addEventListener('canplay', onVideoReady, { once: true });
    }

    // iOS requires user interaction to enable video
    const enableVideoOnInteraction = () => {
      if (!hasInteractedRef.current && isMobile) {
        hasInteractedRef.current = true;
        // Create a short play to unlock video on iOS
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            video.pause();
            video.currentTime = 0;
            isVideoReadyRef.current = true;
          }).catch(() => {
            // Video autoplay blocked, will work with scroll after interaction
            isVideoReadyRef.current = true;
          });
        }
      }
    };

    // Add interaction listeners for iOS
    if (isMobile) {
      document.addEventListener('touchstart', enableVideoOnInteraction, { once: true, passive: true });
      document.addEventListener('click', enableVideoOnInteraction, { once: true });
    }

    // Ensure video is visible initially
    gsap.set(videoContainer, { opacity: 1, scale: 1 });

    // Get video duration with fallback
    const getVideoDuration = () => video.duration || 10.8;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#ch01',
        start: 'top top',
        end: isMobile ? '+=100%' : '+=150%',
        // Higher scrub value for smoother interpolation with Lenis
        scrub: 1.5,
        pin: true,
      },
    });

    // Create a proxy object for GSAP to animate
    const videoProgress = { value: 0 };

    // Animate video progress based on scroll (0 to 0.5 of timeline)
    tl.to(videoProgress, {
      value: 1,
      duration: 0.5,
      ease: 'none',
      onUpdate: () => {
        // Set target time - the RAF loop will smoothly interpolate to this
        targetTimeRef.current = videoProgress.value * getVideoDuration();
      }
    })
      // Fade out and scale video container (0.5 to 0.6)
      .to(videoContainer, { opacity: 0, scale: 1.2, duration: 0.1 }, 0.5)
      // Fade in content (0.6 to 0.7)
      .to(content, { opacity: 1, duration: 0.1 }, 0.6)
      // Flicker effect on logo (0.7 to 0.75)
      .to(logo, { opacity: 1, duration: 0.05 }, 0.7)
      // Slam solid (0.75 to 0.8)
      .to(
        logo,
        {
          webkitTextStroke: '0px white',
          color: 'white',
          scale: 1.05,
          ease: 'elastic.out(1, 0.3)',
        },
        0.75
      )
      // Line animation (0.8 to 1)
      .fromTo(
        line,
        { strokeDasharray: 1000, strokeDashoffset: 1000 },
        { strokeDashoffset: 0, duration: 0.2, ease: 'power2.inOut' },
        0.8
      );

    // Separate looping animation for scroll indicator
    gsap.to(scrollIndicator, {
      y: 10,
      duration: 1.5,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
    });

    return () => {
      // Cancel animation frame
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      tl.kill();
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      if (isMobile) {
        document.removeEventListener('touchstart', enableVideoOnInteraction);
        document.removeEventListener('click', enableVideoOnInteraction);
      }
      video.removeEventListener('canplay', onVideoReady);
    };
  }, [lerp]);

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
          preload="auto"
          poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          style={{
            // Force GPU acceleration for smoother rendering
            transform: 'translateZ(0)',
            willChange: 'contents'
          }}
        >
          <source src="/images/trap-intro-optimized.mp4" type="video/mp4" />
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
