
import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  ASSETS,
  CHARACTERS,
  CLASS_PATHS,
  CLASS_TO_PATH,
  DAILY_CATEGORIES,
  REGIONS,
  characterById,
  regionById
} from "../game/data";
import type { Character, CombatState, CurrentTask, DailyMission, ScreenName, Stats, Toast } from "../game/types";

type AttackType = "weak" | "medium" | "strong";

type GoalQuestStore = {
  isBootstrapped: boolean;
  screen: ScreenName;
  currentRegion: number | null;
  character: Character | null;
  stats: Stats;
  unlockedRegions: number[];
  completedMissions: Record<number, boolean[]>;
  defeatedBosses: number[];
  availableDailyMissions: DailyMission[];
  completedDailyMissionIds: string[];
  dailyMissionDate: string | null;
  currentTask: CurrentTask | null;
  taskTimerPaused: boolean;
  currentCombat: CombatState | null;
  todayCompleted: boolean;
  lastPlayedDate: string | null;
  lastLoginDate: string | null;
  corruptionLevel: number;
  toasts: Toast[];

  initGame: () => void;
  setScreen: (screen: ScreenName) => void;
  enterRegion: (regionId: number) => void;
  selectCharacter: (characterId: number) => void;
  startAdventure: () => void;
  generateDailyMissions: (force?: boolean) => void;
  startDailyTask: (index: number) => void;
  startRegionTask: (regionId: number, missionIndex: number) => void;
  closeTask: () => void;
  setTaskInput: (value: string) => void;
  toggleTaskTimer: () => void;
  resetTaskTimer: () => void;
  tickTaskTimer: () => void;
  completeTask: () => void;
  rest: () => void;
  changeDailyGoal: (goal: number) => void;
  resetGame: () => void;
  startCombat: (regionId: number) => void;
  performAttack: (attackType: AttackType) => void;
  fleeCombat: () => void;
  dismissToast: (id: string) => void;
  getNextAvailableMission: (regionId: number) => number;
  isRegionUnlocked: (regionId: number) => boolean;
  isRegionCompleted: (regionId: number) => boolean;
  isBossDefeated: (regionId: number) => boolean;
  getAvailableDailyMissions: () => DailyMission[];
  getPathName: () => string;
  getPathDescription: () => string;
  getMotivationalMessage: () => string;
};

const DEFAULT_STATS: Stats = {
  hp: 100,
  mp: 100,
  exp: 0,
  level: 1,
  maxHp: 100,
  maxMp: 100,
  nextLevelExp: 100,
  dailyExp: 0,
  dailyStreak: 0,
  dailyTasksCompleted: 0,
  dailyTasksGoal: 5,
  lastRegionMissionDate: null,
  lastCompletedRegionDay: null,
  totalTasksCompleted: 0,
  daysCompleted: 0
};

const todayKey = () => new Date().toDateString();
const uid = () =>
  globalThis.crypto?.randomUUID?.() ?? Date.now().toString() + "-" + Math.random().toString(36).slice(2, 8);

const getDateDiff = (a: string, b: string) => {
  const first = new Date(a);
  const second = new Date(b);
  return Math.floor((first.getTime() - second.getTime()) / (1000 * 60 * 60 * 24));
};

const getCorruptionLevel = (lastLoginDate: string | null, dailyTasksCompleted: number) => {
  const today = todayKey();

  if (!lastLoginDate) {
    return { level: 0, today };
  }

  const diff = getDateDiff(today, lastLoginDate);

  if (diff >= 3) {
    return { level: 3, today };
  }

  if (diff === 2) {
    return { level: 2, today };
  }

  if (diff === 1 || (diff === 0 && dailyTasksCompleted === 0)) {
    return { level: 1, today };
  }

  return { level: 0, today };
};

const pickRandomDailyMissions = () => {
  const all: DailyMission[] = DAILY_CATEGORIES.flatMap((category) =>
    category.missions.map((mission) => ({
      ...mission,
      id: category.name + "-" + uid(),
      category: category.name,
      categoryColor: category.color
    }))
  );

  const shuffled = [...all].sort(() => Math.random() - 0.5);
  const selected: DailyMission[] = [];
  const used = new Set<string>();

  for (const mission of shuffled) {
    if (selected.length >= 5) {
      break;
    }

    if (!used.has(mission.text)) {
      selected.push(mission);
      used.add(mission.text);
    }
  }

  return selected;
};
export const useGoalQuestStore = create<GoalQuestStore>()(
  persist(
    (set, get) => {
      const addToast = (message: string, icon = "💡", color = "var(--primary)") => {
        const toast: Toast = {
          id: uid(),
          message,
          icon,
          color
        };

        set((state) => ({ toasts: [...state.toasts, toast] }));

        setTimeout(() => {
          get().dismissToast(toast.id);
        }, 3000);
      };

      const checkLevelUp = () => {
        const state = get();

        if (state.stats.exp < state.stats.nextLevelExp) {
          return;
        }

        set((current) => ({
          stats: {
            ...current.stats,
            level: current.stats.level + 1,
            maxHp: current.stats.maxHp + 10,
            maxMp: current.stats.maxMp + 10,
            hp: current.stats.maxHp + 10,
            mp: current.stats.maxMp + 10,
            nextLevelExp: Math.floor(current.stats.nextLevelExp * 1.5)
          }
        }));

        addToast("Nivel " + get().stats.level + " alcanzado", "⭐", "var(--warning)");
      };

      const completeDailyMission = (missionId: string) => {
        const state = get();

        if (state.completedDailyMissionIds.includes(missionId)) {
          return;
        }

        set((current) => {
          const stats = {
            ...current.stats,
            dailyTasksCompleted: current.stats.dailyTasksCompleted + 1,
            totalTasksCompleted: current.stats.totalTasksCompleted + 1,
            exp: current.stats.exp + 25,
            dailyExp: current.stats.dailyExp + 25
          };

          const completedDailyMissionIds = [...current.completedDailyMissionIds, missionId];
          const isTodayCompleted = stats.dailyTasksCompleted >= stats.dailyTasksGoal;

          if (isTodayCompleted && !current.todayCompleted) {
            stats.exp += 50;
            stats.dailyExp += 50;
            stats.daysCompleted += 1;
          }

          return {
            completedDailyMissionIds,
            stats,
            todayCompleted: isTodayCompleted,
            corruptionLevel: stats.dailyTasksCompleted > 0 ? 0 : current.corruptionLevel
          };
        });

        checkLevelUp();

        if (get().todayCompleted) {
          addToast("Dia completado", "🏆", "var(--warning)");
        } else {
          const remaining = Math.max(0, get().stats.dailyTasksGoal - get().stats.dailyTasksCompleted);
          addToast("Mision completada. Restan " + remaining, "✅", "var(--primary)");
        }
      };

      const completeRegionMission = (regionId: number, missionIndex: number) => {
        const state = get();
        const today = todayKey();

        if (state.stats.lastRegionMissionDate === today) {
          addToast("Ya completaste una mision de region hoy", "🌙", "var(--warning)");
          return;
        }

        const nextMissionIndex = state.getNextAvailableMission(regionId);
        if (nextMissionIndex !== missionIndex) {
          addToast("Hoy: Dia " + (nextMissionIndex + 1), "📅", "var(--warning)");
          return;
        }

        set((current) => {
          const existing = current.completedMissions[regionId] ? [...current.completedMissions[regionId]] : [];
          existing[missionIndex] = true;

          const completedMissions = {
            ...current.completedMissions,
            [regionId]: existing
          };

          const stats = {
            ...current.stats,
            exp: current.stats.exp + 25,
            dailyExp: current.stats.dailyExp + 25,
            totalTasksCompleted: current.stats.totalTasksCompleted + 1,
            lastRegionMissionDate: today,
            lastCompletedRegionDay: missionIndex
          };

          const regionCompleted = existing.length === 7 && existing.every((value) => value === true);
          const unlockedRegions = [...current.unlockedRegions];

          if (regionCompleted) {
            const nextRegion = regionId + 1;
            if (nextRegion <= REGIONS.length && !unlockedRegions.includes(nextRegion)) {
              unlockedRegions.push(nextRegion);
            }
          }

          return {
            completedMissions,
            stats,
            unlockedRegions,
            corruptionLevel: 0
          };
        });

        checkLevelUp();
        addToast("Dia " + (missionIndex + 1) + " completado", "✅", "var(--primary)");
      };

      return {
        isBootstrapped: false,
        screen: "start",
        currentRegion: null,
        character: null,
        stats: DEFAULT_STATS,
        unlockedRegions: [1],
        completedMissions: {},
        defeatedBosses: [],
        availableDailyMissions: [],
        completedDailyMissionIds: [],
        dailyMissionDate: null,
        currentTask: null,
        taskTimerPaused: false,
        currentCombat: null,
        todayCompleted: false,
        lastPlayedDate: null,
        lastLoginDate: null,
        corruptionLevel: 0,
        toasts: [],

        initGame: () => {
          const today = todayKey();
          const state = get();

          if (state.lastPlayedDate !== today) {
            set((current) => {
              const resetStats = {
                ...current.stats,
                dailyTasksCompleted: 0,
                dailyExp: 0,
                lastRegionMissionDate: null,
                lastCompletedRegionDay: null
              };

              if (current.lastPlayedDate) {
                const diff = getDateDiff(today, current.lastPlayedDate);
                if (diff === 1) {
                  resetStats.dailyStreak += 1;
                } else if (diff > 1) {
                  resetStats.dailyStreak = 0;
                }
              }

              return {
                stats: resetStats,
                todayCompleted: false,
                completedDailyMissionIds: [],
                dailyMissionDate: null,
                lastPlayedDate: today
              };
            });
          }

          get().generateDailyMissions();

          const corruption = getCorruptionLevel(get().lastLoginDate, get().stats.dailyTasksCompleted);
          set({
            lastLoginDate: corruption.today,
            corruptionLevel: corruption.level,
            isBootstrapped: true
          });

          if (corruption.level > 0) {
            addToast("Interferencia detectada. Completa una mision para estabilizar.", "⚠️", "#b388ff");
          }
        },

        setScreen: (screen) => set({ screen }),

        enterRegion: (regionId) => {
          if (!get().isRegionUnlocked(regionId)) {
            addToast("Region bloqueada", "🔒", "var(--warning)");
            return;
          }

          set({ currentRegion: regionId, screen: "region" });
        },

        selectCharacter: (characterId) => {
          const character = characterById(characterId);
          if (!character) {
            return;
          }

          set({ character });
          addToast("Elegiste " + character.name, "🎮", character.color);
        },

        startAdventure: () => {
          if (!get().character) {
            addToast("Selecciona un personaje", "❌", "var(--danger)");
            return;
          }

          set({ screen: "world" });
          addToast("Tu aventura comienza", "🚀", "var(--warning)");
        },

        generateDailyMissions: (force = false) => {
          const today = todayKey();
          if (!force && get().dailyMissionDate === today && get().availableDailyMissions.length > 0) {
            return;
          }

          set({
            availableDailyMissions: pickRandomDailyMissions(),
            completedDailyMissionIds: [],
            dailyMissionDate: today
          });
        },

        startDailyTask: (index) => {
          const state = get();

          if (state.todayCompleted) {
            addToast("Ya completaste tu dia", "🏆", "var(--warning)");
            return;
          }

          const available = state.getAvailableDailyMissions();
          const mission = available[index];

          if (!mission) {
            addToast("Mision no disponible", "❌", "var(--danger)");
            return;
          }

          const initialSeconds = (mission.time ?? 5) * 60;
          set({
            currentTask: {
              id: uid(),
              type: "daily",
              missionId: mission.id,
              missionText: mission.text,
              missionType: mission.type,
              userInput: "",
              initialSeconds,
              secondsLeft: initialSeconds
            },
            taskTimerPaused: false
          });
        },

        startRegionTask: (regionId, missionIndex) => {
          const state = get();

          if (state.stats.lastRegionMissionDate === todayKey()) {
            addToast("Hoy ya hiciste una mision de region", "🌙", "var(--warning)");
            return;
          }

          const region = regionById(regionId);
          if (!region) {
            return;
          }

          const nextMissionIndex = state.getNextAvailableMission(regionId);
          if (nextMissionIndex !== missionIndex) {
            addToast("Hoy: Dia " + (nextMissionIndex + 1), "📅", "var(--warning)");
            return;
          }

          const missionText = region.missions[missionIndex] ?? "Mision " + (missionIndex + 1);
          const missionType = region.missionTypes[missionIndex] ?? "text";

          const timerMatch = missionText.match(/(\d+)\s*minutos?/i);
          const initialSeconds = missionType === "timer" ? (timerMatch ? Number(timerMatch[1]) : 5) * 60 : 0;

          set({
            currentTask: {
              id: uid(),
              type: "region",
              regionId,
              missionIndex,
              missionText,
              missionType,
              userInput: "",
              initialSeconds,
              secondsLeft: initialSeconds
            },
            taskTimerPaused: false
          });
        },

        closeTask: () => {
          set({ currentTask: null, taskTimerPaused: false });
        },

        setTaskInput: (value) => {
          set((state) => {
            if (!state.currentTask) {
              return state;
            }

            return {
              currentTask: {
                ...state.currentTask,
                userInput: value
              }
            };
          });
        },

        toggleTaskTimer: () => {
          set((state) => ({ taskTimerPaused: !state.taskTimerPaused }));
        },

        resetTaskTimer: () => {
          set((state) => {
            if (!state.currentTask || state.currentTask.missionType !== "timer") {
              return state;
            }

            return {
              currentTask: {
                ...state.currentTask,
                secondsLeft: state.currentTask.initialSeconds
              },
              taskTimerPaused: false
            };
          });
        },

        tickTaskTimer: () => {
          set((state) => {
            if (!state.currentTask || state.currentTask.missionType !== "timer") {
              return state;
            }

            if (state.taskTimerPaused || state.currentTask.secondsLeft <= 0) {
              return state;
            }

            return {
              currentTask: {
                ...state.currentTask,
                secondsLeft: state.currentTask.secondsLeft - 1
              }
            };
          });
        },

        completeTask: () => {
          const task = get().currentTask;
          if (!task) {
            return;
          }

          if (task.missionType === "timer" && task.secondsLeft > 0) {
            addToast("Completa el tiempo primero", "⏰", "var(--warning)");
            return;
          }

          if (task.missionType === "text" && task.userInput.trim().length < 5) {
            addToast("Escribe al menos 5 caracteres", "📝", "var(--warning)");
            return;
          }

          if (task.type === "daily" && task.missionId) {
            completeDailyMission(task.missionId);
          }

          if (task.type === "region" && typeof task.regionId === "number" && typeof task.missionIndex === "number") {
            completeRegionMission(task.regionId, task.missionIndex);
          }

          set({ currentTask: null, taskTimerPaused: false });
        },
        rest: () => {
          set((state) => ({
            stats: {
              ...state.stats,
              hp: Math.min(state.stats.maxHp, state.stats.hp + 30),
              mp: Math.min(state.stats.maxMp, state.stats.mp + 10)
            }
          }));

          addToast("Descanso completado (+30 HP, +10 MP)", "💤", "var(--warning)");
        },

        changeDailyGoal: (goal) => {
          const nextGoal = Math.min(10, Math.max(3, Math.floor(goal)));
          set((state) => ({
            stats: {
              ...state.stats,
              dailyTasksGoal: nextGoal
            }
          }));
        },

        resetGame: () => {
          set({
            screen: "start",
            currentRegion: null,
            character: null,
            stats: DEFAULT_STATS,
            unlockedRegions: [1],
            completedMissions: {},
            defeatedBosses: [],
            availableDailyMissions: [],
            completedDailyMissionIds: [],
            dailyMissionDate: null,
            currentTask: null,
            taskTimerPaused: false,
            currentCombat: null,
            todayCompleted: false,
            lastPlayedDate: null,
            lastLoginDate: null,
            corruptionLevel: 0,
            toasts: []
          });

          get().initGame();
          addToast("Juego reiniciado", "🔄", "var(--danger)");
        },

        startCombat: (regionId) => {
          const state = get();
          if (!state.isRegionCompleted(regionId)) {
            addToast("Completa las 7 misiones primero", "❌", "var(--danger)");
            return;
          }

          if (state.isBossDefeated(regionId)) {
            addToast("Jefe ya derrotado", "🏆", "var(--warning)");
            return;
          }

          const region = regionById(regionId);
          if (!region) {
            return;
          }

          set((current) => ({
            currentCombat: {
              regionId,
              enemyCurrentHp: region.boss.hp,
              playerHp: current.stats.hp,
              turn: 0,
              log: ["Comienza combate contra " + region.boss.name]
            },
            screen: "combat"
          }));
        },

        performAttack: (attackType) => {
          const state = get();
          if (!state.currentCombat) {
            return;
          }

          const region = regionById(state.currentCombat.regionId);
          if (!region) {
            return;
          }

          const attackBoost = state.stats.dailyExp;
          const playerDamage =
            attackType === "weak"
              ? 10 + Math.floor(attackBoost / 10)
              : attackType === "medium"
                ? 20 + Math.floor(attackBoost / 5)
                : 30 + Math.floor(attackBoost / 3);

          const enemyCurrentHp = Math.max(0, state.currentCombat.enemyCurrentHp - playerDamage);
          const log = [...state.currentCombat.log, "Atacas por " + playerDamage];

          if (enemyCurrentHp <= 0) {
            const reward = 100 * region.boss.difficulty;
            set((current) => ({
              defeatedBosses: [...new Set([...current.defeatedBosses, region.id])],
              stats: {
                ...current.stats,
                exp: current.stats.exp + reward,
                dailyExp: current.stats.dailyExp + reward
              },
              currentCombat: null,
              screen: "world"
            }));

            checkLevelUp();
            addToast("Victoria. +" + reward + " EXP", "👑", "var(--gold)");
            return;
          }

          const enemyDamage = 10 + region.boss.difficulty * 5;
          const nextPlayerHp = Math.max(0, state.currentCombat.playerHp - enemyDamage);
          log.push(region.boss.name + " golpea por " + enemyDamage);

          set((current) => ({
            currentCombat:
              nextPlayerHp <= 0
                ? null
                : {
                    ...current.currentCombat!,
                    enemyCurrentHp,
                    playerHp: nextPlayerHp,
                    turn: current.currentCombat!.turn + 1,
                    log
                  },
            stats: {
              ...current.stats,
              hp: nextPlayerHp
            },
            screen: nextPlayerHp <= 0 ? "world" : "combat"
          }));

          if (nextPlayerHp <= 0) {
            addToast("Has sido derrotado", "💀", "var(--danger)");
          }
        },

        fleeCombat: () => {
          set((state) => ({
            stats: {
              ...state.stats,
              exp: Math.max(0, Math.floor(state.stats.exp * 0.9))
            },
            currentCombat: null,
            screen: "world"
          }));

          addToast("Huiste del combate (-10% EXP)", "🏃", "var(--warning)");
        },

        dismissToast: (id) => {
          set((state) => ({
            toasts: state.toasts.filter((toast) => toast.id !== id)
          }));
        },

        getNextAvailableMission: (regionId) => {
          const missions = get().completedMissions[regionId] ?? [];

          for (let i = 0; i < 7; i += 1) {
            if (!missions[i]) {
              if (i === 0 || missions[i - 1]) {
                return i;
              }

              return -1;
            }
          }

          return -1;
        },

        isRegionUnlocked: (regionId) => get().unlockedRegions.includes(regionId),

        isRegionCompleted: (regionId) => {
          const missions = get().completedMissions[regionId] ?? [];
          return missions.length === 7 && missions.every((value) => value);
        },

        isBossDefeated: (regionId) => get().defeatedBosses.includes(regionId),

        getAvailableDailyMissions: () =>
          get().availableDailyMissions.filter(
            (mission) => !get().completedDailyMissionIds.includes(mission.id)
          ),

        getPathName: () => {
          const character = get().character;
          if (!character) {
            return "CAMINO DEL AVENTURERO";
          }

          const pathKey = CLASS_TO_PATH[character.id];
          return CLASS_PATHS[pathKey]?.name ?? "CAMINO DEL AVENTURERO";
        },

        getPathDescription: () => {
          const character = get().character;
          if (!character) {
            return "Transforma tu vida a traves de la aventura";
          }

          const pathKey = CLASS_TO_PATH[character.id];
          return CLASS_PATHS[pathKey]?.description ?? "Transforma tu vida a traves de la aventura";
        },

        getMotivationalMessage: () => {
          const character = get().character;
          if (!character) {
            return "Sigue adelante, aventurero";
          }

          const pathKey = CLASS_TO_PATH[character.id];
          const messages = CLASS_PATHS[pathKey]?.motivationalMessages ?? ["Sigue adelante, aventurero"];
          return messages[Math.floor(Math.random() * messages.length)];
        }
      };
    },
    {
      name: "goalquest-store-v1",
      partialize: (state) => ({
        isBootstrapped: state.isBootstrapped,
        screen: state.screen,
        currentRegion: state.currentRegion,
        character: state.character,
        stats: state.stats,
        unlockedRegions: state.unlockedRegions,
        completedMissions: state.completedMissions,
        defeatedBosses: state.defeatedBosses,
        availableDailyMissions: state.availableDailyMissions,
        completedDailyMissionIds: state.completedDailyMissionIds,
        dailyMissionDate: state.dailyMissionDate,
        currentTask: state.currentTask,
        taskTimerPaused: state.taskTimerPaused,
        currentCombat: state.currentCombat,
        todayCompleted: state.todayCompleted,
        lastPlayedDate: state.lastPlayedDate,
        lastLoginDate: state.lastLoginDate,
        corruptionLevel: state.corruptionLevel
      })
    }
  )
);

export const goalQuestAssets = ASSETS;
export const goalQuestRegions = REGIONS;
export const goalQuestCharacters = CHARACTERS;
