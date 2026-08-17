import type { CombatStatusEffectId } from "./types";

export type BossAttackProfile = {
  name: string;
  powerMultiplier: number;
  telegraph: string;
  effect?: {
    id: CombatStatusEffectId;
    turns: number;
    potency: number;
  };
  mpDrain?: number;
  bossHeal?: number;
  guardBreak?: number;
};

export type BossCombatProfile = {
  regionId: number;
  identity: string;
  phaseTwoLine: string;
  enragedLine: string;
  attacks: Record<string, BossAttackProfile>;
};

const attack = (
  name: string,
  powerMultiplier: number,
  telegraph: string,
  extras: Omit<BossAttackProfile, "name" | "powerMultiplier" | "telegraph"> = {}
): BossAttackProfile => ({ name, powerMultiplier, telegraph, ...extras });

export const BOSS_COMBAT_PROFILES: Record<number, BossCombatProfile> = {
  1: {
    regionId: 1,
    identity: "MENTAL DISRUPTION",
    phaseTwoLine: "The forest fragments. Disorder accelerates.",
    enragedLine: "CHAOS OVERFLOW · EXPECT HEAVY DEBUFFS",
    attacks: {
      Confusion: attack("Confusion", 0.78, "MIND FOG · REDUCES YOUR NEXT ATTACKS", {
        effect: { id: "confused", turns: 2, potency: 3 }
      }),
      Procrastination: attack("Procrastination", 0.92, "TIME DRAG · WEAKENS FOLLOW-UP DAMAGE", {
        effect: { id: "weakened", turns: 2, potency: 4 },
        mpDrain: 4
      }),
      Distraction: attack("Distraction", 1.12, "OPENING STRIKE · LOWERS YOUR DEFENSE", {
        effect: { id: "vulnerable", turns: 2, potency: 3 }
      })
    }
  },
  2: {
    regionId: 2,
    identity: "PRESSURE & SELF-DOUBT",
    phaseTwoLine: "Cracks spread through the old identity.",
    enragedLine: "THE OLD SELF HARDENS · GUARD WILL BE TESTED",
    attacks: {
      "Self-Criticism": attack("Self-Criticism", 1.08, "CRUSHING VERDICT · BREAKS PART OF YOUR GUARD", {
        effect: { id: "vulnerable", turns: 1, potency: 2 },
        guardBreak: 3
      }),
      Doubt: attack("Doubt", 0.85, "SECOND-GUESS · CLOUDS YOUR NEXT DECISION", {
        effect: { id: "confused", turns: 2, potency: 3 }
      }),
      "Fear of Change": attack("Fear of Change", 1.0, "ANCHORING BLOW · SAPS POWER AND MP", {
        effect: { id: "weakened", turns: 2, potency: 3 },
        mpDrain: 6
      })
    }
  },
  3: {
    regionId: 3,
    identity: "HABIT LOOP",
    phaseTwoLine: "A severed habit grows back as another head.",
    enragedLine: "ROUTINE CASCADE · THE HYDRA STARTS FEEDING",
    attacks: {
      Temptation: attack("Temptation", 0.82, "LURE · DISRUPTS FOCUS", {
        effect: { id: "confused", turns: 2, potency: 2 }
      }),
      "Negative Routine": attack("Negative Routine", 0.95, "LOOP · WEAKENS REPEATED EFFORT", {
        effect: { id: "weakened", turns: 2, potency: 4 },
        bossHeal: 5
      }),
      "Toxic Influence": attack("Toxic Influence", 1.15, "CORROSION · EXPOSES YOUR DEFENSE", {
        effect: { id: "vulnerable", turns: 2, potency: 3 }
      })
    }
  },
  4: {
    regionId: 4,
    identity: "BURNOUT CYCLE",
    phaseTwoLine: "The phoenix sheds ash and returns hotter.",
    enragedLine: "SOLAR FLARE · CONSERVE HP AND MP",
    attacks: {
      Discouragement: attack("Discouragement", 0.88, "ASH VEIL · LOWERS YOUR POWER", {
        effect: { id: "weakened", turns: 2, potency: 3 }
      }),
      "Lack of Purpose": attack("Lack of Purpose", 0.8, "EMPTY HORIZON · DRAINS MP", {
        effect: { id: "confused", turns: 1, potency: 2 },
        mpDrain: 8
      }),
      Burnout: attack("Burnout", 1.28, "HEAT SPIKE · HEAVY DAMAGE, LOW UTILITY", {})
    }
  },
  5: {
    regionId: 5,
    identity: "ATTRITION",
    phaseTwoLine: "The tide rises. Every excuse pulls harder.",
    enragedLine: "ABYSSAL PRESSURE · SUSTAIN BECOMES CRITICAL",
    attacks: {
      Laziness: attack("Laziness", 0.9, "HEAVY TIDE · SAPS STRENGTH", {
        effect: { id: "weakened", turns: 2, potency: 4 }
      }),
      Excuses: attack("Excuses", 0.78, "FOG BANK · DRAINS MP AND CLARITY", {
        effect: { id: "confused", turns: 2, potency: 2 },
        mpDrain: 7
      }),
      "Self-Deception": attack("Self-Deception", 1.12, "INK MIRROR · EXPOSES YOU WHILE THE KRAKEN RECOVERS", {
        effect: { id: "vulnerable", turns: 2, potency: 2 },
        bossHeal: 8
      })
    }
  },
  6: {
    regionId: 6,
    identity: "CREATIVE PRESSURE",
    phaseTwoLine: "Lightning sketches possibilities across the sky.",
    enragedLine: "STORM LOCK · PERFECTIONISM HITS HARDER",
    attacks: {
      "Creative Block": attack("Creative Block", 0.82, "STATIC WALL · CONFUSES AND DRAINS MP", {
        effect: { id: "confused", turns: 2, potency: 3 },
        mpDrain: 5
      }),
      Perfectionism: attack("Perfectionism", 1.08, "CRYSTAL PRISON · BREAKS GUARD", {
        effect: { id: "vulnerable", turns: 2, potency: 3 },
        guardBreak: 4
      }),
      "Fear of Failure": attack("Fear of Failure", 1.18, "FREEFALL · HEAVY HIT THAT WEAKENS", {
        effect: { id: "weakened", turns: 1, potency: 3 }
      })
    }
  },
  7: {
    regionId: 7,
    identity: "PANIC BURST",
    phaseTwoLine: "The red gate opens wider. The rhythm quickens.",
    enragedLine: "PANIC PEAK · EXPECT BURST DAMAGE",
    attacks: {
      Anxiety: attack("Anxiety", 0.86, "RACING THOUGHTS · CONFUSION", {
        effect: { id: "confused", turns: 2, potency: 3 }
      }),
      Panic: attack("Panic", 1.32, "PANIC RUSH · VERY HEAVY DAMAGE", {
        mpDrain: 4
      }),
      Paralysis: attack("Paralysis", 0.94, "FREEZE RESPONSE · WEAKENS AND EXPOSES", {
        effect: { id: "vulnerable", turns: 2, potency: 3 },
        guardBreak: 2
      })
    }
  },
  8: {
    regionId: 8,
    identity: "BALANCE CHECK",
    phaseTwoLine: "Harmony fractures into competing extremes.",
    enragedLine: "PERFECT IMBALANCE · EVERY RESOURCE MATTERS",
    attacks: {
      Imbalance: attack("Imbalance", 1.0, "TILT · EXPOSES YOUR DEFENSE", {
        effect: { id: "vulnerable", turns: 2, potency: 2 }
      }),
      Obsession: attack("Obsession", 0.9, "OVERFOCUS · DRAINS MP AND CONFUSES", {
        effect: { id: "confused", turns: 2, potency: 2 },
        mpDrain: 9
      }),
      Burnout: attack("Burnout", 1.22, "CELESTIAL OVERLOAD · HEAVY DAMAGE, BOSS RECOVERY", {
        effect: { id: "weakened", turns: 1, potency: 2 },
        bossHeal: 10
      })
    }
  }
};

export const bossCombatProfileForRegion = (regionId: number) => BOSS_COMBAT_PROFILES[regionId] ?? BOSS_COMBAT_PROFILES[1];

export const bossAttackProfileFor = (regionId: number, attackName: string): BossAttackProfile => {
  const profile = bossCombatProfileForRegion(regionId);
  return profile.attacks[attackName] ?? attack(attackName, 1, "DIRECT STRIKE");
};
