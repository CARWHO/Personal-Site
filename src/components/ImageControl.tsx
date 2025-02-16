'use client';
import { useState } from 'react';
import styles from './ImageControl.module.css';

interface ImageControlProps {
  images: {
    src: string;
    alt: string;
    initialPosition?: { x: number; y: number };
    initialDimensions?: { width: number; height: number };
    initialOpacity?: number;
  }[];
}

export default function ImageControl({ images }: ImageControlProps) {
  const [imageStates, setImageStates] = useState(
    images.map((img) => ({
      position: img.initialPosition || { x: 0, y: 0 },
      dimensions: img.initialDimensions || { width: 100, height: 400 },
      opacity: img.initialOpacity || 1
    }))
  );

  const updateImageState = (index: number, updates: any) => {
    setImageStates(prev => prev.map((state, i) => 
      i === index ? { ...state, ...updates } : state
    ));
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageStack}>
        {images.map((image, index) => (
          <div key={image.src} className={styles.imageControls}>
            <img
              src={image.src}
              alt={image.alt}
              style={{
                position: 'absolute',
                width: `${imageStates[index].dimensions.width}%`,
                height: `${imageStates[index].dimensions.height}px`,
                transform: `translate(${imageStates[index].position.x}px, ${imageStates[index].position.y}px)`,
                opacity: imageStates[index].opacity,
                objectFit: 'cover',
                borderRadius: '12px',
                zIndex: images.length - index,
              }}
            />
            <div className={styles.controls}>
              <label>
                X Position:
                <input
                  type="range"
                  min="-100"
                  max="100"
                  value={imageStates[index].position.x}
                  onChange={(e) => updateImageState(index, { 
                    position: { 
                      ...imageStates[index].position, 
                      x: parseInt(e.target.value) 
                    } 
                  })}
                />
              </label>
              <label>
                Y Position:
                <input
                  type="range"
                  min="-100"
                  max="100"
                  value={imageStates[index].position.y}
                  onChange={(e) => updateImageState(index, { 
                    position: { 
                      ...imageStates[index].position, 
                      y: parseInt(e.target.value) 
                    } 
                  })}
                />
              </label>
              <label>
                Width:
                <input
                  type="range"
                  min="50"
                  max="150"
                  value={imageStates[index].dimensions.width}
                  onChange={(e) => updateImageState(index, { 
                    dimensions: { 
                      ...imageStates[index].dimensions, 
                      width: parseInt(e.target.value) 
                    } 
                  })}
                />
              </label>
              <label>
                Height:
                <input
                  type="range"
                  min="200"
                  max="600"
                  value={imageStates[index].dimensions.height}
                  onChange={(e) => updateImageState(index, { 
                    dimensions: { 
                      ...imageStates[index].dimensions, 
                      height: parseInt(e.target.value) 
                    } 
                  })}
                />
              </label>
              <label>
                Opacity:
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={imageStates[index].opacity * 100}
                  onChange={(e) => updateImageState(index, { 
                    opacity: parseInt(e.target.value) / 100 
                  })}
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
