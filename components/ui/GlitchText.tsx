'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  glitchOnHover?: boolean;
  continuous?: boolean;
}

export default function GlitchText({
  text,
  className,
  as: Component = 'span',
  glitchOnHover = false,
  continuous = false,
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(continuous);
  const [displayText, setDisplayText] = useState(text);

  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`░▒▓█▄▀■□▪▫';

  useEffect(() => {
    if (!isGlitching) {
      setDisplayText(text);
      return;
    }

    const interval = setInterval(() => {
      const glitchedText = text
        .split('')
        .map(char => {
          if (char === ' ') return ' ';
          return Math.random() < 0.1
            ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
            : char;
        })
        .join('');
      setDisplayText(glitchedText);
    }, 50);

    return () => clearInterval(interval);
  }, [isGlitching, text]);

  // Reset text after glitch
  useEffect(() => {
    if (!isGlitching || continuous) return;

    const timeout = setTimeout(() => {
      setDisplayText(text);
      setIsGlitching(false);
    }, 200);

    return () => clearTimeout(timeout);
  }, [isGlitching, text, continuous]);

  const handleMouseEnter = () => {
    if (glitchOnHover) setIsGlitching(true);
  };

  const handleMouseLeave = () => {
    if (glitchOnHover && !continuous) setIsGlitching(false);
  };

  return (
    <Component
      className={cn('relative inline-block', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-text={text}
    >
      {/* Main text */}
      <span className="relative z-10">{displayText}</span>

      {/* Glitch layers (CSS-based) */}
      {isGlitching && (
        <>
          <motion.span
            className="absolute top-0 left-0 text-neon-red opacity-70 z-0"
            style={{ clipPath: 'inset(0 0 50% 0)' }}
            animate={{ x: [-2, 2, -2] }}
            transition={{ duration: 0.1, repeat: Infinity }}
          >
            {displayText}
          </motion.span>
          <motion.span
            className="absolute top-0 left-0 text-cyber-blue opacity-70 z-0"
            style={{ clipPath: 'inset(50% 0 0 0)' }}
            animate={{ x: [2, -2, 2] }}
            transition={{ duration: 0.1, repeat: Infinity }}
          >
            {displayText}
          </motion.span>
        </>
      )}
    </Component>
  );
}

// Scramble text effect (letter by letter reveal)
interface ScrambleTextProps {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
}

export function ScrambleText({
  text,
  className,
  duration = 1000,
  delay = 0,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const glitchChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setIsAnimating(true);

      let iteration = 0;
      const interval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (index < iteration) return char;
              if (char === ' ') return ' ';
              return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            })
            .join('')
        );

        if (iteration >= text.length) {
          clearInterval(interval);
          setIsAnimating(false);
        }

        iteration += 1 / 3;
      }, duration / (text.length * 3));

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, duration, delay]);

  return (
    <span className={cn('font-mono', className)}>
      {displayText || text.replace(/./g, ' ')}
      {isAnimating && <span className="animate-blink">█</span>}
    </span>
  );
}
