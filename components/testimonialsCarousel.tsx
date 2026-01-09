"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);

  // Determine how many cards to show based on screen width
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

  // Auto scroll functionality
  useEffect(() => {
    if (!autoScroll || isHovered || maxIndex === 0) return;

    const interval = setInterval(() => {
      goToNext();
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [autoScroll, autoScrollInterval, isHovered, goToNext, maxIndex]);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const canScrollPrev = currentIndex > 0;
  const canScrollNext = currentIndex < maxIndex;

  return (
    <div
      className="relative w-full max-w-7xl mx-auto px-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
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
              className="flex-shrink-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
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

                {testimonial.rating && (
                  <div className="flex justify-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating!
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300 fill-gray-300 dark:text-gray-600 dark:fill-gray-600"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                )}

                <blockquote className="flex-grow mb-6">
                  <p className="text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300 text-center">
                    "{testimonial.content}"
                  </p>
                </blockquote>

                <div className="flex flex-col items-center gap-3 mt-auto">
                  {testimonial.avatar ? (
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.author}
                      className="h-12 w-12 rounded-full border-2 border-blue-200 dark:border-blue-800 object-cover"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
                        {testimonial.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="text-center">
                    <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                      {testimonial.author}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                      {testimonial.company && ` at ${testimonial.company}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showControls && testimonials.length > cardsVisible && (
          <>
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/90 dark:bg-gray-900/90 hover:bg-white dark:hover:bg-gray-900 backdrop-blur-sm rounded-full shadow-lg p-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              onClick={goToPrevious}
              disabled={!canScrollPrev}
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </button>
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/90 dark:bg-gray-900/90 hover:bg-white dark:hover:bg-gray-900 backdrop-blur-sm rounded-full shadow-lg p-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              onClick={goToNext}
              disabled={!canScrollNext}
              aria-label="Next testimonials"
            >
              <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </button>
          </>
        )}
      </div>

      {testimonials.length > cardsVisible && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-blue-600 dark:bg-blue-400"
                  : "w-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
