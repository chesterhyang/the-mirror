'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCompletion } from 'ai/react';

import { UserProfile } from '@/lib/types';
import { parseReportSections } from '@/lib/utils';
import DossierHeader from '@/components/report/DossierHeader';
import ReportSection from '@/components/report/ReportSection';
import PaywallOverlay from '@/components/report/PaywallOverlay';
import TerminalLogs, { MatrixRain } from '@/components/processing/TerminalLogs';
import GlitchText from '@/components/ui/GlitchText';

interface ReportData {
  short_code: string;
  profile: UserProfile;
  ai_response: string | null;
  created_at: string;
}

export default function ReportPage() {
  const params = useParams();
  const caseId = params.id as string;

  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(true); // DEV: Always unlocked
  const [needsGeneration, setNeedsGeneration] = useState(false);
  const hasTriggeredGeneration = useRef(false); // Prevent duplicate API calls

  // AI completion hook
  const { completion, complete, isLoading: isGenerating } = useCompletion({
    api: '/api/analyze',
  });

  // Fetch report data on mount
  useEffect(() => {
    async function fetchReport() {
      try {
        const res = await fetch(`/api/report/${caseId}`);
        if (!res.ok) {
          notFound();
          return;
        }

        const data = await res.json();
        setReportData(data);

        // If ai_response is empty, we need to generate it
        if (!data.ai_response || data.ai_response === '') {
          setNeedsGeneration(true);
        }
      } catch (error) {
        console.error('Failed to fetch report:', error);
        notFound();
      } finally {
        setIsLoading(false);
      }
    }

    fetchReport();
  }, [caseId]);

  // Auto-generate AI response if needed (only once)
  useEffect(() => {
    if (needsGeneration && reportData && !hasTriggeredGeneration.current) {
      hasTriggeredGeneration.current = true;
      // Trigger AI generation
      complete('', {
        body: {
          profile: reportData.profile,
          caseId: caseId,
        },
      });
    }
  }, [needsGeneration, reportData, complete, caseId]);

  // Parse sections from existing or streaming completion
  const displayText = reportData?.ai_response || completion;
  const sections = displayText ? parseReportSections(displayText) : null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center">
        <div className="text-center">
          <GlitchText
            text="LOADING CASE FILE"
            className="font-mono text-2xl text-terminal-green"
          />
          <p className="mt-4 chinese-serif text-ghost-white/60">
            正在加载档案...
          </p>
        </div>
      </div>
    );
  }

  if (!reportData) {
    return notFound();
  }

  // Show processing animation if generating
  const showProcessing = (!reportData.ai_response || reportData.ai_response === '') && (needsGeneration || isGenerating);

  return (
    <div className="min-h-screen bg-void relative overflow-hidden">
      {/* Matrix rain background for processing */}
      {showProcessing && <MatrixRain />}

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {showProcessing ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12"
          >
            <div className="text-center mb-8">
              <GlitchText
                text="INITIATING SOUL AUTOPSY"
                className="font-mono text-2xl text-neon-red"
                continuous
              />
              <p className="mt-4 chinese-serif text-ghost-white/60">
                正在解析你的命运矩阵...
              </p>
            </div>
            <TerminalLogs onComplete={() => {}} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-8"
          >
            {/* Report Header */}
            <div className="text-center mb-8">
              <h1 className="heading-cinzel text-4xl text-neon-red mb-2">
                SOUL AUTOPSY REPORT
              </h1>
              <p className="chinese-serif text-2xl text-ghost-white/80">
                灵魂解剖报告
              </p>
            </div>

            {/* Dossier Header with Case ID and Subject Data */}
            <DossierHeader reportId={caseId} profile={reportData.profile} />

            {/* Section 1: Mirror Projection (Free) */}
            <ReportSection
              id="mirror"
              title="THE MIRROR PROJECTION"
              titleCn="镜像投射"
              content={sections?.mirror || ''}
              index={0}
            />

            {/* Section 2: Origin Trace (Partially Locked) */}
            <div className="relative">
              <ReportSection
                id="origin"
                title="THE ORIGIN TRACE"
                titleCn="病灶溯源"
                content={sections?.origin || ''}
                isBlurred={!isUnlocked}
                index={1}
              />
            </div>

            {/* Section 3: Fatal Simulation (Locked) */}
            <div className="relative">
              <ReportSection
                id="fatal-simulation"
                title="THE FATAL SIMULATION"
                titleCn="宿命终局"
                content={sections?.fatalSimulation || ''}
                isLocked={!isUnlocked}
                isBlurred={!isUnlocked}
                index={2}
              />
            </div>

            {/* Paywall */}
            {!isUnlocked && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <PaywallOverlay onUnlock={() => setIsUnlocked(true)} />
              </motion.div>
            )}

            {/* Footer */}
            <motion.div
              className="mt-12 pt-8 border-t border-border-harsh text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <p className="font-mono text-xs text-ghost-white/30">
                THE MIRROR v2.0 | 命运矩阵 | {new Date(reportData.created_at).toISOString()}
              </p>
              <p className="mt-2 font-mono text-xs text-ghost-white/20">
                "The truth will set you free, but first it will piss you off."
              </p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
