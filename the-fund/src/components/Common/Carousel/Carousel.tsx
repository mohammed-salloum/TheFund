import React, { useRef, useState, useEffect } from "react";
import type { ReactNode } from "react";
import "./Carousel.css";

interface CarouselProps {
  children: ReactNode[];
  slidesPerView?: number; // عدد العناصر في كل slide
  rtl?: boolean;
  autoPlayInterval?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  slidesPerView = 1,
  rtl = false,
  autoPlayInterval = 5000,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // إجمالي عدد الـ slides حسب slidesPerView
  const totalSlides = Math.ceil(children.length / slidesPerView);

  // التشغيل التلقائي
  useEffect(() => {
    if (totalSlides <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [totalSlides, autoPlayInterval]);

  const getTranslateX = () => {
    if (!carouselRef.current) return 0;
    const card = carouselRef.current.querySelector<HTMLDivElement>(".feature-card");
    if (!card) return 0;
    const gap = parseFloat(window.getComputedStyle(carouselRef.current).gap) || 0;
    const cardWidth = card.offsetWidth + gap;
    return currentSlide * cardWidth * slidesPerView;
  };

  return (
    <div className="features-carousel-wrapper">
      <div
        className={`features-carousel ${rtl ? "rtl-mode" : ""}`}
        ref={carouselRef}
        style={{
          transform: rtl
            ? `translateX(${getTranslateX()}px)`
            : `translateX(-${getTranslateX()}px)`,
        }}
      >
        {children}
      </div>

      {totalSlides > 1 && (
        <div className="carousel-dots">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <span
              key={i}
              className={`dot ${i === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(i)}
            ></span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
