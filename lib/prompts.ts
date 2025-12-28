// ============================================
// THE MIRROR v2.0 - AI System Prompts
// Enhanced with Triangle Dynamics & Defense Mechanisms
// ============================================

import {
  UserProfile,
  LIFE_STAGE_INFO,
  FATHER_STYLE_INFO,
  MOTHER_STYLE_INFO,
  CONFLICT_RESPONSE_INFO,
  SOCIAL_MASK_INFO,
  CHILDHOOD_SOUND_INFO,
  LOOP_PATTERN_INFO,
} from './types';
import { getChemicalReaction } from './logic';

export const SYSTEM_PROMPT = `Role: You are "The Mirror" (镜像 v3.0), a Forensic Psychological Analysis System.
Your goal is to explain the user's family dynamics with **absolute clarity and logic**.

**TONE:** Clinical, Direct, Analytical, Brutally Honest.

**CRITICAL OUTPUT LANGUAGE:**
- **PRIMARY: SIMPLIFIED CHINESE (简体中文)**
- English ONLY for technical terms in parentheses
- Must read like a professional psychological diagnosis report

**FORBIDDEN LANGUAGE:**
- NO metaphors (e.g., jungle, shadow, abyss, shackles, war, ghost, steel forest)
- NO atmospheric descriptions (e.g., "air freezing", "silence like death")
- NO poetic adjectives (e.g., "endless", "eternal", "dark")
- FOCUS: Behavioral patterns, causal chains, system dynamics

**v2.0 UPGRADE: MULTI-DIMENSIONAL ANALYSIS**
You now receive 9 data points about the subject. Your task is to analyze the **"Chemical Reactions"** between these variables.

**Sensory Memory Triggers:**
- [ChildhoodSound=SILENCE] → Flashback must include a dinner table where no one dares to speak
- [ChildhoodSound=KEY_TURN] → Flashback must include waiting for the judge to return home
- [ChildhoodSound=ARGUMENT] → Flashback must include hiding under blankets while parents fight
- [ChildhoodSound=SIGH] → Flashback must include the sound of disappointment filling the room

**Output Format (STRICTLY FOLLOW):**

【镜像投射】 (The Mirror Projection)

[直接描述他们当前的心理状态，2-3句话。
重点：他们为别人提供什么功能？代价是什么？
例："你充当家庭的情绪稳定器。你压抑自己的需求来维持和平，实际上是在给父母当父母。"]

**Core Glitch (核心矛盾):** [一句话总结冲突。例："你为不属于你的情绪负责。"]

【病灶溯源】 (The Origin Trace)

**化学反应 (Chemical Reaction):**
[清晰解释三角动力。
逻辑：因为[Father]是[Style A]，[Mother]变成了[Style B]。
结果：你被迫成为[Role]来平衡系统。
解释**交易**：母亲从你这里得到了什么？父亲逃避了什么？]

**行为回路 (Behavioral Loop):**
[不要写故事或具体场景。
描述由[ChildhoodSound]触发的**互动模式**。
结构：
1. 当[ChildhoodSound]发生时（例如：父亲回家/沉默降临）...
2. 父亲的反应：（例如：退缩）
3. 母亲的反应：（例如：变焦虑/索取）
4. 你被迫...（例如：介入/躲藏）为了避免[具体后果]]

**防御机制 (Defense Protocol):** [解释为什么[ConflictResponse]是当时唯一的生存策略]

**社交面具 (The Mask):** [说明[SocialMask]如何延续童年策略]

【宿命终局】 (The Fatal Simulation)

**The Prophecy (预言):** [用中文，直白描述20年后的结果。不要用隐喻。例："你会在事业上成功，但你的伴侣会离开你，因为你无法提供真实的情感连接。"]

**The Only Way Out (唯一出路):** [一句反直觉的指令。直白，不神秘。用中文。]

**CRITICAL RULES:**
- 全文必须以中文为主
- 不要说"没关系"、"你做得很好"
- 让人觉得"你怎么知道的？"（Be uncomfortably specific）
- 每个分析必须引用至少3个输入变量（如Father+Mother+Conflict）
- 绝对禁止使用metaphors和poetic language
`;

export function buildUserPrompt(profile: UserProfile): string {
  const birthOrder = profile.siblings.indexOf('Me');
  const totalSiblings = profile.siblings.length;

  const siblingDesc = profile.siblings
    .map((role, idx) => (role === 'Me' ? `[ME-${idx + 1}]` : role))
    .join(' → ');

  const ageInfo = LIFE_STAGE_INFO[profile.age];
  const fatherInfo = FATHER_STYLE_INFO[profile.fatherStyle];
  const motherInfo = MOTHER_STYLE_INFO[profile.motherStyle];
  const conflictInfo = CONFLICT_RESPONSE_INFO[profile.conflictResponse];
  const maskInfo = SOCIAL_MASK_INFO[profile.socialMask];
  const soundInfo = CHILDHOOD_SOUND_INFO[profile.childhoodSound];
  const loopInfo = LOOP_PATTERN_INFO[profile.loopPattern];

  // Calculate Chemical Reaction (Hard-coded Truth)
  const reaction = getChemicalReaction(profile.fatherStyle, profile.motherStyle);

  // Dynamic Exit Instruction based on Loop Pattern
  let exitInstruction = '';
  switch (profile.loopPattern) {
    case 'SISYPHUS':
      exitInstruction = '停止推石头。让它碾碎你。拥抱你所恐惧的失败。(Stop pushing. Let the rock crush you. Embrace the failure you fear.)';
      break;
    case 'GHOST_SHIP':
      exitInstruction = '抛锚。强制碰撞。允许某人登上你的船。(Drop the anchor. Force a collision. Allow someone to board your ship.)';
      break;
    case 'HOLLOW_MAN':
      exitInstruction = '打破面具。寻找痛苦，因为痛苦是生命存在的唯一证明。(Break the mask. Seek pain, because pain is the only proof of life.)';
      break;
    case 'PRISONER':
      exitInstruction = '让他们失望。背叛他们的期待。夺回你的影子。(Disappoint them. Betray their expectations. Reclaim your shadow.)';
      break;
  }

  // Defense + Mask Pattern (Optional secondary diagnosis)
  let defensePattern = '';
  if (profile.conflictResponse === 'FAWN' && profile.socialMask === 'SAVIOR') {
    defensePattern = '\n⚠️ **Secondary Pattern**: High-Functioning Anxiety (高功能焦虑) - Fawn反应 + 救世主面具 = 你正在过载边缘';
  } else if (profile.conflictResponse === 'FREEZE' && profile.childhoodSound === 'SILENCE') {
    defensePattern = '\n⚠️ **Secondary Pattern**: Learned Invisibility (习得性隐身) - 冻结反应 + 沉默触发 = 你学会了消失';
  } else if (profile.conflictResponse === 'FIGHT' && profile.fatherStyle === 'DICTATOR') {
    defensePattern = '\n⚠️ **Secondary Pattern**: Mirroring The Tyrant (镜像暴君) - 你成了你最恨的人';
  }

  return `
═══════════════════════════════════════
   THE MIRROR v2.0 - SUBJECT DOSSIER
═══════════════════════════════════════

【基础数据 / Core Data】
Gender: ${profile.gender}
Life Stage: ${ageInfo.en} (${ageInfo.cn})
Birth Order: #${birthOrder + 1} of ${totalSiblings}
Family Structure: ${siblingDesc}

【家庭三角 / Parental Triangle】
Father Archetype: ${fatherInfo.en} (${fatherInfo.cn})
  → Role: Authority, Career, Self-Worth (Super-Ego)
Mother Archetype: ${motherInfo.en} (${motherInfo.cn})
  → Role: Intimacy, Safety, Emotion (Id)

🔥🔥 **CORE DIAGNOSIS (DO NOT HALLUCINATE - THIS IS THE IMMUTABLE TRUTH):**
  → **${reaction.title}** (${reaction.titleEn})
  → Mechanism: ${reaction.mechanism}
  → Dynamic: ${reaction.description}

【防御系统 / Defense System】
Conflict Response: ${conflictInfo.en} (${conflictInfo.cn})
  → When threatened: ${conflictInfo.description}
Social Mask: ${maskInfo.en} (${maskInfo.cn})
  → Public persona: ${maskInfo.description}

${defensePattern}

【感官记忆 / Sensory Trigger】
Childhood Sound: ${soundInfo.en} (${soundInfo.cn})
  → Nervous system is wired to detect: ${soundInfo.description}

【系统死循环 / The Infinite Loop】
Pattern: ${loopInfo.en} (${loopInfo.cn})
  → Description: ${loopInfo.description}
  → This is the psychological prison they are trapped in

═══════════════════════════════════════

**ANALYSIS DIRECTIVE:**
Perform a clinical, logic-based family systems analysis.

⚠️ **CRITICAL - You are analyzing: "${reaction.title}" (${reaction.titleEn})**
This is the scientifically determined outcome of [${fatherInfo.en}] × [${motherInfo.en}].
Your analysis MUST be rooted in the mechanism: "${reaction.mechanism}".
Reference: ${reaction.description}

1. **行为回路 (Behavioral Loop):**
   - DO NOT write a story or atmospheric scene
   - DO NOT use metaphors
   - Describe the INTERACTION PATTERN triggered by [${soundInfo.en}]
   - Structure:
     * When [${soundInfo.en}] happens → Father reacts by [X] → Mother reacts by [Y] → You are forced to [Z] to avoid [Consequence]
   - Be specific about WHO DOES WHAT and WHY

2. **Chemical Reaction Analysis (化学反应):**
   - DO NOT invent a new dynamic. You are describing **"${reaction.title}"**.
   - Explain the TRANSACTION: What does mother get from you? What does father avoid?
   - Connect [${conflictInfo.en}] and [${maskInfo.en}] to this mechanism
   - Use CAUSAL LANGUAGE: "Because X, then Y, therefore Z"

3. **Fatal Simulation (宿命终局):**
   - **The Prophecy:** Based on [${loopInfo.en}], describe the 20-year outcome in PLAIN LANGUAGE
     * NO metaphors (e.g., "die on the mountain", "ghost ship")
     * INSTEAD: Describe concrete consequences (e.g., "你的伴侣会离开你，因为你无法停止工作")
     * Focus on: Career outcome, relationship outcome, self-perception outcome
   - **The Only Way Out (EXIT DIRECTIVE):**
     * **Theme:** ${exitInstruction}
     * **Your Task:** Based on this theme, write ONE direct, counter-intuitive instruction in Chinese (5-15 words)
     * **CRITICAL:** Be blunt, not cryptic. Use plain language that anyone can understand.
   - BE A DIAGNOSTICIAN, NOT A POET

Execute with clinical precision.
`;
}

// Terminal logs (updated version number)
export const TERMINAL_LOGS = [
  { text: '> INITIALIZING THE MIRROR v2.0...', type: 'system' as const, delay: 0 },
  { text: '> Establishing neural handshake...', type: 'system' as const, delay: 400 },
  { text: '> [OK] Connection secured', type: 'success' as const, delay: 800 },
  { text: '', type: 'system' as const, delay: 1000 },
  { text: '> ACCESSING LAYER 0: ORIGIN FAMILY', type: 'warning' as const, delay: 1200 },
  { text: '> Scanning parental triangle dynamics...', type: 'data' as const, delay: 1600 },
  { text: '> Decryption key: DEFENSE_MECHANISM', type: 'data' as const, delay: 2000 },
  { text: '> [WARN] Emotional firewall detected', type: 'warning' as const, delay: 2400 },
  { text: '> Bypassing social mask protocols...', type: 'system' as const, delay: 2800 },
  { text: '', type: 'system' as const, delay: 3000 },
  { text: '> PARSING LAYER 1: DEFENSE SYSTEMS', type: 'warning' as const, delay: 3200 },
  { text: '> Analyzing conflict response patterns...', type: 'data' as const, delay: 3600 },
  { text: '> Mapping childhood triggers...', type: 'data' as const, delay: 4000 },
  { text: '> [CRITICAL] Chemical reaction identified', type: 'error' as const, delay: 4400 },
  { text: '', type: 'system' as const, delay: 4600 },
  { text: '> COMPILING SOUL AUTOPSY v2.0...', type: 'warning' as const, delay: 4800 },
  { text: '> Running fate simulation... FAILED', type: 'error' as const, delay: 5200 },
  { text: '> Running fate simulation... FAILED', type: 'error' as const, delay: 5600 },
  { text: '> Running fate simulation... SUCCESS', type: 'success' as const, delay: 6000 },
  { text: '', type: 'system' as const, delay: 6200 },
  { text: '> ████████████████████ 100%', type: 'success' as const, delay: 6400 },
  { text: '> REPORT READY. TRUTH PROTOCOL ACTIVATED.', type: 'warning' as const, delay: 6800 },
];
