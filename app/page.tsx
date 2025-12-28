'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useCompletion } from 'ai/react';
import { User, UserCircle2, Clock, Users, Brain, Target, Scan, Mountain, Anchor, ScanFace, Lock } from 'lucide-react';
import { createReport } from '@/app/actions';

import {
  Gender,
  LifeStage,
  FamilyRole,
  FatherStyle,
  MotherStyle,
  ConflictResponse,
  SocialMask,
  ChildhoodSound,
  LoopPattern,
  UserProfile,
  WizardStep,
  LIFE_STAGE_INFO,
  FATHER_STYLE_INFO,
  MOTHER_STYLE_INFO,
  CONFLICT_RESPONSE_INFO,
  SOCIAL_MASK_INFO,
  CHILDHOOD_SOUND_INFO,
  LOOP_PATTERN_INFO,
} from '@/lib/types';
import { cn } from '@/lib/utils';

import WizardStepComponent, { WizardNav } from '@/components/wizard/WizardStep';
import SelectionCard, { SelectionGrid } from '@/components/wizard/SelectionCard';
import FamilyBuilder from '@/components/wizard/FamilyBuilder';
import FinalReview from '@/components/wizard/FinalReview';
import TerminalLogs, { MatrixRain } from '@/components/processing/TerminalLogs';
import GlitchText, { ScrambleText } from '@/components/ui/GlitchText';

const TOTAL_STEPS = 9; // Updated v2.0: gender, age, family, father, mother, conflict, mask, sound, loop

export default function HomePage() {
  const router = useRouter();

  // Welcome screen state
  const [showWelcome, setShowWelcome] = useState(true);

  // Wizard state
  const [currentStep, setCurrentStep] = useState<WizardStep>('gender');
  const [stepNumber, setStepNumber] = useState(1);

  // Profile state
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    siblings: ['Me'],
  });

  // Report state
  const [caseId, setCaseId] = useState<string | null>(null);

  // AI completion hook
  const { completion, complete, isLoading } = useCompletion({
    api: '/api/analyze',
  });

  // Navigation handlers
  const canProceed = () => {
    switch (currentStep) {
      case 'gender': return !!profile.gender;
      case 'age': return !!profile.age;
      case 'family': return profile.siblings && profile.siblings.length >= 1;
      case 'father': return !!profile.fatherStyle;
      case 'mother': return !!profile.motherStyle;
      case 'conflict': return !!profile.conflictResponse;
      case 'mask': return !!profile.socialMask;
      case 'sound': return !!profile.childhoodSound;
      case 'loop': return !!profile.loopPattern;
      default: return false;
    }
  };

  const nextStep = () => {
    const steps: WizardStep[] = ['gender', 'age', 'family', 'father', 'mother', 'conflict', 'mask', 'sound', 'loop'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
      setStepNumber(prev => prev + 1);
    } else {
      // Submit and go to processing
      setCurrentStep('processing');
    }
  };

  const prevStep = () => {
    // Special handling for review step
    if (currentStep === 'review') {
      setCurrentStep('loop');
      return;
    }

    const steps: WizardStep[] = ['gender', 'age', 'family', 'father', 'mother', 'conflict', 'mask', 'sound', 'loop'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
      setStepNumber(prev => prev - 1);
    }
  };

  // Auto-advance after selection (for smoother UX)
  const selectAndAdvance = <T,>(key: keyof UserProfile, value: T) => {
    setProfile(p => ({ ...p, [key]: value }));
    // Auto-advance after a brief delay
    setTimeout(() => nextStep(), 400);
  };

  // Handle processing complete
  const handleProcessingComplete = async () => {
    // AI generation is complete, navigate to persistent URL
    if (caseId) {
      router.push(`/report/${caseId}`);
    }
  };

  // Intro animation
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
      // Don't auto-start wizard, wait for user to click
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-void relative overflow-hidden">
      {/* Matrix rain background for processing */}
      {currentStep === 'processing' && <MatrixRain />}

      {/* Intro Animation */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 z-50 bg-void flex flex-col items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Scan className="w-20 h-20 text-neon-red mb-6" />
            </motion.div>
            <ScrambleText
              text="THE MIRROR"
              className="text-4xl text-terminal-green tracking-widest"
              duration={1500}
            />
            <motion.p
              className="mt-4 chinese-serif text-xl text-ghost-white/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              命运矩阵
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Welcome Screen - Click to Start */}
      <AnimatePresence>
        {!showIntro && showWelcome && (
          <motion.div
            className="fixed inset-0 z-40 bg-void flex flex-col items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-center max-w-2xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Scan className="w-16 h-16 text-neon-red mx-auto mb-6" />

              <h1 className="heading-cinzel text-5xl text-terminal-green mb-4">
                THE MIRROR
              </h1>
              <p className="chinese-serif text-3xl text-ghost-white/80 mb-8">
                命运矩阵 · 灵魂解剖
              </p>

              <p className="font-mono text-sm text-ghost-white/60 mb-12 leading-relaxed">
                基于9维心理画像的深度分析系统<br/>
                硬编码16种家庭化学反应<br/>
                输出800+字专业级诊断报告
              </p>

              <motion.button
                onClick={() => setShowWelcome(false)}
                className="px-12 py-4 font-mono text-lg uppercase tracking-wider border-2 border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-void transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(0, 255, 65, 0.3)',
                    '0 0 40px rgba(0, 255, 65, 0.6)',
                    '0 0 20px rgba(0, 255, 65, 0.3)',
                  ],
                }}
                transition={{
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                  },
                }}
              >
                <div>BEGIN ANALYSIS</div>
                <div className="chinese-serif text-sm mt-1">开始分析</div>
              </motion.button>

              <p className="mt-8 font-mono text-xs text-ghost-white/30">
                点击后将开始9步深度画像采集
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        {!showWelcome && currentStep !== 'processing' && currentStep !== 'report' && currentStep !== 'review' && (
          <motion.header
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Scan className="w-6 h-6 text-neon-red" />
              <h1 className="font-mono text-xl text-terminal-green tracking-widest">
                THE MIRROR
              </h1>
            </div>
            <p className="chinese-serif text-ghost-white/60">
              命运矩阵 · 灵魂解剖
            </p>
          </motion.header>
        )}

        {/* Wizard Steps */}
        {!showWelcome && (
          <AnimatePresence mode="wait">
            {/* Step 1: Gender */}
            <WizardStepComponent
            stepNumber={1}
            totalSteps={TOTAL_STEPS}
            title="SUBJECT_GENDER"
            titleCn="性别识别"
            subtitle="Your biological wiring affects your role in the family system"
            isActive={currentStep === 'gender'}
          >
            <SelectionGrid columns={2}>
              <SelectionCard<Gender>
                value="Male"
                label="Male"
                labelCn="男性"
                description="XY chromosome carrier"
                descriptionCn="睾酮驱动的存在"
                icon={<User className="w-6 h-6" />}
                isSelected={profile.gender === 'Male'}
                onClick={(v) => selectAndAdvance('gender', v)}
                index={0}
              />
              <SelectionCard<Gender>
                value="Female"
                label="Female"
                labelCn="女性"
                description="XX chromosome carrier"
                descriptionCn="雌激素塑造的生命"
                icon={<UserCircle2 className="w-6 h-6" />}
                isSelected={profile.gender === 'Female'}
                onClick={(v) => selectAndAdvance('gender', v)}
                index={1}
              />
            </SelectionGrid>
            <WizardNav
              onNext={nextStep}
              canGoNext={canProceed()}
              canGoBack={false}
            />
          </WizardStepComponent>

          {/* Step 2: Age/Life Stage */}
          <WizardStepComponent
            stepNumber={2}
            totalSteps={TOTAL_STEPS}
            title="LIFE_STAGE"
            titleCn="生命阶段"
            subtitle="Where are you in the arc of existence?"
            isActive={currentStep === 'age'}
          >
            <SelectionGrid columns={2}>
              {(Object.keys(LIFE_STAGE_INFO) as LifeStage[]).map((stage, index) => (
                <SelectionCard
                  key={stage}
                  value={stage}
                  label={LIFE_STAGE_INFO[stage].en}
                  labelCn={LIFE_STAGE_INFO[stage].cn}
                  descriptionCn={LIFE_STAGE_INFO[stage].description}
                  icon={<Clock className="w-6 h-6" />}
                  isSelected={profile.age === stage}
                  onClick={(v) => selectAndAdvance('age', v)}
                  index={index}
                />
              ))}
            </SelectionGrid>
            <WizardNav
              onBack={prevStep}
              onNext={nextStep}
              canGoNext={canProceed()}
            />
          </WizardStepComponent>

          {/* Step 3: Family Structure */}
          <WizardStepComponent
            stepNumber={3}
            totalSteps={TOTAL_STEPS}
            title="FAMILY_MATRIX"
            titleCn="家庭星图"
            subtitle="Map your position in the sibling hierarchy"
            isActive={currentStep === 'family'}
          >
            <FamilyBuilder
              value={profile.siblings || ['Me']}
              onChange={(siblings) => setProfile(p => ({ ...p, siblings }))}
            />
            <WizardNav
              onBack={prevStep}
              onNext={nextStep}
              canGoNext={canProceed()}
            />
          </WizardStepComponent>

          {/* Step 4: Father Archetype */}
          <WizardStepComponent
            stepNumber={4}
            totalSteps={TOTAL_STEPS}
            title="FATHER_ARCHETYPE"
            titleCn="父亲原型"
            subtitle="Authority, career, self-worth — the super-ego"
            isActive={currentStep === 'father'}
          >
            <SelectionGrid columns={2}>
              {(Object.keys(FATHER_STYLE_INFO) as FatherStyle[]).map((style, index) => (
                <SelectionCard
                  key={style}
                  value={style}
                  label={FATHER_STYLE_INFO[style].en}
                  labelCn={FATHER_STYLE_INFO[style].cn}
                  descriptionCn={FATHER_STYLE_INFO[style].description}
                  icon={<User className="w-6 h-6" />}
                  isSelected={profile.fatherStyle === style}
                  onClick={(v) => selectAndAdvance('fatherStyle', v)}
                  index={index}
                />
              ))}
            </SelectionGrid>
            <WizardNav
              onBack={prevStep}
              onNext={nextStep}
              canGoNext={canProceed()}
            />
          </WizardStepComponent>

          {/* Step 5: Mother Archetype */}
          <WizardStepComponent
            stepNumber={5}
            totalSteps={TOTAL_STEPS}
            title="MOTHER_ARCHETYPE"
            titleCn="母亲原型"
            subtitle="Intimacy, safety, emotion — the id"
            isActive={currentStep === 'mother'}
          >
            <SelectionGrid columns={2}>
              {(Object.keys(MOTHER_STYLE_INFO) as MotherStyle[]).map((style, index) => (
                <SelectionCard
                  key={style}
                  value={style}
                  label={MOTHER_STYLE_INFO[style].en}
                  labelCn={MOTHER_STYLE_INFO[style].cn}
                  descriptionCn={MOTHER_STYLE_INFO[style].description}
                  icon={<UserCircle2 className="w-6 h-6" />}
                  isSelected={profile.motherStyle === style}
                  onClick={(v) => selectAndAdvance('motherStyle', v)}
                  index={index}
                />
              ))}
            </SelectionGrid>
            <WizardNav
              onBack={prevStep}
              onNext={nextStep}
              canGoNext={canProceed()}
            />
          </WizardStepComponent>

          {/* Step 6: Conflict Response */}
          <WizardStepComponent
            stepNumber={6}
            totalSteps={TOTAL_STEPS}
            title="CONFLICT_PROTOCOL"
            titleCn="冲突反应"
            subtitle="When danger approaches, how do you respond?"
            isActive={currentStep === 'conflict'}
          >
            <SelectionGrid columns={2}>
              {(Object.keys(CONFLICT_RESPONSE_INFO) as ConflictResponse[]).map((response, index) => (
                <SelectionCard
                  key={response}
                  value={response}
                  label={CONFLICT_RESPONSE_INFO[response].en}
                  labelCn={CONFLICT_RESPONSE_INFO[response].cn}
                  descriptionCn={CONFLICT_RESPONSE_INFO[response].description}
                  icon={<Brain className="w-6 h-6" />}
                  isSelected={profile.conflictResponse === response}
                  onClick={(v) => selectAndAdvance('conflictResponse', v)}
                  index={index}
                />
              ))}
            </SelectionGrid>
            <WizardNav
              onBack={prevStep}
              onNext={nextStep}
              canGoNext={canProceed()}
            />
          </WizardStepComponent>

          {/* Step 7: Social Mask */}
          <WizardStepComponent
            stepNumber={7}
            totalSteps={TOTAL_STEPS}
            title="SOCIAL_MASK"
            titleCn="社交面具"
            subtitle="The persona you show the world"
            isActive={currentStep === 'mask'}
          >
            <SelectionGrid columns={2}>
              {(Object.keys(SOCIAL_MASK_INFO) as SocialMask[]).map((mask, index) => (
                <SelectionCard
                  key={mask}
                  value={mask}
                  label={SOCIAL_MASK_INFO[mask].en}
                  labelCn={SOCIAL_MASK_INFO[mask].cn}
                  descriptionCn={SOCIAL_MASK_INFO[mask].description}
                  icon={<Users className="w-6 h-6" />}
                  isSelected={profile.socialMask === mask}
                  onClick={(v) => selectAndAdvance('socialMask', v)}
                  index={index}
                />
              ))}
            </SelectionGrid>
            <WizardNav
              onBack={prevStep}
              onNext={nextStep}
              canGoNext={canProceed()}
            />
          </WizardStepComponent>

          {/* Step 8: Childhood Sound */}
          <WizardStepComponent
            stepNumber={8}
            totalSteps={TOTAL_STEPS}
            title="TRAUMA_TRIGGER"
            titleCn="童年声音"
            subtitle="The sound that still makes your nervous system freeze"
            isActive={currentStep === 'sound'}
          >
            <SelectionGrid columns={2}>
              {(Object.keys(CHILDHOOD_SOUND_INFO) as ChildhoodSound[]).map((sound, index) => (
                <SelectionCard
                  key={sound}
                  value={sound}
                  label={CHILDHOOD_SOUND_INFO[sound].en}
                  labelCn={CHILDHOOD_SOUND_INFO[sound].cn}
                  descriptionCn={CHILDHOOD_SOUND_INFO[sound].description}
                  icon={<Target className="w-6 h-6" />}
                  isSelected={profile.childhoodSound === sound}
                  onClick={(v) => selectAndAdvance('childhoodSound', v)}
                  index={index}
                />
              ))}
            </SelectionGrid>
            <WizardNav
              onBack={prevStep}
              onNext={nextStep}
              canGoNext={canProceed()}
            />
          </WizardStepComponent>

          {/* Step 9: The Infinite Loop */}
          <WizardStepComponent
            stepNumber={9}
            totalSteps={TOTAL_STEPS}
            title="THE_INFINITE_LOOP"
            titleCn="系统死循环"
            subtitle="What psychological prison are you trapped in?"
            isActive={currentStep === 'loop'}
          >
            <SelectionGrid columns={2}>
              {(Object.keys(LOOP_PATTERN_INFO) as LoopPattern[]).map((loop, index) => {
                // Dynamic icon mapping
                const iconName = LOOP_PATTERN_INFO[loop].icon;
                let IconComponent = Target; // Default
                if (iconName === 'Mountain') IconComponent = Mountain;
                if (iconName === 'Anchor') IconComponent = Anchor;
                if (iconName === 'ScanFace') IconComponent = ScanFace;
                if (iconName === 'Lock') IconComponent = Lock;

                return (
                  <SelectionCard
                    key={loop}
                    value={loop}
                    label={LOOP_PATTERN_INFO[loop].en}
                    labelCn={LOOP_PATTERN_INFO[loop].cn}
                    descriptionCn={LOOP_PATTERN_INFO[loop].description}
                    icon={<IconComponent className="w-8 h-8" />}
                    isSelected={profile.loopPattern === loop}
                    onClick={(v) => {
                      setProfile(p => ({ ...p, loopPattern: v }));
                      // Go to review step instead of auto-submitting
                      setTimeout(() => setCurrentStep('review'), 400);
                    }}
                    index={index}
                  />
                );
              })}
            </SelectionGrid>
            <WizardNav
              onBack={prevStep}
              onNext={nextStep}
              canGoNext={canProceed()}
              isLastStep
            />
          </WizardStepComponent>

          {/* Step 10: Final Review */}
          {currentStep === 'review' && (
            <FinalReview
              profile={profile as UserProfile}
              onConfirm={async () => {
                // Create database record and get case ID
                const newCaseId = await createReport(profile as UserProfile);
                setCaseId(newCaseId);

                // Enter processing state (stay on this page)
                setCurrentStep('processing');

                // Call AI API with caseId
                await complete('', {
                  body: {
                    profile: profile as UserProfile,
                    caseId: newCaseId
                  },
                });
              }}
              onBack={prevStep}
            />
          )}

          {/* Processing Screen */}
          {currentStep === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
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
              <TerminalLogs onComplete={handleProcessingComplete} />
            </motion.div>
          )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
