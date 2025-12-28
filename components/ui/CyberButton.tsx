'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface CyberButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: 'button' | 'submit';
}

export default function CyberButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className,
  type = 'button',
}: CyberButtonProps) {
  const variants = {
    primary: {
      border: 'border-terminal-green',
      text: 'text-terminal-green',
      hover: 'hover:bg-terminal-green hover:text-void',
      shadow: 'hover:shadow-neon-green',
      glow: '#00FF41',
    },
    secondary: {
      border: 'border-cyber-blue',
      text: 'text-cyber-blue',
      hover: 'hover:bg-cyber-blue hover:text-void',
      shadow: 'hover:shadow-neon-blue',
      glow: '#00D4FF',
    },
    danger: {
      border: 'border-neon-red',
      text: 'text-neon-red',
      hover: 'hover:bg-neon-red hover:text-void',
      shadow: 'hover:shadow-neon-red',
      glow: '#FF3B30',
    },
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const v = variants[variant];
  const s = sizes[size];

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        'relative font-mono uppercase tracking-wider border-2 transition-all',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        v.border,
        v.text,
        !disabled && !loading && v.hover,
        !disabled && !loading && v.shadow,
        s,
        className
      )}
      style={{
        clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
      }}
      whileHover={!disabled && !loading ? {
        x: -2,
        y: -2,
        boxShadow: `4px 4px 0 ${v.glow}`,
      } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
    >
      {/* Loading spinner */}
      {loading && (
        <Loader2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin" />
      )}

      {/* Content */}
      <span className={cn(loading && 'opacity-0')}>
        {children}
      </span>

      {/* Scan line effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <motion.div
          className={cn(
            'absolute w-full h-px',
            variant === 'primary' && 'bg-terminal-green/30',
            variant === 'secondary' && 'bg-cyber-blue/30',
            variant === 'danger' && 'bg-neon-red/30',
          )}
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      {/* Corner decorations */}
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-current opacity-50" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-current opacity-50" />
    </motion.button>
  );
}

// Icon button variant
interface CyberIconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  className?: string;
  label?: string;
}

export function CyberIconButton({
  icon,
  onClick,
  variant = 'primary',
  disabled = false,
  className,
  label,
}: CyberIconButtonProps) {
  const variants = {
    primary: 'border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-void',
    secondary: 'border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-void',
    danger: 'border-neon-red text-neon-red hover:bg-neon-red hover:text-void',
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'w-10 h-10 flex items-center justify-center border transition-all',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        className
      )}
      whileHover={!disabled ? { scale: 1.1 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      aria-label={label}
    >
      {icon}
    </motion.button>
  );
}
