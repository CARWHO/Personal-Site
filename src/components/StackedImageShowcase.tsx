'use client';
import { useState } from 'react';
import styles from './StackedImageShowcase.module.css';

interface StackedImageShowcaseProps {
  images: { src: string; alt: string }[];
}

export default function StackedImageShowcase({ images }: StackedImageShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      {images.map((image, index) => (
        <div
          key={image.src}
          className={styles.imageWrapper}
          style={{
            zIndex: images.length - index,
            opacity: index === currentIndex ? 1 : 0.8,
            transform: `translate(${index * 10}px, ${index * 10}px) scale(${1 - index * 0.05})`,
          }}
        >
          <img
            src={image.src}
            alt={image.alt}
            className={styles.image}
          />
        </div>
      ))}
    </div>
  );
}
