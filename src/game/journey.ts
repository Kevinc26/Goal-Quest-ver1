import type { Character, JourneyRecord, JourneyState, Stats } from "./types";

export const FIRST_JOURNEY_NAME = "THE FIRST JOURNEY";

export const createInitialJourneyState = (): JourneyState => ({
  journeyNumber: 1,
  ascensionLevel: 0,
  startedAt: new Date().toISOString(),
  history: []
});

const isJourneyRecord = (value: unknown): value is JourneyRecord => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const record = value as Partial<JourneyRecord>;
  return (
    typeof record.journeyNumber === "number" &&
    Number.isFinite(record.journeyNumber) &&
    typeof record.ascensionLevel === "number" &&
    Number.isFinite(record.ascensionLevel) &&
    typeof record.completedAt === "string" &&
    (record.characterId === null || typeof record.characterId === "number") &&
    typeof record.characterLevel === "number" &&
    typeof record.totalTasksCompleted === "number" &&
    typeof record.dailyStreak === "number" &&
    typeof record.bossesDefeated === "number"
  );
};

/**
 * Converts persisted/unknown journey data into a safe JourneyState.
 * Existing Goal Quest saves do not contain journey data yet, so callers can
 * pass undefined and receive Journey 1 without disturbing any other progress.
 */
export const normalizeJourneyState = (value: unknown): JourneyState => {
  if (!value || typeof value !== "object") {
    return createInitialJourneyState();
  }

  const persisted = value as Partial<JourneyState>;
  const journeyNumber =
    typeof persisted.journeyNumber === "number" && Number.isFinite(persisted.journeyNumber)
      ? Math.max(1, Math.floor(persisted.journeyNumber))
      : 1;
  const ascensionLevel =
    typeof persisted.ascensionLevel === "number" && Number.isFinite(persisted.ascensionLevel)
      ? Math.max(0, Math.floor(persisted.ascensionLevel))
      : Math.max(0, journeyNumber - 1);
  const startedAt =
    typeof persisted.startedAt === "string" && persisted.startedAt.trim().length > 0
      ? persisted.startedAt
      : new Date().toISOString();
  const history = Array.isArray(persisted.history) ? persisted.history.filter(isJourneyRecord) : [];

  return {
    journeyNumber,
    ascensionLevel,
    startedAt,
    history
  };
};

export const isJourneyComplete = (defeatedBosses: number[], totalRegions: number) => {
  if (totalRegions <= 0) {
    return false;
  }

  const validBossIds = new Set(
    defeatedBosses.filter((regionId) => Number.isInteger(regionId) && regionId >= 1 && regionId <= totalRegions)
  );
  return validBossIds.size >= totalRegions;
};

export const createJourneyRecord = ({
  journey,
  character,
  stats,
  defeatedBosses
}: {
  journey: JourneyState;
  character: Character | null;
  stats: Stats;
  defeatedBosses: number[];
}): JourneyRecord => ({
  journeyNumber: journey.journeyNumber,
  ascensionLevel: journey.ascensionLevel,
  completedAt: new Date().toISOString(),
  characterId: character?.id ?? null,
  characterLevel: stats.level,
  totalTasksCompleted: stats.totalTasksCompleted,
  dailyStreak: stats.dailyStreak,
  bossesDefeated: new Set(defeatedBosses).size
});

export const createNextJourneyState = (current: JourneyState, completedJourney: JourneyRecord): JourneyState => ({
  journeyNumber: current.journeyNumber + 1,
  ascensionLevel: current.ascensionLevel + 1,
  startedAt: new Date().toISOString(),
  history: [...current.history, completedJourney]
});

export type AscensionProgressReset = {
  unlockedRegions: number[];
  completedMissions: Record<number, boolean[]>;
  defeatedBosses: number[];
  currentRegion: null;
  stats: Stats;
};

/**
 * Creates the progression reset used when an adventurer ascends into a new Journey.
 * Lifetime progression is preserved: level, EXP, streak, total task counts and daily
 * goal history remain intact. Only campaign-specific region/boss progress is reset,
 * and HP/MP are restored so the next Journey starts in a playable state.
 */
export const createAscensionProgressReset = (stats: Stats): AscensionProgressReset => ({
  unlockedRegions: [1],
  completedMissions: {},
  defeatedBosses: [],
  currentRegion: null,
  stats: {
    ...stats,
    hp: stats.maxHp,
    mp: stats.maxMp,
    lastRegionMissionDate: null,
    lastCompletedRegionDay: null
  }
});

export const getJourneyLabel = (journey: JourneyState) =>
  `Journey ${journey.journeyNumber} · Ascension ${journey.ascensionLevel}`;
