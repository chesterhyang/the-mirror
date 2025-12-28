'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface SelectionCardProps<T> {
  value: T;
  label: string;
  labelCn: string;
  description?: string;
  descriptionCn?: string;
  icon?: React.ReactNode;
  isSelected: boolean;
  onClick: (value: T) => void;
  index?: number;
}

export default function SelectionCard<T>({
  value,
  label,
  labelCn,
  description,
  descriptionCn,
  icon,
  isSelected,
  onClick,
  index = 0,
}: SelectionCardProps<T>) {
  return (
    <motion.button
      onClick={() => onClick(value)}
      className={cn(
        "relative w-full text-left p-6 border-2 transition-all duration-150",
        "bg-dim-gray hover:bg-dim-gray/80",
        isSelected
          ? "border-neon-red shadow-neon-red"
          : "border-border-harsh hover:border-terminal-green"
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 300 }}
      whileHover={{
        x: -4,
        y: -4,
        boxShadow: isSelected
          ? '4px 4px 0 #FF3B30'
          : '4px 4px 0 #00FF41'
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Selection indicator */}
      {isSelected && (
        <motion.div
          className="absolute top-3 right-3 w-6 h-6 bg-neon-red flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500 }}
        >
          <Check className="w-4 h-4 text-void" />
        </motion.div>
      )}

      {/* Tarot card number */}
      <div className="absolute top-3 left-3 font-serif text-xs text-ghost-white/30">
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Content */}
      <div className="flex items-start gap-4 mt-4">
        {/* Icon */}
        {icon && (
          <div className={cn(
            "w-12 h-12 flex items-center justify-center border",
            isSelected ? "border-neon-red text-neon-red" : "border-terminal-green text-terminal-green"
          )}>
            {icon}
          </div>
        )}

        {/* Text */}
        <div className="flex-1">
          {/* English label */}
          <div className={cn(
            "font-mono text-sm uppercase tracking-wider mb-1",
            isSelected ? "text-neon-red" : "text-terminal-green"
          )}>
            {label}
          </div>

          {/* Chinese label */}
          <div className="chinese-serif text-xl text-ghost-white mb-2">
            {labelCn}
          </div>

          {/* Description */}
          {(description || descriptionCn) && (
            <div className="space-y-1">
              {descriptionCn && (
                <p className="text-sm text-ghost-white/60 chinese-serif">
                  {descriptionCn}
                </p>
              )}
              {description && (
                <p className="text-xs text-ghost-white/40 font-mono">
                  {description}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom decoration line */}
      <motion.div
        className={cn(
          "absolute bottom-0 left-0 h-1",
          isSelected ? "bg-neon-red" : "bg-terminal-green"
        )}
        initial={{ width: 0 }}
        animate={{ width: isSelected ? '100%' : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Scan line effect on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <motion.div
          className="absolute w-full h-1 bg-gradient-to-r from-transparent via-terminal-green/20 to-transparent"
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>
    </motion.button>
  );
}

// Grid wrapper for multiple selection cards
interface SelectionGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3;
}

export function SelectionGrid({ children, columns = 2 }: SelectionGridProps) {
  return (
    <div className={cn(
      "grid gap-4",
      columns === 1 && "grid-cols-1",
      columns === 2 && "grid-cols-1 md:grid-cols-2",
      columns === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    )}>
      {children}
    </div>
  );
}
