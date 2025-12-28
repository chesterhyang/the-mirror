'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Zap, Shield, Eye, CreditCard } from 'lucide-react';
import CyberButton from '@/components/ui/CyberButton';
import GlitchText from '@/components/ui/GlitchText';
import { cn } from '@/lib/utils';

interface PaywallOverlayProps {
  onUnlock?: () => void;
  price?: string;
}

export default function PaywallOverlay({
  onUnlock,
  price = '$29.99',
}: PaywallOverlayProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleUnlock = async () => {
    setShowConfirm(true);
  };

  const handleConfirmPurchase = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    onUnlock?.();
  };

  return (
    <div className="relative border-2 border-neon-red p-8 bg-void">
      {/* Glitch scan lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-px bg-neon-red/30"
            style={{ top: `${20 * i}%` }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scaleX: [1, 1.02, 1],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>

      {/* Lock icon with glow */}
      <motion.div
        className="flex justify-center mb-6"
        animate={{
          filter: ['drop-shadow(0 0 10px #FF3B30)', 'drop-shadow(0 0 20px #FF3B30)', 'drop-shadow(0 0 10px #FF3B30)'],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-20 h-20 border-2 border-neon-red flex items-center justify-center">
          <Lock className="w-10 h-10 text-neon-red" />
        </div>
      </motion.div>

      {/* Title */}
      <div className="text-center mb-6">
        <GlitchText
          text="FULL REPORT LOCKED"
          className="font-mono text-xl text-neon-red tracking-widest"
          glitchOnHover
        />
        <p className="chinese-serif text-lg text-ghost-white/70 mt-2">
          完整报告已锁定
        </p>
      </div>

      {/* What's included */}
      <div className="mb-8 space-y-3">
        <div className="font-mono text-xs text-terminal-green mb-4">
          {'>'} UNLOCK INCLUDES:
        </div>
        {[
          { icon: Eye, text: '【病灶溯源】完整分析', en: 'Full Origin Trace Analysis' },
          { icon: Zap, text: '【觉醒红药丸】解锁行动指南', en: 'Red Pill Action Guide' },
          { icon: Shield, text: '终身访问权限', en: 'Lifetime Access' },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-3 text-ghost-white/80"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <item.icon className="w-4 h-4 text-terminal-green flex-shrink-0" />
            <div>
              <span className="chinese-serif">{item.text}</span>
              <span className="font-mono text-xs text-ghost-white/40 ml-2">
                / {item.en}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Price */}
      <div className="text-center mb-6">
        <div className="font-mono text-3xl text-neon-red mb-1">
          {price}
        </div>
        <div className="font-mono text-xs text-ghost-white/40">
          ONE-TIME PAYMENT / 一次性支付
        </div>
      </div>

      {/* CTA Button */}
      <AnimatePresence mode="wait">
        {!showConfirm ? (
          <motion.div
            key="unlock"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CyberButton
              variant="danger"
              size="lg"
              onClick={handleUnlock}
              className="w-full"
            >
              <span className="flex items-center justify-center gap-2">
                <Lock className="w-4 h-4" />
                UNLOCK FULL REPORT
              </span>
            </CyberButton>
          </motion.div>
        ) : (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="p-4 border border-yellow-500/50 bg-yellow-500/10">
              <div className="flex items-center gap-2 text-yellow-500 mb-2">
                <CreditCard className="w-4 h-4" />
                <span className="font-mono text-sm uppercase">Payment Simulation</span>
              </div>
              <p className="text-xs text-ghost-white/60 font-mono">
                This is a demo. No real payment will be processed.
              </p>
            </div>

            <div className="flex gap-4">
              <CyberButton
                variant="secondary"
                onClick={() => setShowConfirm(false)}
                className="flex-1"
              >
                CANCEL
              </CyberButton>
              <CyberButton
                variant="danger"
                onClick={handleConfirmPurchase}
                loading={isProcessing}
                className="flex-1"
              >
                CONFIRM
              </CyberButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trust badges */}
      <div className="mt-6 pt-6 border-t border-border-harsh">
        <div className="flex justify-center gap-6 text-ghost-white/30">
          <div className="font-mono text-xs flex items-center gap-1">
            <Shield className="w-3 h-3" />
            SSL Secured
          </div>
          <div className="font-mono text-xs flex items-center gap-1">
            <CreditCard className="w-3 h-3" />
            Stripe Powered
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-neon-red" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-neon-red" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-neon-red" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-neon-red" />
    </div>
  );
}
