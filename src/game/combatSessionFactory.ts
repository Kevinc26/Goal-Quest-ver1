import type { Character, RegionBoss, Stats } from "./types";
import {
  createBossDefinition,
  createCombatSession,
  createDragonOfDisorderDefinition,
  type CombatBossDefinition,
  type CombatPreparation,
  type CombatSession
} from "./combatEngine";
import {
  deriveCombatPreparation,
  type CombatPreparationSource
} from "./combatPreparation";

export type PreparedCombatSession = {
  session: CombatSession;
  boss: CombatBossDefinition;
  preparation: CombatPreparation;
  preparationSources: CombatPreparationSource[];
};

const countCompletedRegionMissions = (missions: boolean[] | undefined) =>
  Math.min(7, (missions ?? []).filter(Boolean).length);

/**
 * Creates a Combat V1 session from the same persisted data Goal Quest already
 * stores today. This keeps battle preparation derived rather than persisted,
 * so old saves remain compatible and progress bonuses cannot become stale.
 */
export const createPreparedCombatSession = ({
  regionId,
  character,
  stats,
  boss,
  completedRegionMissions
}: {
  regionId: number;
  character: Character;
  stats: Stats;
  boss: RegionBoss;
  completedRegionMissions?: boolean[];
}): PreparedCombatSession => {
  const { preparation, sources } = deriveCombatPreparation({
    stats,
    regionMissionsCompleted: countCompletedRegionMissions(completedRegionMissions)
  });

  const bossDefinition =
    regionId === 1
      ? createDragonOfDisorderDefinition(boss)
      : createBossDefinition(boss);

  const session = createCombatSession({
    regionId,
    character,
    stats,
    boss: bossDefinition,
    preparation
  });

  return {
    session,
    boss: bossDefinition,
    preparation,
    preparationSources: sources
  };
};
