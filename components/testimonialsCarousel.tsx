"use client";

import { useState, useEffect, useCallback, useRef, TouchEvent } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export interface Testimonial {
  id: string;
  content: string;
  author: string;
  role: string;
  company?: string;
  avatar?: string;
  rating?: number;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  autoScroll?: boolean;
  autoScrollInterval?: number;
  showControls?: boolean;
  cardsPerView?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
}

export function TestimonialsCarousel({
  testimonials,
  autoScroll = false,
  autoScrollInterval = 5000,
  showControls = true,
  cardsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  },
}: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(cardsPerView.desktop || 3);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance (in px) to trigger a slide change
  const minSwipeDistance = 50;

  useEffect(() => {
    const updateCardsVisible = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setCardsVisible(cardsPerView.mobile || 1);
      } else if (width < 1024) {
        setCardsVisible(cardsPerView.tablet || 2);
      } else {
        setCardsVisible(cardsPerView.desktop || 3);
      }
    };

    updateCardsVisible();
    window.addEventListener("resize", updateCardsVisible);
    return () => window.removeEventListener("resize", updateCardsVisible);
  }, [cardsPerView]);

  const maxIndex = Math.max(0, testimonials.length - cardsVisible);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  }, [maxIndex]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1));
  };

  // Touch Handlers for Mobile Swipe
  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < maxIndex) {
      goToNext();
    } else if (isRightSwipe && currentIndex > 0) {
      goToPrevious();
    }
  };

  useEffect(() => {
    if (!autoScroll || isHovered || maxIndex === 0) return;
    const interval = setInterval(goToNext, autoScrollInterval);
    return () => clearInterval(interval);
  }, [autoScroll, autoScrollInterval, isHovered, goToNext, maxIndex]);

  if (!testimonials || testimonials.length === 0) return null;

  const canScrollPrev = currentIndex > 0;
  const canScrollNext = currentIndex < maxIndex;

  return (
    /* Increased px-4 to px-12 to provide breathing room for the arrows */
    <div
      className="relative w-full max-w-7xl mx-auto px-12"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div
          className="overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            ref={containerRef}
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / cardsVisible)}%)`,
            }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-shrink-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-md"
                style={{
                  width: `calc(${100 / cardsVisible}% - ${
                    (cardsVisible - 1) * 1.5
                  }rem / ${cardsVisible})`,
                }}
              >
                <div className="p-6 h-full flex flex-col">
                  <div className="mb-4 flex justify-center">
                    <div className="rounded-full bg-blue-50 dark:bg-blue-900/20 p-2">
                      <Quote className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>

                  <blockquote className="flex-grow mb-6">
                    <p className="text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300 text-center">
                      "{testimonial.content}"
                    </p>
                  </blockquote>

                  <div className="flex flex-col items-center gap-3 mt-auto">
                    <div className="text-center">
                      <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                        {testimonial.author}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showControls && testimonials.length > cardsVisible && (
          <>
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full shadow-lg p-2 disabled:opacity-30 transition-all hover:bg-gray-50 dark:hover:bg-gray-800 z-10"
              onClick={goToPrevious}
              disabled={!canScrollPrev}
            >
              <ChevronLeft className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </button>
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full shadow-lg p-2 disabled:opacity-30 transition-all hover:bg-gray-50 dark:hover:bg-gray-800 z-10"
              onClick={goToNext}
              disabled={!canScrollNext}
            >
              <ChevronRight className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </button>
          </>
        )}
      </div>

      {/* Dots Indicator */}
      {testimonials.length > cardsVisible && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "w-8 bg-blue-600" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
