'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { TERMINAL_LOGS } from '@/lib/prompts';

interface TerminalLogsProps {
  onComplete?: () => void;
}

export default function TerminalLogs({ onComplete }: TerminalLogsProps) {
  const [visibleLogs, setVisibleLogs] = useState<typeof TERMINAL_LOGS>([]);
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];

    TERMINAL_LOGS.forEach((log, index) => {
      const timeout = setTimeout(() => {
        setVisibleLogs(prev => [...prev, { ...log, id: index }]);

        // Auto-scroll to bottom
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }

        // Check if last log
        if (index === TERMINAL_LOGS.length - 1) {
          setTimeout(() => {
            setIsComplete(true);
            onComplete?.();
          }, 1000);
        }
      }, log.delay);

      timeouts.push(timeout);
    });

    return () => timeouts.forEach(t => clearTimeout(t));
  }, [onComplete]);

  const getLogColor = (type: string) => {
    switch (type) {
      case 'system': return 'text-ghost-white/70';
      case 'warning': return 'text-yellow-500';
      case 'error': return 'text-neon-red';
      case 'success': return 'text-terminal-green';
      case 'data': return 'text-cyber-blue';
      default: return 'text-ghost-white/50';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Terminal Window */}
      <div className="border border-border-harsh bg-void">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-border-harsh bg-dim-gray">
          <div className="w-3 h-3 rounded-full bg-neon-red" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-terminal-green" />
          <span className="ml-4 font-mono text-xs text-ghost-white/50">
            the-mirror://soul-autopsy.exe
          </span>
        </div>

        {/* Terminal Body */}
        <div
          ref={containerRef}
          className="p-4 min-h-[400px] max-h-[500px] overflow-y-auto font-mono text-sm"
        >
          <AnimatePresence>
            {visibleLogs.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.1 }}
                className={cn('mb-1', getLogColor(log.type))}
              >
                {log.text ? (
                  <>
                    <span className="text-ghost-white/30 mr-2">
                      {String(index).padStart(3, '0')}
                    </span>
                    {log.text}
                  </>
                ) : (
                  <span>&nbsp;</span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Blinking cursor at the end */}
          {!isComplete && (
            <motion.span
              className="inline-block w-2 h-4 bg-terminal-green"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4 h-1 bg-border-harsh">
        <motion.div
          className="h-full bg-terminal-green"
          initial={{ width: 0 }}
          animate={{ width: isComplete ? '100%' : `${(visibleLogs.length / TERMINAL_LOGS.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Status text */}
      <div className="mt-2 text-center">
        <span className="font-mono text-xs text-ghost-white/50">
          {isComplete ? (
            <span className="text-terminal-green">ANALYSIS COMPLETE</span>
          ) : (
            <>Processing... {Math.round((visibleLogs.length / TERMINAL_LOGS.length) * 100)}%</>
          )}
        </span>
      </div>
    </div>
  );
}

// Matrix rain background effect
export function MatrixRain() {
  const [columns, setColumns] = useState<number[]>([]);

  useEffect(() => {
    const count = Math.floor(window.innerWidth / 20);
    setColumns(Array.from({ length: count }, (_, i) => i));
  }, []);

  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-20">
      {columns.map((col) => (
        <motion.div
          key={col}
          className="absolute top-0 text-terminal-green font-mono text-sm leading-none"
          style={{ left: col * 20 }}
          initial={{ y: -100 }}
          animate={{ y: '100vh' }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'linear',
          }}
        >
          {Array.from({ length: 30 }, () => chars[Math.floor(Math.random() * chars.length)]).join('\n')}
        </motion.div>
      ))}
    </div>
  );
}
