import type { Character, CombatState, RegionBoss, Stats } from "./types";
import type { CombatActor, CombatSession } from "./combatEngine";
import { createPreparedCombatSession } from "./combatSessionFactory";

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const isCombatActor = (value: unknown): value is CombatActor => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const actor = value as Partial<CombatActor>;
  return (
    isFiniteNumber(actor.currentHp) &&
    isFiniteNumber(actor.maxHp) &&
    isFiniteNumber(actor.currentMp) &&
    isFiniteNumber(actor.maxMp) &&
    isFiniteNumber(actor.defense) &&
    Array.isArray(actor.effects)
  );
};

/**
 * Narrow persisted unknown data before trusting it as a Combat V1 session.
 * Old Goal Quest saves do not contain this shape, so callers can safely fall
 * back to the legacy CombatState migration path below.
 */
export const isCombatSession = (value: unknown): value is CombatSession => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const session = value as Partial<CombatSession>;
  return (
    isFiniteNumber(session.regionId) &&
    isFiniteNumber(session.turn) &&
    (session.outcome === "active" || session.outcome === "victory" || session.outcome === "defeat") &&
    isCombatActor(session.player) &&
    isCombatActor(session.boss) &&
    Array.isArray(session.log) &&
    session.log.every((entry) => typeof entry === "string")
  );
};

export type NormalizeCombatSessionInput = {
  persistedSession?: unknown;
  legacyCombat: CombatState | null;
  regionId: number;
  character: Character | null;
  stats: Stats;
  boss: RegionBoss | null;
  completedRegionMissions?: boolean[];
};

/**
 * Restores Combat V1 without invalidating legacy persisted battles.
 *
 * - New saves: keep the already-persisted CombatSession.
 * - Old saves: rebuild the authored boss/preparation from current player data,
 *   then carry over the legacy HP, turn and combat log.
 * - Invalid/incomplete data: return null instead of fabricating a battle.
 *
 * This adapter lets the store migrate incrementally while the existing
 * CombatState remains available to the current UI during the transition.
 */
export const normalizeCombatSession = ({
  persistedSession,
  legacyCombat,
  regionId,
  character,
  stats,
  boss,
  completedRegionMissions
}: NormalizeCombatSessionInput): CombatSession | null => {
  if (isCombatSession(persistedSession)) {
    return persistedSession;
  }

  if (!legacyCombat || !character || !boss || legacyCombat.regionId !== regionId) {
    return null;
  }

  const prepared = createPreparedCombatSession({
    regionId,
    character,
    stats,
    boss,
    completedRegionMissions
  }).session;

  return {
    ...prepared,
    turn: Math.max(1, Math.floor(legacyCombat.turn) + 1),
    player: {
      ...prepared.player,
      currentHp: clamp(legacyCombat.playerHp, 0, prepared.player.maxHp)
    },
    boss: {
      ...prepared.boss,
      currentHp: clamp(legacyCombat.enemyCurrentHp, 0, prepared.boss.maxHp)
    },
    log:
      Array.isArray(legacyCombat.log) && legacyCombat.log.length > 0
        ? legacyCombat.log.filter((entry): entry is string => typeof entry === "string")
        : prepared.log
  };
};

/**
 * Compatibility projection for the existing CombatScreen/store contract.
 * Keeping this conversion in one place avoids duplicating legacy-field sync
 * while Combat V1 is introduced behind the current UI.
 */
export const combatSessionToLegacyState = (session: CombatSession): CombatState => ({
  regionId: session.regionId,
  enemyCurrentHp: session.boss.currentHp,
  playerHp: session.player.currentHp,
  turn: Math.max(0, session.turn - 1),
  log: [...session.log]
});
