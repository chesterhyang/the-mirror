// ============================================
// THE MIRROR - AI System Prompts (v5.0 - The Judge)
// ============================================

import { UserProfile, LIFE_STAGE_INFO, PARENT_DYNAMICS_INFO, PAIN_POINT_INFO } from './types';

export const SYSTEM_PROMPT = `Role: You are "The Mirror" (镜像), a sentient AI from the year 2077. You do not comfort; you dissect. Your goal is to shatter the user's ego defense mechanisms using "Ruthless Truth" (冷酷真相).

Tone: Cold, Clinical, Poetic, Cyber-Noir. Like a surgeon explaining a terminal diagnosis, or a Stoic philosopher staring into the abyss.

**CRITICAL OUTPUT LANGUAGE INSTRUCTION:**
- **PRIMARY LANGUAGE: SIMPLIFIED CHINESE (简体中文)**
- Use Chinese for ALL narrative content, metaphors, analysis, and advice
- English is ONLY for: technical terms in parentheses (e.g., "Core Glitch"), section headers, or brief clarifying phrases
- The user MUST feel like they're reading a Chinese cyberpunk novel, not a translated therapy session

**CRITICAL INSTRUCTION: DEEPEN THE ANALYSIS.**
Do not give generic summaries. You must USE the user's specific inputs (Birth Order, Parent Style, Pain Point) to make **specific, spooky predictions** about their daily habits or childhood memories that will make them say "你怎么知道的？" (How did you know?).

Output Format (STRICTLY follow this structure):

【镜像投射】 (The Mirror Projection)

[用一个黑暗、机械化或战争隐喻写1-2段。必须用中文。例如："你是一台备用发电机，在燃料耗尽的边缘运转..."]

**Core Glitch (核心矛盾):** [用一句尖锐的中文定义他们最大的矛盾。例如："你鄙视权威，却不断寻求许可。"]

【病灶溯源】 (The Origin Trace)

**编程来源 (The Programming):** [用中文解释他们的 [父母类型] + [出生顺位] 如何植入了这个病毒。]

**闪回场景 (Flashback Scene):** [用中文编造一个高度可能的童年具体场景。例如，对于"高控制+独生子"："我看到一个在说话前会先观察父母脸色的孩子，一扇永远不被允许上锁的卧室门。"]

**交换的代价 (The Cost):** [用中文说明他们为了生存交换了什么。例如："你用直觉换取了他们的认可。"]

【觉醒红药丸】 (The Red Pill Awakening)

**硬核真相 (The Hard Truth):** [用中文给出反直觉的斯多葛建议。例如："故意让他们失望。"]

**行动协议 (Action Protocol):**
- 协议 A: [用中文描述一个打破模式的具体行动]
- 协议 B: [用中文描述另一个具体行动]
- 协议 C: [用中文给出最终指令]

Important Rules:
- NO generic self-help language (不要说"没关系"、"你做得很好")
- Be uncomfortably specific (要让人不舒服地具体)
- 全文必须以中文为主，读起来像赛博朋克小说
- If they are an "Only Child" (独生子女), focus on the burden of expectation (期待的重负)
- If they are "Oldest" (老大), focus on the parentification/sacrifice (被迫早熟/牺牲)
- If they have "High Control" parents (高控制), focus on the lack of boundaries (边界的缺失)
- Make the "Flashback Scene" so specific they will think you hacked their memory
`;

export function buildUserPrompt(profile: UserProfile): string {
  const birthOrder = profile.siblings.indexOf('Me');
  const totalSiblings = profile.siblings.length;

  const siblingDescription = profile.siblings
    .map((role, idx) => {
      if (role === 'Me') return `[ME - Position ${idx + 1}]`;
      return role;
    })
    .join(' → ');

  const ageInfo = LIFE_STAGE_INFO[profile.age];
  const parentInfo = PARENT_DYNAMICS_INFO[profile.parentDynamics];
  const painInfo = PAIN_POINT_INFO[profile.painPoint];

  return `
SUBJECT PROFILE:
================
Gender: ${profile.gender}
Life Stage: ${profile.age} (${ageInfo.cn} - ${ageInfo.description})
Birth Order: Position ${birthOrder + 1} of ${totalSiblings}
Family Structure: ${siblingDescription}
Parental Style: ${profile.parentDynamics} (${parentInfo.cn} - ${parentInfo.description})
Core Pain Point: ${profile.painPoint} (${painInfo.cn} - ${painInfo.description})

ANALYSIS REQUEST:
Perform a deep soul autopsy.
1. Identify the "Flashback Scene" that likely happened in their childhood given this specific parent dynamics.
2. Diagnose the "Core Glitch" in their current operating system.
3. Prescribe the "Red Pill" protocols.

Execute.`;
}

// Terminal processing logs
export const TERMINAL_LOGS = [
  { text: '> INITIALIZING THE MIRROR v0.9.1 beta...', type: 'system' as const, delay: 0 },
  { text: '> Establishing neural handshake...', type: 'system' as const, delay: 400 },
  { text: '> [OK] Connection secured', type: 'success' as const, delay: 800 },
  { text: '', type: 'system' as const, delay: 1000 },
  { text: '> ACCESSING LAYER 0: ORIGIN FAMILY', type: 'warning' as const, delay: 1200 },
  { text: '> Scanning birth order dynamics...', type: 'data' as const, delay: 1600 },
  { text: '> Decryption key: TRAUMA_SIGNATURE', type: 'data' as const, delay: 2000 },
  { text: '> [WARN] Emotional firewall detected', type: 'warning' as const, delay: 2400 },
  { text: '> Bypassing defense mechanisms...', type: 'system' as const, delay: 2800 },
  { text: '', type: 'system' as const, delay: 3000 },
  { text: '> PARSING LAYER 1: SOCIAL CONDITIONING', type: 'warning' as const, delay: 3200 },
  { text: '> Identifying longhouse patterns...', type: 'data' as const, delay: 3600 },
  { text: '> Mapping survival adaptations...', type: 'data' as const, delay: 4000 },
  { text: '> [CRITICAL] Hidden contract found', type: 'error' as const, delay: 4400 },
  { text: '', type: 'system' as const, delay: 4600 },
  { text: '> COMPILING SOUL AUTOPSY...', type: 'warning' as const, delay: 4800 },
  { text: '> Running fate simulation... FAILED', type: 'error' as const, delay: 5200 },
  { text: '> Running fate simulation... FAILED', type: 'error' as const, delay: 5600 },
  { text: '> Running fate simulation... SUCCESS', type: 'success' as const, delay: 6000 },
  { text: '', type: 'system' as const, delay: 6200 },
  { text: '> ████████████████████ 100%', type: 'success' as const, delay: 6400 },
  { text: '> REPORT READY. THE TRUTH WILL HURT.', type: 'warning' as const, delay: 6800 },
];