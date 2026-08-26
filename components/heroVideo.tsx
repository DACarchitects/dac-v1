"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroVideo() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint is 768px
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const bgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;

    let raf = 0;
    const speed = 0.25; // smaller = subtler

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY * speed;
        el.style.transform = `translate3d(0, ${y}px, 0) scale(1.08)`;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {/* Video for desktop - only render on md screens and above */}
        {!isMobile && (
          <video
            src="https://dacarch.com/wp-content/uploads/2026/08/DAC_HeroVideo.mp4"
            className="h-full w-full object-cover will-change-transform"
            autoPlay
            loop
            muted
          />
        )}
        {/* Video for mobile - only render on mobile */}
        {isMobile && (
          <video
            src="https://dacarch.com/wp-content/uploads/2026/08/DAC_HeroVideo.mp4"
            poster="https://dacarch.com/wp-content/uploads/2026/08/5008-Timberland-Interior.png"
            className="h-full w-full object-cover will-change-transform"
            autoPlay
            loop
            muted
            playsInline
            webkit-playsinline="true"
          />
        )}

        {/* Gradient stays untouched */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/10 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-60 text-center sm:px-8 sm:pb-24 lg:px-12 lg:pb-45">
        <h1
          className="text-balance font-serif text-5xl font-light tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl max-w-3xl"
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
        >
          Design for excellence
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white sm:text-xl md:mt-8">
          Thoughtful, code-driven architecture focused on constructability,
          clarity, and long-term value.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/contact">
            <Button size="lg" className="w-full sm:w-auto">
              Start a Project
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="w-full bg-transparent border-black/70 dark:border-white/70 text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.7)] hover:text-white sm:w-auto"
            style={
              {
                //   borderColor: "black",
                //   backgroundColor: "rgba(1, 1, 1, .1)",
              }
            }
            onClick={(e) => {
              e.preventDefault();
              const projectsSection = document.getElementById("projects");
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            View Work
          </Button>
        </div>
      </div>
    </section>
  );
}
