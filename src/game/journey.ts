import type { Character, JourneyRecord, JourneyState, Stats } from "./types";

export const FIRST_JOURNEY_NAME = "THE FIRST JOURNEY";

export const createInitialJourneyState = (): JourneyState => ({
  journeyNumber: 1,
  ascensionLevel: 0,
  startedAt: new Date().toISOString(),
  history: []
});

export const isJourneyComplete = (defeatedBosses: number[], totalRegions: number) => {
  if (totalRegions <= 0) {
    return false;
  }

  return new Set(defeatedBosses).size >= totalRegions;
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

export const getJourneyLabel = (journey: JourneyState) =>
  `Journey ${journey.journeyNumber} · Ascension ${journey.ascensionLevel}`;
