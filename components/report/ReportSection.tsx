'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Lock, Eye, EyeOff } from 'lucide-react';

interface ReportSectionProps {
  id: string;
  title: string;
  titleCn: string;
  content: string;
  isLocked?: boolean;
  isBlurred?: boolean;
  index?: number;
}

export default function ReportSection({
  id,
  title,
  titleCn,
  content,
  isLocked = false,
  isBlurred = false,
  index = 0,
}: ReportSectionProps) {
  return (
    <motion.div
      id={id}
      className="relative border border-border-harsh mb-8 overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, type: 'spring' }}
    >
      {/* Section Header */}
      <div className="relative bg-dim-gray border-b border-border-harsh px-6 py-4">
        {/* Corner decoration */}
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-terminal-green opacity-50" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-terminal-green opacity-50" />

        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-mono text-sm text-terminal-green uppercase tracking-wider">
              {title}
            </h3>
            <h4 className="chinese-serif text-xl text-ghost-white mt-1">
              {titleCn}
            </h4>
          </div>

          {isLocked && (
            <div className="flex items-center gap-2 text-neon-red">
              <Lock className="w-4 h-4" />
              <span className="font-mono text-xs uppercase">Locked</span>
            </div>
          )}
        </div>
      </div>

      {/* Section Content */}
      <div className="relative p-6">
        {/* Content */}
        <div
          className={cn(
            'chinese-serif text-lg leading-relaxed text-ghost-white/90 whitespace-pre-wrap',
            isBlurred && 'blur-lock'
          )}
        >
          {content}
        </div>

        {/* Blur overlay for locked sections */}
        {isBlurred && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-void/60 backdrop-blur-sm">
            <Lock className="w-8 h-8 text-neon-red mb-4" />
            <p className="font-mono text-sm text-ghost-white/60">
              Content locked
            </p>
          </div>
        )}
      </div>

      {/* Scan line effect */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-terminal-green to-transparent"
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />
    </motion.div>
  );
}

// Typewriter content for streaming
interface TypewriterContentProps {
  content: string;
  speed?: number;
  className?: string;
}

export function TypewriterContent({
  content,
  speed = 20,
  className,
}: TypewriterContentProps) {
  const [displayContent, setDisplayContent] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayContent('');
    setIsComplete(false);

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < content.length) {
        setDisplayContent(content.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [content, speed]);

  return (
    <span className={className}>
      {displayContent}
      {!isComplete && (
        <motion.span
          className="inline-block w-2 h-5 bg-terminal-green ml-1"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}
    </span>
  );
}
