// ============================================
// THE MIRROR - Type Definitions
// ============================================

export type Gender = 'Male' | 'Female';

export type LifeStage =
  | 'Lost (18-25)'
  | 'High Pressure (26-35)'
  | 'Disillusioned (36-45)'
  | 'Reconciled (45+)';

export type FamilyRole =
  | 'Older Brother'
  | 'Older Sister'
  | 'Me'
  | 'Younger Brother'
  | 'Younger Sister';

export type ParentDynamics =
  | 'High Control'      // 高控制型 - 直升机父母
  | 'Critical/Strict'   // 批评/严厉型
  | 'Absent/Neglect'    // 缺位/忽视型
  | 'Spoiling'          // 溺爱型
  | 'Chaotic';          // 混乱型

export type PainPoint =
  | 'Money/Career'      // 金钱/事业焦虑
  | 'Love/Relationship' // 亲密关系困境
  | 'Self/Meaning';     // 自我认同/意义危机

export interface UserProfile {
  gender: Gender;
  age: LifeStage;
  siblings: FamilyRole[]; // Ordered list including 'Me'
  parentDynamics: ParentDynamics;
  painPoint: PainPoint;
}

// Wizard step tracking
export type WizardStep =
  | 'gender'
  | 'age'
  | 'family'
  | 'parents'
  | 'pain'
  | 'processing'
  | 'report';

// Report sections
export interface ReportSection {
  id: string;
  title: string;
  titleCn: string;
  content: string;
  isLocked: boolean;
}

// Terminal log entry
export interface TerminalLog {
  id: number;
  text: string;
  type: 'system' | 'warning' | 'error' | 'success' | 'data';
  delay: number;
}

// Selection card option
export interface SelectionOption<T> {
  value: T;
  label: string;
  labelCn: string;
  description?: string;
  descriptionCn?: string;
  icon?: string;
}

// API Response
export interface AnalyzeResponse {
  success: boolean;
  report?: {
    mirror: string;
    origin: string;
    redPill: string;
  };
  error?: string;
}

// Life stage descriptions for UI
export const LIFE_STAGE_INFO: Record<LifeStage, { cn: string; description: string }> = {
  'Lost (18-25)': {
    cn: '迷失期 (18-25)',
    description: '身份探索，不知道自己是谁'
  },
  'High Pressure (26-35)': {
    cn: '高压期 (26-35)',
    description: '事业冲刺，社会时钟的奴隶'
  },
  'Disillusioned (36-45)': {
    cn: '幻灭期 (36-45)',
    description: '中年危机，质疑一切选择'
  },
  'Reconciled (45+)': {
    cn: '和解期 (45+)',
    description: '寻求意义，与过去握手言和'
  }
};

// Parent dynamics descriptions
export const PARENT_DYNAMICS_INFO: Record<ParentDynamics, { cn: string; description: string }> = {
  'High Control': {
    cn: '高控制型',
    description: '直升机父母，每个决定都要过问'
  },
  'Critical/Strict': {
    cn: '批评/严厉型',
    description: '永远不够好，标准高到窒息'
  },
  'Absent/Neglect': {
    cn: '缺位/忽视型',
    description: '物质供给，情感沙漠'
  },
  'Spoiling': {
    cn: '溺爱型',
    description: '过度保护，剥夺你的成长'
  },
  'Chaotic': {
    cn: '混乱型',
    description: '情绪不稳，你是他们的情绪垃圾桶'
  }
};

// Pain point descriptions
export const PAIN_POINT_INFO: Record<PainPoint, { cn: string; description: string }> = {
  'Money/Career': {
    cn: '金钱/事业',
    description: '总觉得赚得不够，永远在追赶'
  },
  'Love/Relationship': {
    cn: '亲密关系',
    description: '无法建立深度连接，或反复受伤'
  },
  'Self/Meaning': {
    cn: '自我/意义',
    description: '不知道自己是谁，活着为了什么'
  }
};
