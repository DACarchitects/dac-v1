"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import styles from "./heroSlideshow.module.css";

const motionPresets = {
  "zoom-in": ["scale(1.02)", "scale(1.13)"],
  "zoom-out": ["scale(1.13)", "scale(1.02)"],
  "zoom-out-diagonal-left-down": [
    "translate(4%, -4%) scale(1.13)",
    "translate(0, 0) scale(1.02)",
  ],
  "zoom-out-diagonal-right-down": [
    "translate(-4%, -4%) scale(1.13)",
    "translate(0, 0) scale(1.02)",
  ],
  "zoom-out-diagonal-left-up": [
    "translate(4%, 4%) scale(1.13)",
    "translate(0, 0) scale(1.02)",
  ],
  "zoom-out-diagonal-right-up": [
    "translate(-4%, 4%) scale(1.13)",
    "translate(0, 0) scale(1.02)",
  ],
  "zoom-in-diagonal-left-down": [
    "translate(0, 0) scale(1.02)",
    "translate(-4%, 4%) scale(1.13)",
  ],
  "zoom-in-diagonal-right-down": [
    "translate(0, 0) scale(1.02)",
    "translate(4%, 4%) scale(1.13)",
  ],
  "zoom-in-diagonal-left-up": [
    "translate(0, 0) scale(1.02)",
    "translate(-4%, -4%) scale(1.13)",
  ],
  "zoom-in-diagonal-right-up": [
    "translate(0, 0) scale(1.02)",
    "translate(4%, -4%) scale(1.13)",
  ],
  "pan-left": ["translateX(4%) scale(1.12)", "translateX(-4%) scale(1.12)"],
  "pan-right": ["translateX(-4%) scale(1.12)", "translateX(4%) scale(1.12)"],
  "pan-up": ["translateY(4%) scale(1.12)", "translateY(-4%) scale(1.12)"],
  "pan-down": ["translateY(-4%) scale(1.12)", "translateY(4%) scale(1.12)"],
} as const;

export type HeroSlide = {
  src: string;
  motion: keyof typeof motionPresets;
  position?: string;
  /** Time in milliseconds before advancing to the next slide. Defaults to 9000. */
  duration?: number;
  /** Pan/zoom speed multiplier: 1 = normal, 0.5 = half speed, 2 = double speed. */
  speed?: number;
};

const defaultSlideDuration = 9000;
const fadeDuration = 2000; // 2-second crossfade (initially 1.2)

function getSlideDuration(slide?: HeroSlide) {
  const duration = slide?.duration;
  return duration !== undefined && Number.isFinite(duration) && duration > 0
    ? duration
    : defaultSlideDuration;
}

function getMotionDuration(slide: HeroSlide) {
  const speed = slide.speed;
  const multiplier = speed !== undefined && Number.isFinite(speed) && speed > 0
    ? speed
    : 1;
  return (getSlideDuration(slide) + fadeDuration) / multiplier;
}

export default function HeroSlideshow({
  slides,
}: {
  slides: readonly HeroSlide[];
}) {
  const heroRef = useRef<HTMLElement>(null);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [paused, setPaused] = useState(false);
  const [current, setCurrent] = useState(0);
  const [outgoing, setOutgoing] = useState<number | null>(null);
  const [upcoming, setUpcoming] = useState(1);
  const [readySequence, setReadySequence] = useState<number | null>(null);
  const [holdComplete, setHoldComplete] = useState(false);

  useEffect(() => {
    const navigation = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    if (navigation?.type !== "reload" || window.location.hash) return;

    // Preserve deeper scroll restoration, but keep a near-top refresh below the nav.
    const restoreTop = () => {
      const hero = heroRef.current;
      if (hero && window.scrollY > 0 && window.scrollY < hero.offsetTop) {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    };
    const frame = window.requestAnimationFrame(restoreTop);
    window.addEventListener("pageshow", restoreTop);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pageshow", restoreTop);
    };
  }, []);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReducedMotion(preference.matches);
    syncPreference();
    preference.addEventListener("change", syncPreference);
    return () => preference.removeEventListener("change", syncPreference);
  }, []);

  const canPlay = slides.length > 1 && !reducedMotion;
  const hasUpcoming = canPlay && upcoming < current + slides.length;
  const slideDuration = getSlideDuration(slides[current % slides.length]);

  useEffect(() => {
    if (!hasUpcoming || paused || holdComplete) return;
    const timeout = window.setTimeout(
      () => setHoldComplete(true),
      slideDuration,
    );
    return () => window.clearTimeout(timeout);
  }, [current, hasUpcoming, holdComplete, paused, slideDuration]);

  useEffect(() => {
    if (!hasUpcoming || paused || !holdComplete || readySequence !== upcoming) {
      return;
    }
    setOutgoing(current);
    setCurrent(upcoming);
    setUpcoming(upcoming + 1);
    setHoldComplete(false);
  }, [current, hasUpcoming, holdComplete, paused, readySequence, upcoming]);

  const visibleSlides = slides.length
    ? [canPlay ? outgoing : null, current, hasUpcoming ? upcoming : null]
    : [];

  return (
    <section ref={heroRef} className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 overflow-hidden bg-neutral-800 [overflow-anchor:none]"
        data-playing={canPlay && !paused}
        style={
          {
            "--hero-fade-duration": `${fadeDuration}ms`,
          } as CSSProperties
        }
      >
        {/* Keep the outgoing image opaque until the incoming image covers it. */}
        {visibleSlides.map((sequence) => {
          if (sequence === null) return null;
          const slide = slides[sequence % slides.length];
          const [from, to] = motionPresets[slide.motion];
          const phase =
            sequence === current
              ? "current"
              : sequence === upcoming
                ? "upcoming"
                : "outgoing";

          return (
            <div
              key={sequence}
              className={styles.slide}
              data-phase={phase}
              data-fade={phase === "current" && outgoing !== null}
            >
              <Image
                src={slide.src}
                alt=""
                fill
                sizes="100vw"
                loading="eager"
                fetchPriority={sequence === 0 ? "high" : "low"}
                className={styles.image}
                data-started={phase !== "upcoming"}
                style={
                  {
                    objectPosition: slide.position,
                    "--hero-motion-duration": `${getMotionDuration(slide)}ms`,
                    "--hero-motion-from": from,
                    "--hero-motion-to": to,
                  } as CSSProperties
                }
                onLoad={
                  phase === "upcoming"
                    ? () => setReadySequence(sequence)
                    : undefined
                }
                onError={() => {
                  if (phase === "upcoming") {
                    setUpcoming((step) =>
                      step === sequence ? step + 1 : step,
                    );
                  }
                }}
              />
            </div>
          );
        })}
        <div className="absolute inset-0 z-20 bg-black/28" />
        <div className="absolute inset-0 z-20 bg-linear-to-b from-transparent via-background/10 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-60 text-center sm:px-8 sm:pb-24 lg:px-12 lg:pb-45">
        <h1
          className="text-balance font-serif text-5xl font-light tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl max-w-3xl"
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
        >
          Design for excellence
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white sm:text-xl md:mt-8 [text-shadow:0_1px_2px_rgba(0,0,0,0.7)]">
          Thoughtful, code-driven architecture focused on constructability,
          clarity, and long-term value.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/contact">Start a Project</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full bg-transparent border-black/70 dark:border-white/70 text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.7)] hover:text-white sm:w-auto"
            asChild
          >
            <a href="#projects">View Work</a>
          </Button>
        </div>
      </div>
      {canPlay && (
        <button
          type="button"
          aria-label={
            paused ? "Play background slideshow" : "Pause background slideshow"
          }
          onClick={() => setPaused((isPaused) => !isPaused)}
          className="absolute right-6 top-5 z-10 grid size-11 place-items-center rounded-full bg-black/65 text-white hover:bg-black/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {paused ? (
            <Play size={18} aria-hidden="true" />
          ) : (
            <Pause size={18} aria-hidden="true" />
          )}
        </button>
      )}
    </section>
  );
}
