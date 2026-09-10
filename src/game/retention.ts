export const RETENTION_STORAGE_KEY = "goalquest-retention-v1";
export const WEEKLY_QUEST_GOAL = 15;
export const DAILY_CHEST_EXP = 25;
export const WEEKLY_BOSS_EXP = 150;
export const GEAR_FORGE_COST = 5;
export const STREAK_MILESTONES = [3, 7, 14, 30, 50, 100] as const;

export type RetentionCelebration = {
  id: string;
  kind: "daily" | "streak" | "weekly" | "gear";
  title: string;
  subtitle: string;
  reward: string;
};

export type BonusGearUnlocks = Record<number, string[]>;

const pad = (value: number) => String(value).padStart(2, "0");

export const localRetentionDateKey = (date = new Date()) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

export const weekKeyForDate = (date = new Date()) => {
  const local = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0, 0);
  const mondayOffset = (local.getDay() + 6) % 7;
  local.setDate(local.getDate() - mondayOffset);
  return localRetentionDateKey(local);
};

export const weeklyBossRegionForKey = (weekKey: string) => {
  const numeric = Number(weekKey.replace(/-/g, ""));
  return (numeric % 8) + 1;
};

export const nextStreakMilestone = (streak: number) =>
  STREAK_MILESTONES.find((milestone) => milestone > streak) ?? null;

export const streakFragmentReward = (milestone: number) => {
  if (milestone >= 30) return 3;
  if (milestone >= 7) return 2;
  return 1;
};

type PersistedRetentionShape = {
  state?: {
    bonusGearUnlocks?: BonusGearUnlocks;
  };
};

export const readBonusGearUnlocks = (characterId: number) => {
  if (typeof window === "undefined") return [] as string[];

  const raw = window.localStorage.getItem(RETENTION_STORAGE_KEY);
  if (!raw) return [] as string[];

  try {
    const parsed = JSON.parse(raw) as PersistedRetentionShape;
    const unlocks = parsed.state?.bonusGearUnlocks?.[characterId];
    return Array.isArray(unlocks) ? unlocks.filter((value): value is string => typeof value === "string") : [];
  } catch {
    return [] as string[];
  }
};
