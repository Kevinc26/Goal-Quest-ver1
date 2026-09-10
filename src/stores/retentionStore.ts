import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  GEAR_FORGE_COST,
  RETENTION_STORAGE_KEY,
  STREAK_MILESTONES,
  WEEKLY_QUEST_GOAL,
  localRetentionDateKey,
  streakFragmentReward,
  weekKeyForDate,
  weeklyBossRegionForKey,
  type BonusGearUnlocks,
  type RetentionCelebration
} from "../game/retention";

export type WeeklyAction = "focus" | "guard" | "burst";
export type WeeklyEncounterOutcome = "active" | "victory" | "defeat";

export type RetentionDurableState = {
  weekKey: string | null;
  weeklyBaselineTasks: number;
  weeklyQuestProgress: number;
  weeklyBossRegionId: number;
  weeklyBossDefeated: boolean;
  dailyChestClaimedDate: string | null;
  dailyChestXpGrantedDate: string | null;
  weeklyXpGrantedKey: string | null;
  gearFragments: number;
  bonusGearUnlocks: BonusGearUnlocks;
  claimedStreakMilestones: number[];
};

type RetentionStore = RetentionDurableState & {
  celebration: RetentionCelebration | null;
  weeklyEncounterOpen: boolean;
  weeklyBossHp: number;
  weeklyBossMaxHp: number;
  weeklyPlayerResolve: number;
  weeklyPlayerMaxResolve: number;
  weeklyTurn: number;
  weeklyBurstUsed: boolean;
  weeklyEncounterOutcome: WeeklyEncounterOutcome;
  weeklyEncounterLog: string[];

  ensureWeek: (totalTasksCompleted: number) => void;
  updateWeeklyProgress: (totalTasksCompleted: number) => void;
  claimDailyChest: (dateKey?: string) => boolean;
  claimEligibleStreakMilestones: (streak: number) => number[];
  openWeeklyEncounter: (maxBossHp: number, playerResolve: number) => boolean;
  weeklyAttack: (action: WeeklyAction, playerLevel: number, difficulty: number, bossName: string) => void;
  closeWeeklyEncounter: () => void;
  retryWeeklyEncounter: (maxBossHp: number, playerResolve: number) => void;
  forgeGear: (characterId: number, itemId: string) => boolean;
  markDailyXpGranted: (dateKey: string) => void;
  markWeeklyXpGranted: (weekKey: string) => void;
  dismissCelebration: () => void;
  hydrateDurableState: (state: Partial<RetentionDurableState>) => void;
};

const uid = () =>
  globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const broadcastRetention = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("goalquest:retention-changed"));
  }
};

const DEFAULT_DURABLE: RetentionDurableState = {
  weekKey: null,
  weeklyBaselineTasks: 0,
  weeklyQuestProgress: 0,
  weeklyBossRegionId: 1,
  weeklyBossDefeated: false,
  dailyChestClaimedDate: null,
  dailyChestXpGrantedDate: null,
  weeklyXpGrantedKey: null,
  gearFragments: 0,
  bonusGearUnlocks: {},
  claimedStreakMilestones: []
};

const createCelebration = (
  kind: RetentionCelebration["kind"],
  title: string,
  subtitle: string,
  reward: string
): RetentionCelebration => ({ id: uid(), kind, title, subtitle, reward });

export const useRetentionStore = create<RetentionStore>()(
  persist(
    (set, get) => ({
      ...DEFAULT_DURABLE,
      celebration: null,
      weeklyEncounterOpen: false,
      weeklyBossHp: 0,
      weeklyBossMaxHp: 0,
      weeklyPlayerResolve: 100,
      weeklyPlayerMaxResolve: 100,
      weeklyTurn: 0,
      weeklyBurstUsed: false,
      weeklyEncounterOutcome: "active",
      weeklyEncounterLog: [],

      ensureWeek: (totalTasksCompleted) => {
        const key = weekKeyForDate();
        const current = get();
        if (current.weekKey === key) {
          get().updateWeeklyProgress(totalTasksCompleted);
          return;
        }

        set({
          weekKey: key,
          weeklyBaselineTasks: totalTasksCompleted,
          weeklyQuestProgress: 0,
          weeklyBossRegionId: weeklyBossRegionForKey(key),
          weeklyBossDefeated: false,
          weeklyXpGrantedKey: null,
          weeklyEncounterOpen: false,
          weeklyEncounterOutcome: "active",
          weeklyEncounterLog: []
        });
        broadcastRetention();
      },

      updateWeeklyProgress: (totalTasksCompleted) => {
        const current = get();
        const key = weekKeyForDate();
        if (current.weekKey !== key) {
          current.ensureWeek(totalTasksCompleted);
          return;
        }

        const progress = Math.max(0, totalTasksCompleted - current.weeklyBaselineTasks);
        if (progress !== current.weeklyQuestProgress) {
          set({ weeklyQuestProgress: progress });
          broadcastRetention();
        }
      },

      claimDailyChest: (dateKey = localRetentionDateKey()) => {
        const current = get();
        if (current.dailyChestClaimedDate === dateKey) return false;

        set({
          dailyChestClaimedDate: dateKey,
          gearFragments: current.gearFragments + 1,
          celebration: createCelebration(
            "daily",
            "DAILY CHEST OPENED",
            "You completed today's quest goal.",
            "+1 Gear Fragment · +25 XP"
          )
        });
        broadcastRetention();
        return true;
      },

      claimEligibleStreakMilestones: (streak) => {
        if (streak <= 0) return [];
        const current = get();
        const claimed = new Set(current.claimedStreakMilestones);
        const unlocked = STREAK_MILESTONES.filter((milestone) => milestone <= streak && !claimed.has(milestone));
        if (!unlocked.length) return [];

        const fragments = unlocked.reduce((sum, milestone) => sum + streakFragmentReward(milestone), 0);
        unlocked.forEach((milestone) => claimed.add(milestone));
        const highest = unlocked[unlocked.length - 1];

        set({
          claimedStreakMilestones: [...claimed].sort((a, b) => a - b),
          gearFragments: current.gearFragments + fragments,
          celebration: createCelebration(
            "streak",
            `${highest}-DAY STREAK`,
            "The flame is growing stronger because you kept showing up.",
            `+${fragments} Gear Fragment${fragments === 1 ? "" : "s"}`
          )
        });
        broadcastRetention();
        return unlocked;
      },

      openWeeklyEncounter: (maxBossHp, playerResolve) => {
        const current = get();
        if (current.weeklyQuestProgress < WEEKLY_QUEST_GOAL || current.weeklyBossDefeated) return false;

        const safeBossHp = Math.max(80, Math.floor(maxBossHp));
        const safeResolve = Math.max(80, Math.floor(playerResolve));
        set({
          weeklyEncounterOpen: true,
          weeklyBossHp: safeBossHp,
          weeklyBossMaxHp: safeBossHp,
          weeklyPlayerResolve: safeResolve,
          weeklyPlayerMaxResolve: safeResolve,
          weeklyTurn: 0,
          weeklyBurstUsed: false,
          weeklyEncounterOutcome: "active",
          weeklyEncounterLog: ["The weekly gate opens. The guardian enters the arena."]
        });
        return true;
      },

      weeklyAttack: (action, playerLevel, difficulty, bossName) => {
        const current = get();
        if (!current.weeklyEncounterOpen || current.weeklyEncounterOutcome !== "active") return;
        if (action === "burst" && current.weeklyBurstUsed) return;

        const level = Math.max(1, playerLevel);
        const baseCounter = 10 + difficulty * 3;
        const damage = action === "burst"
          ? 34 + level * 3
          : action === "guard"
            ? 12 + level
            : 20 + level * 2;
        const received = action === "guard" ? Math.ceil(baseCounter * 0.45) : baseCounter;
        const nextBossHp = Math.max(0, current.weeklyBossHp - damage);
        const victory = nextBossHp <= 0;
        const nextResolve = victory ? current.weeklyPlayerResolve : Math.max(0, current.weeklyPlayerResolve - received);
        const defeat = !victory && nextResolve <= 0;
        const actionLabel = action === "burst" ? "EMBER BURST" : action === "guard" ? "GUARD STRIKE" : "FOCUS STRIKE";
        const log = [
          ...current.weeklyEncounterLog,
          `${actionLabel} deals ${damage} damage.`,
          ...(victory ? [`${bossName} falls. The expedition is complete.`] : [`${bossName} answers for ${received} resolve damage.`])
        ].slice(-6);

        set({
          weeklyBossHp: nextBossHp,
          weeklyPlayerResolve: nextResolve,
          weeklyTurn: current.weeklyTurn + 1,
          weeklyBurstUsed: current.weeklyBurstUsed || action === "burst",
          weeklyEncounterOutcome: victory ? "victory" : defeat ? "defeat" : "active",
          weeklyBossDefeated: victory ? true : current.weeklyBossDefeated,
          gearFragments: victory ? current.gearFragments + 3 : current.gearFragments,
          weeklyEncounterLog: log,
          celebration: victory
            ? createCelebration(
                "weekly",
                "WEEKLY GUARDIAN DEFEATED",
                "Your real-life quests opened the gate, and your hero finished the fight.",
                "+3 Gear Fragments · +150 XP"
              )
            : current.celebration
        });

        if (victory) broadcastRetention();
      },

      closeWeeklyEncounter: () => set({ weeklyEncounterOpen: false }),

      retryWeeklyEncounter: (maxBossHp, playerResolve) => {
        const safeBossHp = Math.max(80, Math.floor(maxBossHp));
        const safeResolve = Math.max(80, Math.floor(playerResolve));
        set({
          weeklyBossHp: safeBossHp,
          weeklyBossMaxHp: safeBossHp,
          weeklyPlayerResolve: safeResolve,
          weeklyPlayerMaxResolve: safeResolve,
          weeklyTurn: 0,
          weeklyBurstUsed: false,
          weeklyEncounterOutcome: "active",
          weeklyEncounterLog: ["Aeril restores the arena. Try again when you are ready."]
        });
      },

      forgeGear: (characterId, itemId) => {
        const current = get();
        if (current.gearFragments < GEAR_FORGE_COST) return false;
        const existing = current.bonusGearUnlocks[characterId] ?? [];
        if (existing.includes(itemId)) return false;

        set({
          gearFragments: current.gearFragments - GEAR_FORGE_COST,
          bonusGearUnlocks: {
            ...current.bonusGearUnlocks,
            [characterId]: [...existing, itemId]
          },
          celebration: createCelebration(
            "gear",
            "GEAR FORGED",
            "Consistency has become something your hero can wear.",
            "New cosmetic gear unlocked"
          )
        });
        broadcastRetention();
        return true;
      },

      markDailyXpGranted: (dateKey) => {
        if (get().dailyChestXpGrantedDate !== dateKey) {
          set({ dailyChestXpGrantedDate: dateKey });
          broadcastRetention();
        }
      },

      markWeeklyXpGranted: (weekKey) => {
        if (get().weeklyXpGrantedKey !== weekKey) {
          set({ weeklyXpGrantedKey: weekKey });
          broadcastRetention();
        }
      },

      dismissCelebration: () => set({ celebration: null }),

      hydrateDurableState: (state) => {
        set((current) => ({
          ...current,
          ...state,
          bonusGearUnlocks: state.bonusGearUnlocks ?? current.bonusGearUnlocks,
          claimedStreakMilestones: state.claimedStreakMilestones ?? current.claimedStreakMilestones,
          celebration: null,
          weeklyEncounterOpen: false,
          weeklyEncounterOutcome: "active",
          weeklyEncounterLog: []
        }));
        broadcastRetention();
      }
    }),
    {
      name: RETENTION_STORAGE_KEY,
      version: 1,
      partialize: (state) => ({
        weekKey: state.weekKey,
        weeklyBaselineTasks: state.weeklyBaselineTasks,
        weeklyQuestProgress: state.weeklyQuestProgress,
        weeklyBossRegionId: state.weeklyBossRegionId,
        weeklyBossDefeated: state.weeklyBossDefeated,
        dailyChestClaimedDate: state.dailyChestClaimedDate,
        dailyChestXpGrantedDate: state.dailyChestXpGrantedDate,
        weeklyXpGrantedKey: state.weeklyXpGrantedKey,
        gearFragments: state.gearFragments,
        bonusGearUnlocks: state.bonusGearUnlocks,
        claimedStreakMilestones: state.claimedStreakMilestones
      })
    }
  )
);

export const getRetentionDurableState = (): RetentionDurableState => {
  const state = useRetentionStore.getState();
  return {
    weekKey: state.weekKey,
    weeklyBaselineTasks: state.weeklyBaselineTasks,
    weeklyQuestProgress: state.weeklyQuestProgress,
    weeklyBossRegionId: state.weeklyBossRegionId,
    weeklyBossDefeated: state.weeklyBossDefeated,
    dailyChestClaimedDate: state.dailyChestClaimedDate,
    dailyChestXpGrantedDate: state.dailyChestXpGrantedDate,
    weeklyXpGrantedKey: state.weeklyXpGrantedKey,
    gearFragments: state.gearFragments,
    bonusGearUnlocks: state.bonusGearUnlocks,
    claimedStreakMilestones: state.claimedStreakMilestones
  };
};
