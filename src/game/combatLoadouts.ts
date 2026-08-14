import type { CombatAction } from "./combatEngine";

export type LegacyAttackType = "weak" | "medium" | "strong";

export type ClassCombatMove = {
  attackType: LegacyAttackType;
  icon: string;
  action: CombatAction;
};

type ActionExtras = Pick<CombatAction, "defensePower" | "healPower" | "effect">;

const move = (
  attackType: LegacyAttackType,
  icon: string,
  name: string,
  mpCost: number,
  power: number,
  extras: ActionExtras = {}
): ClassCombatMove => ({
  attackType,
  icon,
  action: {
    id: `${attackType}-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    name,
    mpCost,
    power,
    ...extras
  }
});

/**
 * Combat V1 class identities.
 *
 * Every class keeps one zero-MP basic action so a player can never become
 * unable to act. Medium and strong skills now express class identity through
 * mechanics already supported by CombatEngine: healing, guard and debuffs.
 * The current legacy combat UI can continue mapping weak/medium/strong safely;
 * these richer fields become active as soon as the reusable engine is wired
 * into the persisted combat session.
 */
const CLASS_LOADOUTS: Record<number, ClassCombatMove[]> = {
  1: [
    move("weak", "✨", "Arcane Bolt", 0, 10),
    move("medium", "🧠", "Focus Lance", 6, 19, {
      effect: { id: "vulnerable", turns: 2, potency: 2 }
    }),
    move("strong", "🔥", "Mental Fireball", 12, 32, {
      effect: { id: "weakened", turns: 1, potency: 2 }
    })
  ],
  2: [
    move("weak", "⚔️", "Sword Strike", 0, 11),
    move("medium", "💪", "Willpower Strike", 4, 19, { defensePower: 2 }),
    move("strong", "🛡️", "Discipline Breaker", 8, 29, {
      defensePower: 3,
      effect: { id: "vulnerable", turns: 1, potency: 2 }
    })
  ],
  3: [
    move("weak", "✨", "Light Strike", 0, 9),
    move("medium", "❤️", "Vital Pulse", 7, 12, { healPower: 16 }),
    move("strong", "☀️", "Radiant Burst", 12, 26, { healPower: 8 })
  ],
  4: [
    move("weak", "🛡️", "Shield Bash", 0, 10, { defensePower: 1 }),
    move("medium", "🧱", "Persistence Strike", 3, 17, { defensePower: 5 }),
    move("strong", "💥", "Fortress Breaker", 7, 27, { defensePower: 7 })
  ],
  5: [
    move("weak", "🏹", "Quick Shot", 0, 11),
    move("medium", "🎯", "Focus Arrow", 5, 20, {
      effect: { id: "vulnerable", turns: 2, potency: 3 }
    }),
    move("strong", "💫", "Precision Volley", 10, 31, {
      effect: { id: "vulnerable", turns: 1, potency: 2 }
    })
  ],
  6: [
    move("weak", "🙏", "Sacred Strike", 0, 9),
    move("medium", "✨", "Clarity Ray", 6, 14, { healPower: 10, defensePower: 2 }),
    move("strong", "⚖️", "Balance Judgment", 11, 27, { healPower: 10, defensePower: 2 })
  ],
  7: [
    move("weak", "🥷", "Swift Strike", 0, 12),
    move("medium", "💨", "Shadow Cut", 5, 21, {
      effect: { id: "weakened", turns: 2, potency: 3 }
    }),
    move("strong", "⚡", "Distraction Break", 9, 30, {
      effect: { id: "weakened", turns: 2, potency: 5 }
    })
  ],
  8: [
    move("weak", "⚗️", "Catalyst Toss", 0, 9),
    move("medium", "🧪", "Focus Mixture", 7, 16, {
      defensePower: 3,
      effect: { id: "vulnerable", turns: 2, potency: 2 }
    }),
    move("strong", "💥", "Mental Transmutation", 13, 31, {
      healPower: 6,
      effect: { id: "weakened", turns: 2, potency: 3 }
    })
  ]
};

const FALLBACK_LOADOUT: ClassCombatMove[] = [
  move("weak", "⚡", "Quick Attack", 0, 10),
  move("medium", "💥", "Focused Attack", 5, 20),
  move("strong", "🔥", "Power Attack", 10, 30)
];

export const getClassCombatLoadout = (characterId: number): ClassCombatMove[] =>
  CLASS_LOADOUTS[characterId] ?? FALLBACK_LOADOUT;
