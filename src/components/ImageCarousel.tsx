'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface ImageCarouselProps {
  images: { src: string; alt: string }[];
  interval?: number;
}

export default function ImageCarousel({ images, interval = 3000 }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%',
      height: '400px',
      borderRadius: '12px',
      overflow: 'hidden'
    }}>
      {images.map((image, index) => (
        <div
          key={image.src}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: index === currentIndex ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
          }}
        >
          <img
            src={image.src}
            alt={image.alt}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '12px'
            }}
          />
        </div>
      ))}
    </div>
  );
}
