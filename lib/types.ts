// ============================================
// THE MIRROR v2.0 - Type Definitions
// 9-Step Expanded Psychological Map
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

// Father archetypes (Authority/Super-Ego)
export type FatherStyle =
  | 'ABSENT'      // 影子父亲
  | 'DICTATOR'    // 暴君父亲
  | 'WEAK'        // 无力父亲
  | 'SECURE';     // 灯塔父亲

// Mother archetypes (Intimacy/Id)
export type MotherStyle =
  | 'ENGULFING'   // 吞噬母亲
  | 'ANXIOUS'     // 雨季母亲
  | 'VICTIM'      // 受害母亲
  | 'SECURE';     // 大地母亲

// Conflict response (Defense mechanism)
export type ConflictResponse =
  | 'FAWN'        // 讨好修补
  | 'FREEZE'      // 僵死冻结
  | 'FIGHT'       // 激进反击
  | 'FLIGHT';     // 冷酷切割

// Social mask (Persona)
export type SocialMask =
  | 'SAVIOR'          // 全能强者
  | 'CLOWN'           // 快乐小丑
  | 'PERFECTIONIST'   // 完美机器
  | 'REBEL';          // 虚无浪子

// Childhood trauma trigger
export type ChildhoodSound =
  | 'SILENCE'     // 突然的沉默
  | 'SIGH'        // 沉重的叹气
  | 'KEY_TURN'    // 门锁转动声
  | 'ARGUMENT';   // 隔墙的争吵

// The Infinite Loop - Psychological Prison Patterns
export type LoopPattern =
  | 'SISYPHUS'    // The High Achiever / Anxiety Loop
  | 'GHOST_SHIP'  // The Avoidant / Intimacy Loop
  | 'HOLLOW_MAN'  // The Depressive / Numbness Loop
  | 'PRISONER';   // The People Pleaser / Control Loop

// Updated User Profile (v2.0)
export interface UserProfile {
  gender: Gender;
  age: LifeStage;
  siblings: FamilyRole[];
  fatherStyle: FatherStyle;
  motherStyle: MotherStyle;
  conflictResponse: ConflictResponse;
  socialMask: SocialMask;
  childhoodSound: ChildhoodSound;
  loopPattern: LoopPattern;
}

// Wizard steps (10 total: 9 data collection + 1 review)
export type WizardStep =
  | 'gender'          // 1
  | 'age'             // 2
  | 'family'          // 3
  | 'father'          // 4
  | 'mother'          // 5
  | 'conflict'        // 6
  | 'mask'            // 7
  | 'sound'           // 8
  | 'loop'            // 9 - The Infinite Loop
  | 'review'          // 10 - Final Seal / Confirmation
  | 'processing'
  | 'report';

// ============================================
// UI Data Constants
// ============================================

export const LIFE_STAGE_INFO: Record<LifeStage, { cn: string; en: string; description: string }> = {
  'Lost (18-25)': {
    en: 'The Wandering',
    cn: '迷航期',
    description: '在无数选择中寻找坐标 / Searching for coordinates in chaos'
  },
  'High Pressure (26-35)': {
    en: 'The Forge',
    cn: '熔炉期',
    description: '高压锻造，重塑自我 / Under immense pressure to transform'
  },
  'Disillusioned (36-45)': {
    en: 'The Void',
    cn: '幻灭期',
    description: '旧神已死，新神未立 / The old illusions have crumbled'
  },
  'Reconciled (45+)': {
    en: 'The Rebirth',
    cn: '重构期',
    description: '与命运和解，或再次宣战 / Reconciling with or raging against fate'
  }
};

export const FATHER_STYLE_INFO: Record<FatherStyle, { cn: string; en: string; description: string }> = {
  'ABSENT': {
    en: 'The Phantom',
    cn: '影子父亲',
    description: '物理在场，精神缺席 / Physically present, spiritually absent'
  },
  'DICTATOR': {
    en: 'The Dictator',
    cn: '暴君父亲',
    description: '绝对权威，不允许反驳 / Law and order, no mercy'
  },
  'WEAK': {
    en: 'The Passive',
    cn: '无力父亲',
    description: '温和但软弱，无法提供保护 / Kind but powerless'
  },
  'SECURE': {
    en: 'The Anchor',
    cn: '灯塔父亲',
    description: '稳固的支持与边界 / Secure attachment'
  }
};

export const MOTHER_STYLE_INFO: Record<MotherStyle, { cn: string; en: string; description: string }> = {
  'ENGULFING': {
    en: 'The Devourer',
    cn: '吞噬母亲',
    description: '以爱之名，行控制之实 / Over-involved, no boundaries'
  },
  'ANXIOUS': {
    en: 'The Rain',
    cn: '雨季母亲',
    description: '情绪多变，让你如履薄冰 / Walking on eggshells'
  },
  'VICTIM': {
    en: 'The Martyr',
    cn: '受害母亲',
    description: '用内疚感作为武器 / Weaponized guilt'
  },
  'SECURE': {
    en: 'The Earth',
    cn: '大地母亲',
    description: '温和包容 / Secure attachment'
  }
};

export const CONFLICT_RESPONSE_INFO: Record<ConflictResponse, { cn: string; en: string; description: string }> = {
  'FAWN': {
    en: 'The Fixer',
    cn: '讨好修补',
    description: '恐慌性道歉，试图拯救关系 / Panic fixing, fear of abandonment'
  },
  'FREEZE': {
    en: 'The Ghost',
    cn: '僵死冻结',
    description: '大脑空白，只想躲起来 / Disassociation, hiding'
  },
  'FIGHT': {
    en: 'The Striker',
    cn: '激进反击',
    description: '先发制人，必须赢 / Pre-emptive strike'
  },
  'FLIGHT': {
    en: 'The Iceberg',
    cn: '冷酷切割',
    description: '迅速抽离情感，断绝连接 / Emotional detachment'
  }
};

export const SOCIAL_MASK_INFO: Record<SocialMask, { cn: string; en: string; description: string }> = {
  'SAVIOR': {
    en: 'The Savior',
    cn: '全能强者',
    description: '不仅解决问题，还要拯救他人 / Cannot show weakness'
  },
  'CLOWN': {
    en: 'The Jester',
    cn: '快乐小丑',
    description: '用幽默掩盖悲伤 / Deflecting pain with humor'
  },
  'PERFECTIONIST': {
    en: 'The Machine',
    cn: '完美机器',
    description: '不允许任何错误 / Terrified of criticism'
  },
  'REBEL': {
    en: 'The Drifter',
    cn: '虚无浪子',
    description: '假装不在乎，实则渴望连接 / Pretending not to care'
  }
};

export const CHILDHOOD_SOUND_INFO: Record<ChildhoodSound, { cn: string; en: string; description: string }> = {
  'SILENCE': {
    en: 'Sudden Silence',
    cn: '突然的沉默',
    description: '暴风雨前的宁静 / The air freezing before anger'
  },
  'SIGH': {
    en: 'The Heavy Sigh',
    cn: '沉重的叹气',
    description: '令人窒息的失望 / The sound of disappointment'
  },
  'KEY_TURN': {
    en: 'The Key Turn',
    cn: '门锁转动声',
    description: '审判者归来的恐惧 / The Judge returning home'
  },
  'ARGUMENT': {
    en: 'Muffled War',
    cn: '隔墙的争吵',
    description: '躲在被子里的无助 / Helplessness behind the door'
  }
};

export const LOOP_PATTERN_INFO: Record<LoopPattern, { cn: string; en: string; description: string; icon: string }> = {
  SISYPHUS: {
    cn: '西西弗斯之刑',
    en: 'The Sisyphus Loop',
    description: '只要停下来，我就觉得自己是废物。成就感是我唯一的止痛药。',
    icon: 'Mountain' // 登山/努力
  },
  GHOST_SHIP: {
    cn: '幽灵船航线',
    en: 'The Ghost Ship Loop',
    description: '我渴望亲密，但只要有人真的靠近，我的第一反应是逃跑。',
    icon: 'Anchor' // 船锚/孤立
  },
  HOLLOW_MAN: {
    cn: '空心人综合症',
    en: 'The Hollow Man Loop',
    description: '我在外人眼中极其完美，但在独处时，我感受不到任何活着的实感。',
    icon: 'ScanFace' // 面具/空洞
  },
  PRISONER: {
    cn: '完美囚徒',
    en: 'The Prisoner Loop',
    description: '如果没有别人的许可或赞赏，我甚至不知道该如何度过这一天。',
    icon: 'Lock' // 锁/监狱
  }
};

// Report sections
export interface ReportSection {
  id: string;
  title: string;
  titleCn: string;
  content: string;
  isLocked: boolean;
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
