// ============================================
// THE MIRROR v2.0 - Family Systems Logic
// Hard-coded Psychological Truth Table
// ============================================

import { FatherStyle, MotherStyle } from './types';

export interface ChemicalReaction {
  title: string;       // 诊断名称 (e.g., "情感配偶")
  titleEn: string;     // English title (e.g., "The Surrogate Spouse")
  mechanism: string;   // 心理学机制 (e.g., "Spousification")
  description: string; // 具体的动力学描述
}

// 16种父母组合的硬编码诊断 (4 Father × 4 Mother)
const FAMILY_MATRIX: Record<string, ChemicalReaction> = {
  // ============================================
  // FATHER: ABSENT (影子父亲 - 缺位)
  // ============================================
  'ABSENT_ENGULFING': {
    title: '情感配偶',
    titleEn: 'The Surrogate Spouse',
    mechanism: 'Spousification (配偶化/情绪乱伦)',
    description: '父亲的缺席留下了权力的真空，母亲不仅是母亲，还是你情感的寄生者。你被迫填补了父亲的位置，成为了母亲的"小丈夫"或"情绪伴侣"。这种过度的亲密让你在成年后对亲密关系感到窒息。'
  },
  'ABSENT_ANXIOUS': {
    title: '早熟家长',
    titleEn: 'The Parentified Child',
    mechanism: 'Parentification (亲职化)',
    description: '家里没有大人。父亲不在，母亲在恐慌。你必须迅速长大，不仅要照顾自己，还要安抚情绪不稳定的母亲。你失去了童年，因为你不敢当个孩子。'
  },
  'ABSENT_VICTIM': {
    title: '孤独支柱',
    titleEn: 'The Lonely Pillar',
    mechanism: 'Neglect & Burden (忽视与重担)',
    description: '父亲逃跑了，留下一地鸡毛和哭泣的母亲。你不得不独自撑起这个家，既要提供物质支持，又要提供情绪价值，却无人看见你的疲惫。'
  },
  'ABSENT_SECURE': {
    title: '单翼天使',
    titleEn: 'The One-Winged',
    mechanism: 'Partial Deprivation (部分缺失)',
    description: '母亲尽力给了你安全感，但父亲的缺席让你对男性权威和外部世界感到陌生。你可能在亲密关系中独立，但在社会竞争中缺乏底气。'
  },

  // ============================================
  // FATHER: DICTATOR (暴君父亲 - 专制)
  // ============================================
  'DICTATOR_ENGULFING': {
    title: '完美囚徒',
    titleEn: 'The Perfect Prisoner',
    mechanism: 'Double Bind (双重束缚)',
    description: '这也是控制，那也是控制。父亲控制你的行为，母亲控制你的感受。你学会了像机器一样精准地执行指令，甚至学会了"读心术"，因为任何错误都会招致毁灭。'
  },
  'DICTATOR_ANXIOUS': {
    title: '惊弓之鸟',
    titleEn: 'The Walking Radar',
    mechanism: 'Hyper-vigilance (过度警觉)',
    description: '父亲的暴怒和母亲的惊恐交织在一起。你变成了家里的"情绪雷达"，能从开门的声音判断今天的安全等级。你的神经系统永远处于战备状态。'
  },
  'DICTATOR_VICTIM': {
    title: '悲剧拯救者',
    titleEn: 'The Tragic Rescuer',
    mechanism: 'Triangulation (卡普曼三角)',
    description: '典型的戏剧三角：父亲是迫害者，母亲是受害者，而你被迫成为了拯救者。你憎恨强权，却又对"软弱的人"产生病态的责任感。你的一生都在试图拯救那些像你母亲一样无法自立的人。'
  },
  'DICTATOR_SECURE': {
    title: '被压抑的叛逆者',
    titleEn: 'The Suppressed Rebel',
    mechanism: 'Authority Conflict (权威冲突)',
    description: '母亲的稳定给了你反抗的底气，但父亲的压制让你对权威充满敌意。你可能在表面顺从，内心却在策划一场永恒的起义。'
  },

  // ============================================
  // FATHER: WEAK (无力父亲 - 软弱)
  // ============================================
  'WEAK_ENGULFING': {
    title: '被吞噬的王',
    titleEn: 'The Crownless King',
    mechanism: 'Enmeshment (共生纠缠)',
    description: '母亲看不起父亲，于是联合你组成同盟来鄙视父亲。你获得了虚假的家庭地位（比父亲高），但内心深处极度缺乏安全感，因为你击败了自己的父亲。'
  },
  'WEAK_ANXIOUS': {
    title: '不安的守护者',
    titleEn: 'The Anxious Guardian',
    mechanism: 'Role Confusion (角色混乱)',
    description: '父亲无法保护家庭，母亲陷入焦虑。你被迫成为家庭的"稳定器"，但你自己也只是个孩子。你学会了隐藏恐惧，假装强大。'
  },
  'WEAK_VICTIM': {
    title: '双重孤儿',
    titleEn: 'The Double Orphan',
    mechanism: 'Abandonment (双重遗弃)',
    description: '父亲软弱到无法履行职责，母亲沉浸在受害者角色中。你在这个家里是个孤儿，既没有父亲的保护，也没有母亲的滋养。你学会了不依赖任何人。'
  },
  'WEAK_SECURE': {
    title: '温柔的继承者',
    titleEn: 'The Gentle Heir',
    mechanism: 'Compassion Learning (同理心习得)',
    description: '父亲虽然软弱，但不邪恶。母亲稳定包容。你学会了用温和而非暴力解决问题，但可能在需要强硬时显得过于柔软。'
  },

  // ============================================
  // FATHER: SECURE (灯塔父亲 - 稳定)
  // ============================================
  'SECURE_ENGULFING': {
    title: '金色牢笼',
    titleEn: 'The Golden Cage',
    mechanism: 'Maternal Enmeshment (母性吞噬)',
    description: '父亲稳定但母亲过度介入。你在物质和安全上无忧，但母亲的控制让你无法真正独立。你像个被过度保护的太子，缺乏真实世界的生存能力。'
  },
  'SECURE_ANXIOUS': {
    title: '矛盾的根基',
    titleEn: 'The Contradicted Foundation',
    mechanism: 'Parental Contrast (父母对比)',
    description: '父亲稳如磐石，母亲飘忽不定。你不知道该相信稳定还是准备随时应对危机。你内在的安全感和焦虑在不断拉扯。'
  },
  'SECURE_VICTIM': {
    title: '无辜的调解者',
    titleEn: 'The Innocent Mediator',
    mechanism: 'Parentification Lite (轻度亲职化)',
    description: '父亲稳定但母亲总是受伤。你虽然有父亲的保护，但仍然忍不住想去"拯救"母亲。你可能成为了家庭的情绪翻译官。'
  },
  'SECURE_SECURE': {
    title: '幸运的少数',
    titleEn: 'The Fortunate Few',
    mechanism: 'Secure Attachment (安全依恋)',
    description: '你是极少数的幸运儿。父母双方都相对稳定，给了你足够的自由和支持。你的创伤可能来自其他地方（社会、同伴、意外），而非原生家庭。'
  },
};

/**
 * 计算父母组合的化学反应
 */
export function getChemicalReaction(
  father: FatherStyle,
  mother: MotherStyle
): ChemicalReaction {
  const key = `${father}_${mother}`;

  return FAMILY_MATRIX[key] || {
    title: '未知组合',
    titleEn: 'Unknown Pattern',
    mechanism: 'Complex Interaction',
    description: '你的家庭呈现出一种独特的混合态，无法用单一模式定义。'
  };
}
