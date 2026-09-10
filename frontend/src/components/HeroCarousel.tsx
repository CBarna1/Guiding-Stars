import { useEffect, useRef, useState, type ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import SparkleField from './SparkleField';
import Tooltip from './Tooltip';
import { DEFAULT_HERO_IMAGES } from '../constants/heroImages';

interface HeroCarouselProps {
  images?: string[];
  children: ReactNode;
  sparkles?: boolean;
}

const SWIPE_THRESHOLD = 50;

const HeroCarousel = ({ images = DEFAULT_HERO_IMAGES, children, sparkles = true }: HeroCarouselProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
      if (deltaX < 0) handleNextImage();
      else handlePrevImage();
    }
    touchStartX.current = null;
  };

  return (
    <section className="relative" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      {/* Carousel Images */}
      <div className="relative overflow-hidden">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Hero Banner ${index + 1}`}
            className={`w-full h-[60vh] md:h-[80vh] object-cover brightness-75 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0 absolute'
            }`}
            loading="lazy"
          />
        ))}
      </div>

      {sparkles && <SparkleField />}

      {/* Navigation Buttons */}
      <Tooltip label="Previous slide" className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20">
        <button
          onClick={handlePrevImage}
          className="btn-tactile bg-white bg-opacity-50 hover:bg-opacity-75 transition rounded-full p-3 text-gray-900"
          aria-label="Previous image"
        >
          <FontAwesomeIcon icon={faChevronLeft} size="lg" />
        </button>
      </Tooltip>
      <Tooltip label="Next slide" className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20">
        <button
          onClick={handleNextImage}
          className="btn-tactile bg-white bg-opacity-50 hover:bg-opacity-75 transition rounded-full p-3 text-gray-900"
          aria-label="Next image"
        >
          <FontAwesomeIcon icon={faChevronRight} size="lg" />
        </button>
      </Tooltip>

      {/* Carousel Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`btn-tactile w-3 h-3 rounded-full transition ${
              index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-10 flex items-center justify-center text-center text-white px-4">
        <div className="w-full max-w-4xl">{children}</div>
      </div>
    </section>
  );
};

export default HeroCarousel;
