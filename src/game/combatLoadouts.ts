import type { CombatAction } from "./combatEngine";

export type LegacyAttackType = "weak" | "medium" | "strong";

export type ClassCombatMove = {
  attackType: LegacyAttackType;
  icon: string;
  action: CombatAction;
};

const move = (
  attackType: LegacyAttackType,
  icon: string,
  name: string,
  mpCost: number,
  power: number
): ClassCombatMove => ({
  attackType,
  icon,
  action: {
    id: `${attackType}-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    name,
    mpCost,
    power
  }
});

/**
 * Combat V1 loadouts.
 *
 * The UI can use these names immediately while the current persisted combat
 * state still routes through the legacy weak/medium/strong store actions.
 * The embedded CombatAction values are intentionally ready for the reusable
 * combat engine, so the next integration step does not need to redesign the
 * class-facing move list again.
 */
const CLASS_LOADOUTS: Record<number, ClassCombatMove[]> = {
  1: [
    move("weak", "✨", "Arcane Bolt", 0, 10),
    move("medium", "🧠", "Focus Lance", 6, 20),
    move("strong", "🔥", "Mental Fireball", 12, 32)
  ],
  2: [
    move("weak", "⚔️", "Sword Strike", 0, 11),
    move("medium", "💪", "Willpower Strike", 4, 21),
    move("strong", "🛡️", "Discipline Breaker", 8, 30)
  ],
  3: [
    move("weak", "✨", "Light Strike", 0, 9),
    move("medium", "❤️", "Vital Pulse", 7, 18),
    move("strong", "☀️", "Radiant Burst", 12, 28)
  ],
  4: [
    move("weak", "🛡️", "Shield Bash", 0, 10),
    move("medium", "🧱", "Persistence Strike", 3, 19),
    move("strong", "💥", "Fortress Breaker", 7, 28)
  ],
  5: [
    move("weak", "🏹", "Quick Shot", 0, 11),
    move("medium", "🎯", "Focus Arrow", 5, 21),
    move("strong", "💫", "Precision Volley", 10, 31)
  ],
  6: [
    move("weak", "🙏", "Sacred Strike", 0, 9),
    move("medium", "✨", "Clarity Ray", 6, 19),
    move("strong", "⚖️", "Balance Judgment", 11, 29)
  ],
  7: [
    move("weak", "🥷", "Swift Strike", 0, 12),
    move("medium", "💨", "Shadow Cut", 5, 22),
    move("strong", "⚡", "Distraction Break", 9, 31)
  ],
  8: [
    move("weak", "⚗️", "Catalyst Toss", 0, 9),
    move("medium", "🧪", "Focus Mixture", 7, 20),
    move("strong", "💥", "Mental Transmutation", 13, 33)
  ]
};

const FALLBACK_LOADOUT: ClassCombatMove[] = [
  move("weak", "⚡", "Quick Attack", 0, 10),
  move("medium", "💥", "Focused Attack", 5, 20),
  move("strong", "🔥", "Power Attack", 10, 30)
];

export const getClassCombatLoadout = (characterId: number): ClassCombatMove[] =>
  CLASS_LOADOUTS[characterId] ?? FALLBACK_LOADOUT;
