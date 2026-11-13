"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function PageHeaderBackground({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia(
      "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let frame: number | null = null;
    let stop = () => {};

    const configure = () => {
      stop();
      if (!media.matches) return;

      const update = () => {
        frame = null;
        const container = containerRef.current;
        const image = imageRef.current;
        if (!container || !image) return;

        const { top, height } = container.getBoundingClientRect();
        const limit = height * 0.2;
        const offset = Math.max(-limit, Math.min(limit, -top * 0.2));
        image.style.transform = `translate3d(0, ${offset}px, 0)`;
      };

      const schedule = () => {
        if (frame === null) frame = window.requestAnimationFrame(update);
      };

      imageRef.current?.style.setProperty("inset", "-25% 0");
      imageRef.current?.style.setProperty("will-change", "transform");
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
      update();

      stop = () => {
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        if (frame !== null) window.cancelAnimationFrame(frame);
        frame = null;
        imageRef.current?.style.removeProperty("transform");
        imageRef.current?.style.removeProperty("inset");
        imageRef.current?.style.removeProperty("will-change");
      };
    };

    configure();
    media.addEventListener("change", configure);
    return () => {
      media.removeEventListener("change", configure);
      stop();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden">
      <div ref={imageRef} className="absolute inset-0">
        <Image src={src} className="object-cover" fill priority sizes="100vw" alt={alt} />
      </div>
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
}
