'use client';
import { useEffect, useState } from 'react';
import styles from './ImageCarousel.module.css';

interface ImageCarouselProps {
  images: { src: string; alt: string }[];
  interval?: number;
}

export default function ImageCarousel({ images, interval = 5000 }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsTransitioning(false);
      }, 1000); // Match this with CSS animation duration
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className={styles.carousel}>
      <div className={styles.carouselTrack}>
        {images.map((image, index) => {
          const position = (index - currentIndex + images.length) % images.length;
          return (
            <div
              key={image.src}
              className={`${styles.slide} ${isTransitioning ? styles.transitioning : ''}`}
              style={{
                '--position': position,
                '--total': images.length,
              } as React.CSSProperties}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={styles.image}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
