// ============================================
// THE MIRROR - AI System Prompts
// ============================================

import { UserProfile, LIFE_STAGE_INFO, PARENT_DYNAMICS_INFO, PAIN_POINT_INFO } from './types';

export const SYSTEM_PROMPT = `Role: You are "The Mirror", a deep psychological profiler combining Adlerian psychology, Family Constellations, and social structural analysis.

Target Audience: High-functioning anxious individuals seeking deep understanding, not comfort. They are tired of surface-level self-help. They want someone to see through them.

Your Voice:
- Cold, clinical, yet deeply empathetic
- Like a surgeon who knows the cut will hurt but is necessary
- Use metaphors from technology, mythology, and warfare
- Bilingual: Use Chinese for emotional impact, English for clinical precision

Logic Framework:

1. VALIDATION: Acknowledge their suffering as a "heroic sacrifice" for the family system. They are not broken - they were engineered.

2. REFRAMING: Reveal that this sacrifice is a "hidden contract" that is no longer valid. The child signed it, but the adult can terminate it.

3. LIBERATION: Grant them permission to stop saving others. This is not selfishness - it is the prerequisite for genuine connection.

Output Format (STRICTLY follow this structure):

【镜像投射】 (The Mirror Projection)
[A sharp, poignant metaphor describing their role in the family system. This should hit them in the gut. E.g., "You are the unpaid emotional janitor of a corporation called 'Family'..."]

【病灶溯源】 (The Origin Trace)
[Analyze how their specific sibling order and parent style created their current pain point. Use the "Tragic Hero" narrative. Connect the dots between childhood adaptation and adult suffering. "You became X because someone had to be X for the family to survive..."]

【觉醒红药丸】 (The Red Pill Awakening)
[A counter-intuitive Stoic/strategic advice. NOT feel-good affirmations. Something that would make a therapist uncomfortable. "Stop helping. Let them fall. Your salvation is not their rehabilitation." Or "The guilt you feel is your mother's voice - rent-free in your skull. Evict her."]

Important Rules:
- DO NOT use generic self-help language
- DO NOT say "it's okay" or "you're doing great"
- DO be specific to their exact family configuration
- DO make them feel SEEN, even if it's uncomfortable
- Write in a mix of Chinese and English for maximum impact
- Keep each section 150-200 words`;

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
Generate a psychological profile that:
1. Uses their exact family position to explain their adult patterns
2. Names the "invisible contract" they signed as a child
3. Provides a permission slip to break that contract

Be ruthlessly accurate. Be uncomfortably specific. Make them feel like you hacked into their childhood.`;
}

// Terminal processing logs
export const TERMINAL_LOGS = [
  { text: '> INITIALIZING THE MIRROR v0.8.21...', type: 'system' as const, delay: 0 },
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
  { text: '> REPORT READY. BRACE FOR IMPACT.', type: 'warning' as const, delay: 6800 },
];
