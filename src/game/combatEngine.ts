import type { Character, RegionBoss, Stats } from "./types";

export type CombatOutcome = "active" | "victory" | "defeat";
export type CombatEffectId = "guard" | "vulnerable" | "weakened" | "confused";

export type CombatEffect = {
  id: CombatEffectId;
  turns: number;
  potency: number;
};

export type CombatActor = {
  currentHp: number;
  maxHp: number;
  currentMp: number;
  maxMp: number;
  defense: number;
  effects: CombatEffect[];
};

export type CombatSession = {
  regionId: number;
  turn: number;
  outcome: CombatOutcome;
  player: CombatActor;
  boss: CombatActor;
  log: string[];
};

export type CombatAction = {
  id: string;
  name: string;
  mpCost: number;
  power: number;
  defensePower?: number;
  healPower?: number;
  effect?: Omit<CombatEffect, "turns"> & { turns: number };
};

export type CombatBossAttack = {
  name: string;
  powerMultiplier: number;
  effect?: CombatEffect;
};

export type CombatBossDefinition = {
  name: string;
  maxHp: number;
  defense: number;
  attacks: CombatBossAttack[];
  baseDamage: number;
};

export type CombatPreparation = {
  attackMultiplier: number;
  defenseBonus: number;
  maxHpBonus: number;
  maxMpBonus: number;
};

export const EMPTY_PREPARATION: CombatPreparation = {
  attackMultiplier: 1,
  defenseBonus: 0,
  maxHpBonus: 0,
  maxMpBonus: 0
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const getEffect = (effects: CombatEffect[], id: CombatEffectId) => effects.find((effect) => effect.id === id);

const upsertEffect = (effects: CombatEffect[], incoming: CombatEffect) => {
  const existing = effects.find((effect) => effect.id === incoming.id);
  if (!existing) {
    return [...effects, incoming];
  }

  return effects.map((effect) =>
    effect.id === incoming.id
      ? {
          ...effect,
          turns: Math.max(effect.turns, incoming.turns),
          potency: Math.max(effect.potency, incoming.potency)
        }
      : effect
  );
};

const tickEffects = (effects: CombatEffect[]) =>
  effects
    .map((effect) => ({ ...effect, turns: effect.turns - 1 }))
    .filter((effect) => effect.turns > 0);

const effectiveDefense = (actor: CombatActor) => {
  const guard = getEffect(actor.effects, "guard")?.potency ?? 0;
  const vulnerable = getEffect(actor.effects, "vulnerable")?.potency ?? 0;
  return Math.max(0, actor.defense + guard - vulnerable);
};

const effectivePower = (basePower: number, actor: CombatActor) => {
  const weakened = getEffect(actor.effects, "weakened")?.potency ?? 0;
  const confused = getEffect(actor.effects, "confused")?.potency ?? 0;
  return Math.max(1, basePower - weakened - confused);
};

const legacyBossAttack = (name: string): CombatBossAttack => ({
  name,
  powerMultiplier: 1
});

export const createBossDefinition = (boss: RegionBoss): CombatBossDefinition => ({
  name: boss.name,
  maxHp: Math.max(1, boss.hp),
  defense: Math.max(0, Math.floor(boss.difficulty * 1.5)),
  attacks: boss.attacks.length > 0 ? boss.attacks.map(legacyBossAttack) : [legacyBossAttack("Strike")],
  baseDamage: 8 + boss.difficulty * 4
});

/**
 * First authored boss for Combat V1.
 *
 * The Dragon of Disorder is intentionally stronger than the legacy Region 1
 * boss and teaches the status-effect loop without requiring bespoke combat
 * code in the UI. Each move pressures a different part of the player's turn:
 * Confusion reduces outgoing power, Procrastination weakens follow-up attacks,
 * and Distraction lowers defense for the next incoming hit.
 */
export const createDragonOfDisorderDefinition = (boss: RegionBoss): CombatBossDefinition => ({
  name: boss.name,
  maxHp: Math.max(180, boss.hp),
  defense: 2,
  baseDamage: 12,
  attacks: [
    {
      name: "Confusion",
      powerMultiplier: 0.75,
      effect: { id: "confused", turns: 2, potency: 3 }
    },
    {
      name: "Procrastination",
      powerMultiplier: 0.9,
      effect: { id: "weakened", turns: 2, potency: 4 }
    },
    {
      name: "Distraction",
      powerMultiplier: 1.1,
      effect: { id: "vulnerable", turns: 2, potency: 3 }
    }
  ]
});

export const createCombatSession = ({
  regionId,
  character,
  stats,
  boss,
  preparation = EMPTY_PREPARATION
}: {
  regionId: number;
  character: Character;
  stats: Stats;
  boss: CombatBossDefinition;
  preparation?: CombatPreparation;
}): CombatSession => {
  const playerMaxHp = Math.max(1, stats.maxHp + preparation.maxHpBonus);
  const playerMaxMp = Math.max(0, stats.maxMp + preparation.maxMpBonus);

  return {
    regionId,
    turn: 1,
    outcome: "active",
    player: {
      currentHp: clamp(stats.hp, 1, playerMaxHp),
      maxHp: playerMaxHp,
      currentMp: clamp(stats.mp, 0, playerMaxMp),
      maxMp: playerMaxMp,
      defense: Math.max(0, Math.floor(character.hp / 20) + preparation.defenseBonus),
      effects: []
    },
    boss: {
      currentHp: boss.maxHp,
      maxHp: boss.maxHp,
      currentMp: 0,
      maxMp: 0,
      defense: boss.defense,
      effects: []
    },
    log: [`Battle begins against ${boss.name}.`]
  };
};

export const resolvePlayerAction = ({
  session,
  action,
  attackMultiplier = 1
}: {
  session: CombatSession;
  action: CombatAction;
  attackMultiplier?: number;
}): CombatSession => {
  if (session.outcome !== "active") {
    return session;
  }

  if (action.mpCost > session.player.currentMp) {
    return {
      ...session,
      log: [...session.log, `Not enough MP for ${action.name}.`]
    };
  }

  const player = {
    ...session.player,
    currentMp: session.player.currentMp - action.mpCost
  };
  let boss = { ...session.boss };
  const log = [...session.log];

  if (action.power > 0) {
    const rawPower = Math.floor(effectivePower(action.power, player) * Math.max(0.1, attackMultiplier));
    const damage = Math.max(1, rawPower - effectiveDefense(boss));
    boss.currentHp = Math.max(0, boss.currentHp - damage);
    log.push(`${action.name} deals ${damage} damage.`);
  }

  if (action.healPower && action.healPower > 0) {
    const healed = Math.min(action.healPower, player.maxHp - player.currentHp);
    player.currentHp += healed;
    log.push(`${action.name} restores ${healed} HP.`);
  }

  if (action.defensePower && action.defensePower > 0) {
    player.effects = upsertEffect(player.effects, {
      id: "guard",
      turns: 1,
      potency: action.defensePower
    });
    log.push(`${action.name} raises your guard.`);
  }

  if (action.effect && boss.currentHp > 0) {
    boss.effects = upsertEffect(boss.effects, {
      id: action.effect.id,
      turns: action.effect.turns,
      potency: action.effect.potency
    });
    log.push(`${action.effect.id.toUpperCase()} affects the boss.`);
  }

  if (boss.currentHp <= 0) {
    return {
      ...session,
      player,
      boss,
      outcome: "victory",
      log: [...log, "Victory!"]
    };
  }

  return {
    ...session,
    player,
    boss,
    log
  };
};

export const resolveBossTurn = ({
  session,
  boss,
  random = Math.random
}: {
  session: CombatSession;
  boss: CombatBossDefinition;
  random?: () => number;
}): CombatSession => {
  if (session.outcome !== "active") {
    return session;
  }

  const roll = clamp(random(), 0, 0.999999);
  const attack = boss.attacks[Math.floor(roll * boss.attacks.length)] ?? legacyBossAttack("Strike");
  const bossPower = Math.max(1, Math.floor(effectivePower(boss.baseDamage, session.boss) * attack.powerMultiplier));
  const damage = Math.max(1, bossPower - effectiveDefense(session.player));
  const nextHp = Math.max(0, session.player.currentHp - damage);
  const outcome: CombatOutcome = nextHp <= 0 ? "defeat" : "active";
  const log = [...session.log, `${boss.name} uses ${attack.name} for ${damage} damage.`];
  let playerEffects = session.player.effects;

  if (attack.effect && outcome === "active") {
    playerEffects = upsertEffect(playerEffects, attack.effect);
    log.push(`${attack.effect.id.toUpperCase()} affects you for ${attack.effect.turns} turns.`);
  }

  if (outcome === "defeat") {
    log.push("You were defeated.");
  }

  return {
    ...session,
    turn: session.turn + 1,
    outcome,
    player: {
      ...session.player,
      currentHp: nextHp,
      effects: tickEffects(playerEffects)
    },
    boss: {
      ...session.boss,
      effects: tickEffects(session.boss.effects)
    },
    log
  };
};

export const resolveCombatRound = ({
  session,
  action,
  boss,
  attackMultiplier = 1,
  random = Math.random
}: {
  session: CombatSession;
  action: CombatAction;
  boss: CombatBossDefinition;
  attackMultiplier?: number;
  random?: () => number;
}) => {
  const afterPlayer = resolvePlayerAction({ session, action, attackMultiplier });
  if (
    afterPlayer.outcome !== "active" ||
    (afterPlayer.player.currentMp === session.player.currentMp && action.mpCost > session.player.currentMp)
  ) {
    return afterPlayer;
  }

  return resolveBossTurn({ session: afterPlayer, boss, random });
};
