import type { Stats } from "./types";
import type { CombatPreparation } from "./combatEngine";

export type CombatPreparationSource = {
  id: "streak" | "daily-goal" | "region-progress" | "lifetime-quests";
  label: string;
  detail: string;
};

export type CombatPreparationResult = {
  preparation: CombatPreparation;
  sources: CombatPreparationSource[];
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/**
 * Converts real Goal Quest progress into deterministic battle preparation.
 *
 * The bonuses are deliberately capped: life progress should matter in battle,
 * but it should not remove the need to make good combat choices. This helper is
 * pure and persistence-agnostic so old saves remain compatible while Combat V1
 * is introduced incrementally.
 */
export const deriveCombatPreparation = ({
  stats,
  regionMissionsCompleted
}: {
  stats: Stats;
  regionMissionsCompleted: number;
}): CombatPreparationResult => {
  const sources: CombatPreparationSource[] = [];

  const streakDays = Math.max(0, Math.floor(stats.dailyStreak));
  const streakAttackBonus = clamp(streakDays * 0.01, 0, 0.15);
  if (streakAttackBonus > 0) {
    sources.push({
      id: "streak",
      label: `${streakDays}-day streak`,
      detail: `+${Math.round(streakAttackBonus * 100)}% attack`
    });
  }

  const dailyGoal = Math.max(1, Math.floor(stats.dailyTasksGoal));
  const dailyCompleted = clamp(Math.floor(stats.dailyTasksCompleted), 0, dailyGoal);
  const dailyRatio = dailyCompleted / dailyGoal;
  const maxMpBonus = dailyRatio >= 1 ? 12 : dailyRatio >= 0.6 ? 6 : 0;
  if (maxMpBonus > 0) {
    sources.push({
      id: "daily-goal",
      label: dailyRatio >= 1 ? "Daily goal complete" : "Daily goal in progress",
      detail: `+${maxMpBonus} max MP`
    });
  }

  const regionProgress = clamp(Math.floor(regionMissionsCompleted), 0, 7);
  const defenseBonus = regionProgress >= 7 ? 4 : regionProgress >= 4 ? 2 : regionProgress >= 1 ? 1 : 0;
  if (defenseBonus > 0) {
    sources.push({
      id: "region-progress",
      label: `${regionProgress}/7 region quests`,
      detail: `+${defenseBonus} defense`
    });
  }

  const lifetimeQuests = Math.max(0, Math.floor(stats.totalTasksCompleted));
  const maxHpBonus = clamp(Math.floor(lifetimeQuests / 25) * 2, 0, 20);
  if (maxHpBonus > 0) {
    sources.push({
      id: "lifetime-quests",
      label: `${lifetimeQuests} lifetime quests`,
      detail: `+${maxHpBonus} max HP`
    });
  }

  return {
    preparation: {
      attackMultiplier: 1 + streakAttackBonus,
      defenseBonus,
      maxHpBonus,
      maxMpBonus
    },
    sources
  };
};
