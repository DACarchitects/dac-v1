"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Loader2, X, ZoomIn } from "lucide-react";
import type { FeaturedMedia } from "@/lib/wordpress.d";

// prefer a generated WordPress size over the full-resolution original
function getImageSrc(image: FeaturedMedia, size: string) {
  return image.media_details?.sizes?.[size]?.source_url ?? image.source_url;
}

export default function ProjectGallery({
  images,
  alt,
}: {
  images: FeaturedMedia[];
  alt: string;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [loadedThumbs, setLoadedThumbs] = useState<Set<number>>(new Set());
  const [mainLoaded, setMainLoaded] = useState(false);

  // reset the spinner whenever the lightbox switches to a new image
  useEffect(() => {
    setMainLoaded(false);
  }, [activeIndex]);

  const showPrev = () =>
    setActiveIndex((i) =>
      i === null ? i : (i - 1 + images.length) % images.length,
    );
  const showNext = () =>
    setActiveIndex((i) => (i === null ? i : (i + 1) % images.length));

  return (
    <Dialog.Root
      open={activeIndex !== null}
      onOpenChange={(open) => !open && setActiveIndex(null)}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 not-prose">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group relative aspect-video overflow-hidden rounded-md border cursor-pointer"
          >
            <Image
              src={getImageSrc(image, "medium")}
              alt={image.alt_text || alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              loading={index < 3 ? "eager" : "lazy"}
              onLoad={() => setLoadedThumbs((prev) => new Set(prev).add(index))}
            />
            {!loadedThumbs.has(index) && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/40">
              <ZoomIn className="h-8 w-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          </button>
        ))}
      </div>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/90 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 focus:outline-none"
          onClick={(e) => {
            // clicking the backdrop (not the image or controls) closes the lightbox
            if (e.target === e.currentTarget) setActiveIndex(null);
          }}
        >
          <Dialog.Title className="sr-only">{alt}</Dialog.Title>

          {activeIndex !== null && (
            <div
              className="relative flex h-full w-full flex-col items-center justify-center gap-2"
              onClick={(e) => {
                if (e.target === e.currentTarget) setActiveIndex(null);
              }}
            >
              <Image
                src={images[activeIndex].source_url}
                alt={images[activeIndex].alt_text || alt}
                width={images[activeIndex].media_details.width}
                height={images[activeIndex].media_details.height}
                sizes="100vw"
                quality={90}
                priority
                className="max-h-[90%] max-w-full w-auto h-auto object-contain"
                onLoad={() => setMainLoaded(true)}
              />
              {!mainLoaded && (
                <Loader2 className="absolute h-10 w-10 animate-spin text-white" />
              )}
              {images[activeIndex].alt_text && (
                <i className="text-sm text-white/80">
                  {images[activeIndex].alt_text}
                </i>
              )}
            </div>
          )}

          <Dialog.Close className="absolute top-4 right-4 rounded-full bg-background/80 p-2 hover:bg-background">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Dialog.Close>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={showPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 hover:bg-background"
              >
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">Previous image</span>
              </button>
              <button
                type="button"
                onClick={showNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 hover:bg-background"
              >
                <ChevronRight className="h-6 w-6" />
                <span className="sr-only">Next image</span>
              </button>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
