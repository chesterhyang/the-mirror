'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface WizardStepProps {
  stepNumber: number;
  totalSteps: number;
  title: string;
  titleCn: string;
  subtitle?: string;
  children: React.ReactNode;
  isActive: boolean;
}

export default function WizardStep({
  stepNumber,
  totalSteps,
  title,
  titleCn,
  subtitle,
  children,
  isActive,
}: WizardStepProps) {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={stepNumber}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="w-full"
        >
          {/* Step Header */}
          <div className="mb-8">
            {/* Progress indicator */}
            <div className="flex items-center gap-4 mb-6">
              <div className="font-mono text-xs text-terminal-green">
                STEP {stepNumber}/{totalSteps}
              </div>
              <div className="flex-1 h-px bg-border-harsh relative">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-terminal-green"
                  initial={{ width: 0 }}
                  animate={{ width: `${(stepNumber / totalSteps) * 100}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
              <div className="font-mono text-xs text-ghost-white/40">
                {Math.round((stepNumber / totalSteps) * 100)}%
              </div>
            </div>

            {/* Title */}
            <div className="relative">
              {/* Glitch decoration */}
              <motion.div
                className="absolute -left-4 top-0 bottom-0 w-1 bg-neon-red"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />

              {/* English title */}
              <motion.h2
                className="font-mono text-2xl md:text-3xl text-terminal-green uppercase tracking-wider mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {'>'} {title}
                <motion.span
                  className="inline-block w-3 h-6 bg-terminal-green ml-2"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </motion.h2>

              {/* Chinese title */}
              <motion.h3
                className="chinese-serif text-xl md:text-2xl text-ghost-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {titleCn}
              </motion.h3>

              {/* Subtitle */}
              {subtitle && (
                <motion.p
                  className="mt-3 font-mono text-sm text-ghost-white/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {subtitle}
                </motion.p>
              )}
            </div>
          </div>

          {/* Step Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Navigation buttons component
interface WizardNavProps {
  onBack?: () => void;
  onNext?: () => void;
  canGoBack?: boolean;
  canGoNext?: boolean;
  nextLabel?: string;
  isLastStep?: boolean;
}

export function WizardNav({
  onBack,
  onNext,
  canGoBack = true,
  canGoNext = true,
  nextLabel = 'CONTINUE',
  isLastStep = false,
}: WizardNavProps) {
  return (
    <motion.div
      className="flex justify-between items-center mt-12 pt-6 border-t border-border-harsh"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      {/* Back button */}
      {onBack && canGoBack ? (
        <motion.button
          onClick={onBack}
          className="px-6 py-3 border border-ghost-white/20 text-ghost-white/60 font-mono text-sm uppercase tracking-wider hover:border-ghost-white hover:text-ghost-white transition-all"
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.98 }}
        >
          {'<'} BACK
        </motion.button>
      ) : (
        <div />
      )}

      {/* Next button */}
      {onNext && (
        <motion.button
          onClick={onNext}
          disabled={!canGoNext}
          className={cn(
            "relative px-8 py-4 font-mono text-sm uppercase tracking-wider transition-all",
            "border-2",
            canGoNext
              ? isLastStep
                ? "border-neon-red text-neon-red hover:bg-neon-red hover:text-void"
                : "border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-void"
              : "border-ghost-white/20 text-ghost-white/30 cursor-not-allowed"
          )}
          whileHover={canGoNext ? { x: 4, boxShadow: isLastStep ? '0 0 20px #FF3B30' : '0 0 20px #00FF41' } : {}}
          whileTap={canGoNext ? { scale: 0.98 } : {}}
          style={{
            clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
          }}
        >
          {isLastStep ? (
            <>INITIATE SOUL AUTOPSY</>
          ) : (
            <>{nextLabel} {'>'}</>
          )}
        </motion.button>
      )}
    </motion.div>
  );
}
