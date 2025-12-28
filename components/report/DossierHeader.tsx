'use client';

import { motion } from 'framer-motion';
import { FileText, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { UserProfile } from '@/lib/types';
import {
  FATHER_STYLE_INFO,
  MOTHER_STYLE_INFO,
  CONFLICT_RESPONSE_INFO,
  SOCIAL_MASK_INFO,
  CHILDHOOD_SOUND_INFO,
  LOOP_PATTERN_INFO,
} from '@/lib/types';

interface DossierHeaderProps {
  reportId: string;
  profile: UserProfile;
}

export default function DossierHeader({ reportId, profile }: DossierHeaderProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(reportId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      className="mb-12 border-2 border-terminal-green/30 bg-terminal-green/5 p-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Case Header */}
      <div className="flex items-start justify-between mb-6 pb-4 border-b border-terminal-green/20">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-neon-red" />
          <div>
            <div className="font-mono text-xs text-terminal-green tracking-wider mb-1">
              ⚠ AUTOPSY RECORD · CONFIDENTIAL
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xl text-neon-red tracking-wider">
                CASE ID: {reportId}
              </span>
              <button
                onClick={copyToClipboard}
                className="p-1 hover:bg-terminal-green/10 rounded transition-colors"
                title="Copy ID"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-terminal-green" />
                ) : (
                  <Copy className="w-4 h-4 text-ghost-white/40" />
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="font-mono text-xs text-ghost-white/30 text-right">
          TIMESTAMP<br />
          {new Date().toISOString().replace('T', ' ').slice(0, 19)}
        </div>
      </div>

      {/* Subject Data Block */}
      <div className="border border-dashed border-terminal-green/30 bg-void/50 p-5">
        <div className="font-mono text-xs text-terminal-green/70 mb-4 tracking-wider">
          &gt;&gt; SUBJECT METADATA
        </div>

        <div className="space-y-2 font-mono text-sm">
          <div className="flex">
            <span className="w-48 text-terminal-green/80 shrink-0">FAMILY_SYSTEM:</span>
            <span className="text-ghost-white/90">
              {FATHER_STYLE_INFO[profile.fatherStyle].en} + {MOTHER_STYLE_INFO[profile.motherStyle].en}
            </span>
          </div>

          <div className="flex">
            <span className="w-48 text-terminal-green/80 shrink-0">DEFENSE_MECHANISM:</span>
            <span className="text-ghost-white/90">
              {CONFLICT_RESPONSE_INFO[profile.conflictResponse].en} ({CONFLICT_RESPONSE_INFO[profile.conflictResponse].cn})
            </span>
          </div>

          <div className="flex">
            <span className="w-48 text-terminal-green/80 shrink-0">SOCIAL_MASK:</span>
            <span className="text-ghost-white/90">
              {SOCIAL_MASK_INFO[profile.socialMask].en} ({SOCIAL_MASK_INFO[profile.socialMask].cn})
            </span>
          </div>

          <div className="flex">
            <span className="w-48 text-terminal-green/80 shrink-0">SENSORY_TRIGGER:</span>
            <span className="text-ghost-white/90">
              {CHILDHOOD_SOUND_INFO[profile.childhoodSound].en} ({CHILDHOOD_SOUND_INFO[profile.childhoodSound].cn})
            </span>
          </div>

          <div className="flex">
            <span className="w-48 text-terminal-green/80 shrink-0">CORE_LOOP:</span>
            <span className="text-neon-red/90 font-bold">
              {LOOP_PATTERN_INFO[profile.loopPattern].en}
            </span>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div className="mt-4 font-mono text-xs text-ghost-white/20 text-center">
        This record is generated based on self-reported data and AI inference. No human analyst was involved.
      </div>
    </motion.div>
  );
}
