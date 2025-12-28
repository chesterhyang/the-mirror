'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import { motion } from 'framer-motion';

import { UserProfile } from '@/lib/types';
import { parseReportSections } from '@/lib/utils';
import DossierHeader from '@/components/report/DossierHeader';
import ReportSection from '@/components/report/ReportSection';
import PaywallOverlay from '@/components/report/PaywallOverlay';
import GlitchText from '@/components/ui/GlitchText';

interface ReportData {
  short_code: string;
  profile: UserProfile;
  ai_response: string;
  created_at: string;
}

export default function ReportPage() {
  const params = useParams();
  const caseId = params.id as string;

  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(true); // DEV: Always unlocked

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

        console.log('[DEBUG] Fetched report:', {
          caseId: data.short_code,
          ai_response_length: data.ai_response?.length || 0,
          ai_response_preview: data.ai_response?.substring(0, 50) || 'EMPTY'
        });

        // If ai_response is empty, show error
        if (!data.ai_response || data.ai_response === '') {
          console.error('[ERROR] Report exists but ai_response is empty');
          notFound();
          return;
        }

        setReportData(data);
      } catch (error) {
        console.error('Failed to fetch report:', error);
        notFound();
      } finally {
        setIsLoading(false);
      }
    }

    fetchReport();
  }, [caseId]);

  // Parse sections from ai_response
  const sections = reportData?.ai_response ? parseReportSections(reportData.ai_response) : null;

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

  return (
    <div className="min-h-screen bg-void relative overflow-hidden">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
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
      </div>
    </div>
  );
}
