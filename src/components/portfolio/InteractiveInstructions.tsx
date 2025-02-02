"use client";

import React, { useState, useEffect } from 'react';
import { Column, Text } from "@/once-ui/components";

interface Instruction {
  id: string;
  text: string;
  completed: boolean;
}

interface InteractiveInstructionsProps {
  onDrag: boolean;
  hasSearched: boolean;
}

const InteractiveInstructions: React.FC<InteractiveInstructionsProps> = ({ 
  onDrag,
  hasSearched
}) => {
  const [instructions, setInstructions] = useState<Instruction[]>([
    { id: 'drag', text: '🖱️ Click and drag to rotate the graph', completed: false },
    { id: 'search', text: '🔍 Try searching for a project or skill', completed: false },
    { id: 'explore', text: '🔎 Hover over nodes to explore connections', completed: false }
  ]);

  useEffect(() => {
    if (onDrag) {
      setInstructions(prev => 
        prev.map(inst => 
          inst.id === 'drag' ? { ...inst, completed: true } : inst
        )
      );
    }
  }, [onDrag]);

  useEffect(() => {
    if (hasSearched) {
      setInstructions(prev => 
        prev.map(inst => 
          inst.id === 'search' ? { ...inst, completed: true } : inst
        )
      );
    }
  }, [hasSearched]);

  return (
    <Column gap="m" style={{ position: 'absolute', left: '20px', top: '20px', zIndex: 1000 }}>
      {instructions.map((instruction, index) => (
        !instruction.completed && (
          <div
            key={instruction.id}
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '8px',
              opacity: 1,
              transition: 'opacity 0.5s ease-out',
              animation: 'fadeIn 0.5s ease-out',
            }}
          >
            <Text style={{ color: '#fff' }}>
              {instruction.text}
            </Text>
          </div>
        )
      ))}
    </Column>
  );
};

export default InteractiveInstructions;
