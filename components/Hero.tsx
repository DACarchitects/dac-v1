"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

export default function Hero() {
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
        {/* Parallax image */}
        <img
          ref={bgRef}
          src="https://dacarch.com/wp-content/uploads/2026/01/project-rendering.png"
          alt=""
          className="h-full w-full object-cover will-change-transform"
          style={{ transform: "translate3d(0, 0, 0) scale(1.08)" }}
        />

        {/* Gradient stays untouched */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/30 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-60 text-center sm:px-8 sm:pb-24 lg:px-12 lg:pb-45">
        <h1
          className="text-balance font-serif text-5xl font-light tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl max-w-3xl"
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
        >
          Imagine, visualize, and create.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white sm:text-xl md:mt-8">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo officia
          sunt.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="w-full sm:w-auto">
            Get a quote
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto bg-transparent"
          >
            Our Projects
          </Button>
        </div>
      </div>
    </section>
  );
}
