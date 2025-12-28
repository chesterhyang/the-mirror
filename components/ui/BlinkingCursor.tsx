'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BlinkingCursorProps {
  color?: 'green' | 'red' | 'white';
  className?: string;
}

export default function BlinkingCursor({
  color = 'green',
  className,
}: BlinkingCursorProps) {
  const colors = {
    green: 'bg-terminal-green',
    red: 'bg-neon-red',
    white: 'bg-ghost-white',
  };

  return (
    <motion.span
      className={cn('inline-block w-2 h-5 ml-1', colors[color], className)}
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.8, repeat: Infinity, ease: 'steps(1)' }}
    />
  );
}

// Typewriter text with cursor
interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
  showCursor?: boolean;
}

export function Typewriter({
  text,
  speed = 30,
  delay = 0,
  className,
  onComplete,
  showCursor = true,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayText('');
    setIsComplete(false);

    const startTimeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, delay, onComplete]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && !isComplete && <BlinkingCursor />}
    </span>
  );
}

// Need to import useState and useEffect
import { useState, useEffect } from 'react';
