'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, User, UserCircle2, Crown, Baby } from 'lucide-react';
import { FamilyRole } from '@/lib/types';
import { cn } from '@/lib/utils';

interface FamilyBuilderProps {
  value: FamilyRole[];
  onChange: (siblings: FamilyRole[]) => void;
}

type SiblingGender = 'Brother' | 'Sister';

interface FamilyMember {
  role: FamilyRole;
  id: string;
}

export default function FamilyBuilder({ value, onChange }: FamilyBuilderProps) {
  const [showOlderMenu, setShowOlderMenu] = useState(false);
  const [showYoungerMenu, setShowYoungerMenu] = useState(false);

  // Find the index of "Me" in the current array
  const meIndex = value.indexOf('Me');

  // Count siblings above and below "Me"
  const olderSiblings = value.slice(0, meIndex);
  const youngerSiblings = value.slice(meIndex + 1);

  const addOlderSibling = (gender: SiblingGender) => {
    const role: FamilyRole = gender === 'Brother' ? 'Older Brother' : 'Older Sister';
    const newSiblings = [...olderSiblings, role, 'Me', ...youngerSiblings];
    onChange(newSiblings);
    setShowOlderMenu(false);
  };

  const addYoungerSibling = (gender: SiblingGender) => {
    const role: FamilyRole = gender === 'Brother' ? 'Younger Brother' : 'Younger Sister';
    const newSiblings = [...olderSiblings, 'Me', role, ...youngerSiblings];
    onChange(newSiblings);
    setShowYoungerMenu(false);
  };

  const removeSibling = (index: number) => {
    if (value[index] === 'Me') return; // Can't remove "Me"
    const newSiblings = value.filter((_, i) => i !== index);
    onChange(newSiblings);
  };

  const getRoleIcon = (role: FamilyRole) => {
    if (role === 'Me') return <Crown className="w-6 h-6" />;
    if (role.includes('Brother')) return <User className="w-5 h-5" />;
    return <UserCircle2 className="w-5 h-5" />;
  };

  const getRoleColor = (role: FamilyRole) => {
    if (role === 'Me') return 'border-neon-red text-neon-red shadow-neon-red';
    if (role.includes('Older')) return 'border-deep-purple text-deep-purple';
    return 'border-cyber-blue text-cyber-blue';
  };

  const getRoleCn = (role: FamilyRole) => {
    switch (role) {
      case 'Older Brother': return '哥哥';
      case 'Older Sister': return '姐姐';
      case 'Me': return '我';
      case 'Younger Brother': return '弟弟';
      case 'Younger Sister': return '妹妹';
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="font-mono text-terminal-green text-sm mb-2 tracking-widest">
          {'>'} FAMILY_STRUCTURE.exe
        </h3>
        <p className="text-ghost-white/60 text-xs">
          构建你的家庭星图 / Build your family constellation
        </p>
      </div>

      {/* Add Older Sibling Button */}
      <div className="relative flex justify-center mb-4">
        <motion.button
          onClick={() => setShowOlderMenu(!showOlderMenu)}
          className={cn(
            "flex items-center gap-2 px-6 py-3 border border-dashed transition-all",
            showOlderMenu
              ? "border-terminal-green text-terminal-green"
              : "border-border-harsh text-ghost-white/40 hover:border-terminal-green hover:text-terminal-green"
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-4 h-4" />
          <span className="font-mono text-xs uppercase tracking-wider">
            Add Older / 添加兄姐
          </span>
        </motion.button>

        {/* Gender Selection Menu */}
        <AnimatePresence>
          {showOlderMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full mt-2 flex gap-2 z-10"
            >
              <motion.button
                onClick={() => addOlderSibling('Brother')}
                className="px-4 py-2 bg-dim-gray border border-deep-purple text-deep-purple font-mono text-xs hover:bg-deep-purple hover:text-void transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <User className="w-4 h-4 inline mr-2" />
                哥哥 / Brother
              </motion.button>
              <motion.button
                onClick={() => addOlderSibling('Sister')}
                className="px-4 py-2 bg-dim-gray border border-deep-purple text-deep-purple font-mono text-xs hover:bg-deep-purple hover:text-void transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <UserCircle2 className="w-4 h-4 inline mr-2" />
                姐姐 / Sister
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Family Chain */}
      <div className="relative py-8">
        {/* Connecting Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-deep-purple via-neon-red to-cyber-blue opacity-30" />

        {/* Family Members */}
        <div className="flex flex-col items-center gap-4">
          <AnimatePresence mode="popLayout">
            {value.map((role, index) => (
              <motion.div
                key={`${role}-${index}`}
                layout
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 20 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="relative group"
              >
                <div
                  className={cn(
                    "relative flex items-center gap-4 px-8 py-4 bg-dim-gray border-2 transition-all",
                    getRoleColor(role),
                    role === 'Me' && "scale-110 z-10"
                  )}
                >
                  {/* Position indicator */}
                  <div className="absolute -left-12 font-mono text-xs text-ghost-white/30">
                    #{index + 1}
                  </div>

                  {/* Icon */}
                  <div className={cn(
                    "w-10 h-10 flex items-center justify-center border",
                    getRoleColor(role)
                  )}>
                    {getRoleIcon(role)}
                  </div>

                  {/* Label */}
                  <div className="text-left">
                    <div className="font-mono text-sm uppercase tracking-wider">
                      {role}
                    </div>
                    <div className="chinese-serif text-lg">
                      {getRoleCn(role)}
                    </div>
                  </div>

                  {/* Remove button (not for "Me") */}
                  {role !== 'Me' && (
                    <motion.button
                      onClick={() => removeSibling(index)}
                      className="absolute -right-3 -top-3 w-6 h-6 bg-neon-red text-void flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Minus className="w-4 h-4" />
                    </motion.button>
                  )}

                  {/* Special indicator for "Me" */}
                  {role === 'Me' && (
                    <div className="absolute -right-16 font-mono text-xs text-neon-red animate-pulse">
                      {'<'} YOU
                    </div>
                  )}
                </div>

                {/* Birth order label */}
                {role === 'Me' && (
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs text-ghost-white/40 whitespace-nowrap">
                    {olderSiblings.length === 0 && youngerSiblings.length === 0
                      ? '独生子女 / Only Child'
                      : olderSiblings.length === 0
                      ? '老大 / First Born'
                      : youngerSiblings.length === 0
                      ? '老幺 / Last Born'
                      : `中间 / Middle #${olderSiblings.length + 1}`}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Add Younger Sibling Button */}
      <div className="relative flex justify-center mt-8">
        <motion.button
          onClick={() => setShowYoungerMenu(!showYoungerMenu)}
          className={cn(
            "flex items-center gap-2 px-6 py-3 border border-dashed transition-all",
            showYoungerMenu
              ? "border-terminal-green text-terminal-green"
              : "border-border-harsh text-ghost-white/40 hover:border-terminal-green hover:text-terminal-green"
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-4 h-4" />
          <span className="font-mono text-xs uppercase tracking-wider">
            Add Younger / 添加弟妹
          </span>
        </motion.button>

        {/* Gender Selection Menu */}
        <AnimatePresence>
          {showYoungerMenu && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-full mb-2 flex gap-2 z-10"
            >
              <motion.button
                onClick={() => addYoungerSibling('Brother')}
                className="px-4 py-2 bg-dim-gray border border-cyber-blue text-cyber-blue font-mono text-xs hover:bg-cyber-blue hover:text-void transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <User className="w-4 h-4 inline mr-2" />
                弟弟 / Brother
              </motion.button>
              <motion.button
                onClick={() => addYoungerSibling('Sister')}
                className="px-4 py-2 bg-dim-gray border border-cyber-blue text-cyber-blue font-mono text-xs hover:bg-cyber-blue hover:text-void transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <UserCircle2 className="w-4 h-4 inline mr-2" />
                妹妹 / Sister
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Summary */}
      <motion.div
        className="mt-12 p-4 border border-border-harsh bg-dim-gray/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="font-mono text-xs text-terminal-green mb-2">
          {'>'} FAMILY_MATRIX_DECODED:
        </div>
        <div className="font-mono text-sm text-ghost-white/80">
          {value.map((role, i) => (
            <span key={i}>
              {role === 'Me' ? (
                <span className="text-neon-red">[{getRoleCn(role)}]</span>
              ) : (
                <span className="text-ghost-white/60">{getRoleCn(role)}</span>
              )}
              {i < value.length - 1 && <span className="text-terminal-green"> → </span>}
            </span>
          ))}
        </div>
        <div className="mt-2 font-mono text-xs text-ghost-white/40">
          Total: {value.length} | Your Position: #{value.indexOf('Me') + 1}
        </div>
      </motion.div>
    </div>
  );
}
