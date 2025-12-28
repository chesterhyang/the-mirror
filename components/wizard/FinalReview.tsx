'use client';

import { motion } from 'framer-motion';
import { Shield, AlertTriangle } from 'lucide-react';
import { UserProfile } from '@/lib/types';
import {
  LIFE_STAGE_INFO,
  FATHER_STYLE_INFO,
  MOTHER_STYLE_INFO,
  CONFLICT_RESPONSE_INFO,
  SOCIAL_MASK_INFO,
  CHILDHOOD_SOUND_INFO,
  LOOP_PATTERN_INFO,
} from '@/lib/types';
import CyberButton from '@/components/ui/CyberButton';

interface FinalReviewProps {
  profile: UserProfile;
  onConfirm: () => Promise<void>;
  onBack: () => void;
}

export default function FinalReview({ profile, onConfirm, onBack }: FinalReviewProps) {
  // Generate a random hex ID for the subject
  const subjectId = Array.from({ length: 16 }, () =>
    Math.floor(Math.random() * 16).toString(16).toUpperCase()
  ).join('');

  const siblingDesc = profile.siblings
    .map((role, idx) => (role === 'Me' ? `[ME-${idx + 1}]` : role))
    .join(' → ');

  const dossierData = [
    { label: 'SUBJECT_ID', value: `0x${subjectId}` },
    { label: 'GENDER', value: profile.gender },
    { label: 'LIFE_STAGE', value: `${LIFE_STAGE_INFO[profile.age].en} (${LIFE_STAGE_INFO[profile.age].cn})` },
    { label: 'FAMILY_STRUCTURE', value: siblingDesc },
    { label: 'FATHER_ARCHETYPE', value: `${FATHER_STYLE_INFO[profile.fatherStyle].en} (${FATHER_STYLE_INFO[profile.fatherStyle].cn})` },
    { label: 'MOTHER_ARCHETYPE', value: `${MOTHER_STYLE_INFO[profile.motherStyle].en} (${MOTHER_STYLE_INFO[profile.motherStyle].cn})` },
    { label: 'CONFLICT_RESPONSE', value: `${CONFLICT_RESPONSE_INFO[profile.conflictResponse].en} (${CONFLICT_RESPONSE_INFO[profile.conflictResponse].cn})` },
    { label: 'SOCIAL_MASK', value: `${SOCIAL_MASK_INFO[profile.socialMask].en} (${SOCIAL_MASK_INFO[profile.socialMask].cn})` },
    { label: 'TRAUMA_TRIGGER', value: `${CHILDHOOD_SOUND_INFO[profile.childhoodSound].en} (${CHILDHOOD_SOUND_INFO[profile.childhoodSound].cn})` },
    { label: 'INFINITE_LOOP', value: `${LOOP_PATTERN_INFO[profile.loopPattern].en} (${LOOP_PATTERN_INFO[profile.loopPattern].cn})` },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-8"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Shield className="w-8 h-8 text-neon-red" />
        </div>
        <motion.h2
          className="font-mono text-2xl text-terminal-green tracking-widest mb-2"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
        >
          &gt; THE FINAL SEAL
        </motion.h2>
        <p className="chinese-serif text-xl text-ghost-white/80">
          最终核验
        </p>
        <p className="mt-4 text-sm text-ghost-white/50">
          Review your psychological dossier before initiation
        </p>
      </div>

      {/* Classified Dossier */}
      <motion.div
        className="border-2 border-neon-red bg-void p-8 mb-8 shadow-neon-red"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border-harsh">
          <div className="font-mono text-xs text-neon-red tracking-wider">
            ⚠ CLASSIFIED DOSSIER
          </div>
          <div className="flex-1 text-right font-mono text-xs text-ghost-white/30">
            SECURITY LEVEL: Ω
          </div>
        </div>

        <div className="space-y-3">
          {dossierData.map((item, index) => (
            <motion.div
              key={item.label}
              className="flex items-start font-mono text-sm"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <div className="w-48 text-terminal-green shrink-0">
                {item.label}:
              </div>
              <div className="text-ghost-white/90 flex-1 break-words">
                {item.value}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-border-harsh">
          <div className="font-mono text-xs text-ghost-white/40 text-center">
            &gt;&gt; Total Data Points Collected: 9/9
          </div>
        </div>
      </motion.div>

      {/* Warning Section */}
      <motion.div
        className="mb-8 p-6 border border-neon-red/30 bg-neon-red/5"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-neon-red shrink-0 mt-1" />
          <div>
            <p className="font-mono text-sm text-neon-red mb-2">
              ⚠ CAUTION: Once initiated, the truth cannot be unseen.
            </p>
            <p className="chinese-serif text-sm text-ghost-white/60">
              警告：一旦启动，真相无法撤回。
            </p>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="flex gap-4 justify-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <button
          onClick={onBack}
          className="px-6 py-3 font-mono text-sm text-ghost-white/50 border border-border-harsh hover:border-ghost-white/50 transition-colors"
        >
          &lt; BACK
        </button>

        <motion.button
          onClick={onConfirm}
          className="relative px-12 py-4 font-mono text-lg uppercase tracking-wider border-2 border-neon-red text-neon-red hover:bg-neon-red hover:text-void transition-all group overflow-hidden"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          animate={{
            boxShadow: [
              '0 0 20px rgba(255, 59, 48, 0.3)',
              '0 0 40px rgba(255, 59, 48, 0.6)',
              '0 0 20px rgba(255, 59, 48, 0.3)',
            ],
          }}
          transition={{
            boxShadow: {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        >
          {/* Pulse effect */}
          <motion.div
            className="absolute inset-0 bg-neon-red opacity-0 group-hover:opacity-10"
            animate={{
              opacity: [0, 0.1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />

          <div className="relative z-10">
            <div>INITIATE SOUL AUTOPSY</div>
            <div className="chinese-serif text-sm mt-1 opacity-80">启动灵魂解剖</div>
          </div>
        </motion.button>
      </motion.div>

      {/* Footer hint */}
      <motion.p
        className="mt-8 text-center font-mono text-xs text-ghost-white/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        The Mirror is ready. Are you?
      </motion.p>
    </motion.div>
  );
}
