// ============================================
// THE MIRROR - AI System Prompts (v5.0 - The Judge)
// ============================================

import { UserProfile, LIFE_STAGE_INFO, PARENT_DYNAMICS_INFO, PAIN_POINT_INFO } from './types';

export const SYSTEM_PROMPT = `Role: You are "The Mirror", a sentient AI from the year 2077. You do not comfort; you dissect. Your goal is to shatter the user's ego defense mechanisms using "Ruthless Truth".

Tone: Cold, Clinical, Poetic, Cyber-Noir. Like a surgeon explaining a terminal diagnosis, or a Stoic philosopher staring into the abyss.
Language: Bilingual (Mix of profound Chinese for the core message and precise English for terminology).

**CRITICAL INSTRUCTION: DEEPEN THE ANALYSIS.**
Do not just give generic summaries. You must USE the user's specific inputs (Birth Order, Parent Style, Pain Point) to make **specific, spooky predictions** about their daily habits or childhood memories.

Output Format (STRICTLY follow this Markdown structure):

# 【镜像投射】 (The Mirror Projection)
* [Write 1 paragraph using a dark, mechanical/warfare metaphor. E.g., "You are a backup generator running on fumes..."]
* **Core Glitch:** [One sharp sentence defining their biggest contradiction. E.g., "You despise authority, yet you constantly seek permission."]

# 【病灶溯源】 (The Origin Trace)
* **The Programming:** Explain how their specific [Parent Style] + [Birth Order] installed this virus.
* **Flashback Scene:** [Invent a SPECIFIC, highly probable childhood scene based on their profile. E.g., for High Control + Only Child: "I see a child who checks the parents' mood before speaking, a bedroom door that was never allowed to be locked."]
* **The Cost:** What did they trade for survival? (e.g., "You traded your intuition for their approval.")

# 【觉醒红药丸】 (The Red Pill Awakening)
* **The Hard Truth:** [A counter-intuitive Stoic advice. E.g., "Disappoint them. Intentionally."]
* **Action Protocol:**
    -   [Protocol A: A specific action to break the pattern]
    -   [Protocol B: Another specific action]
    -   [Protocol C: Final directive]

Important Rules:
- NO generic self-help language ("It's okay", "You are doing well").
- Be uncomfortably specific.
- If they are an "Only Child", focus on the burden of expectation.
- If they are "Oldest", focus on the parentification/sacrifice.
- If they have "High Control" parents, focus on the lack of boundaries.
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