'use client';
import styles from './ImageControl.module.css';

interface ImageControlProps {
  images: {
    src: string;
    alt: string;
    position: { x: number; y: number };
    dimensions: { width: number; height: number };
    opacity: number;
  }[];
}

export default function ImageControl({ images }: ImageControlProps) {
  return (
    <div className={styles.container}>
      <div className={styles.imageStack}>
        {images.map((image, index) => (
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            style={{
              position: 'absolute',
              width: `${image.dimensions.width}%`,
              height: `${image.dimensions.height}px`,
              transform: `translate(${image.position.x}px, ${image.position.y}px)`,
              opacity: image.opacity,
              objectFit: 'cover',
              borderRadius: '12px',
              zIndex: images.length - index,
            }}
          />
        ))}
      </div>
    </div>
  );
}
