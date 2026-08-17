import React, { useEffect, useState } from "react";

import { bossAttackProfileFor, bossCombatProfileForRegion } from "../../../game/bossCombatProfiles";
import { bossSceneForRegion, classBattleFx } from "../../../game/bossPresentation";
import { getClassCombatLoadout, type ClassCombatMove } from "../../../game/combatLoadouts";
import { regionById } from "../../../game/data";
import type { CombatStatusEffect, CombatStatusEffectId } from "../../../game/types";
import { goalQuestAssets, useGoalQuestStore } from "../../../stores/goalQuestStore";
import BossArenaDecor from "../combat/BossArenaDecor";
import BossSprite from "../combat/BossSprite";
import { percent, publicAssetPath } from "../utils";

type CombatFxState = {
  playerFx: string;
  bossFx: string;
  actionLabel: string;
  bossActionLabel: string;
};

type DamageFxState = {
  bossDamage: number | null;
  playerDamage: number | null;
  bossHit: boolean;
  playerHit: boolean;
  heal: number | null;
  bossHeal: number | null;
  mpDrain: number | null;
};

const EMPTY_FX: CombatFxState = { playerFx: "", bossFx: "", actionLabel: "", bossActionLabel: "" };
const EMPTY_DAMAGE_FX: DamageFxState = {
  bossDamage: null,
  playerDamage: null,
  bossHit: false,
  playerHit: false,
  heal: null,
  bossHeal: null,
  mpDrain: null
};

const EFFECT_LABELS: Record<CombatStatusEffectId, string> = {
  guard: "GUARD",
  vulnerable: "EXPOSED",
  weakened: "WEAKENED",
  confused: "CONFUSED"
};

const actionDescription = (move: ClassCombatMove) => {
  const parts = [`POWER ${move.action.power}`];
  parts.push(move.action.mpCost ? `${move.action.mpCost} MP` : "FREE");
  if (move.action.healPower) parts.push(`HEAL ${move.action.healPower}`);
  if (move.action.defensePower) parts.push(`GUARD ${move.action.defensePower}`);
  if (move.action.effect) parts.push(EFFECT_LABELS[move.action.effect.id]);
  return parts.join(" · ");
};

const bossPhaseLabel = (bossPercent: number) => {
  if (bossPercent > 66) return "PHASE I";
  if (bossPercent > 33) return "PHASE II";
  return "ENRAGED";
};

const getEffect = (effects: CombatStatusEffect[], id: CombatStatusEffectId) => effects.find((effect) => effect.id === id);

const upsertEffect = (effects: CombatStatusEffect[], incoming: CombatStatusEffect) => {
  const existing = effects.find((effect) => effect.id === incoming.id);
  if (!existing) return [...effects, incoming];
  return effects.map((effect) =>
    effect.id === incoming.id
      ? { ...effect, turns: Math.max(effect.turns, incoming.turns), potency: Math.max(effect.potency, incoming.potency) }
      : effect
  );
};

const tickEffects = (effects: CombatStatusEffect[]) =>
  effects.map((effect) => ({ ...effect, turns: effect.turns - 1 })).filter((effect) => effect.turns > 0);

const reduceGuard = (effects: CombatStatusEffect[], amount: number) =>
  effects
    .map((effect) => effect.id === "guard" ? { ...effect, potency: Math.max(0, effect.potency - amount) } : effect)
    .filter((effect) => effect.id !== "guard" || effect.potency > 0);

const effectChips = (effects: CombatStatusEffect[], owner: "player" | "boss") => {
  if (!effects.length) return null;
  return (
    <div className={`combat-status-row combat-status-row--${owner}`} aria-label={`${owner} status effects`}>
      {effects.map((effect) => (
        <span key={`${effect.id}-${effect.turns}-${effect.potency}`} className={`combat-status-chip combat-status-chip--${effect.id}`}>
          {EFFECT_LABELS[effect.id]} <b>{effect.turns}</b>
        </span>
      ))}
    </div>
  );
};

export default function CombatScreen() {
  const combat = useGoalQuestStore((state) => state.currentCombat);
  const stats = useGoalQuestStore((state) => state.stats);
  const character = useGoalQuestStore((state) => state.character);
  const fleeCombat = useGoalQuestStore((state) => state.fleeCombat);

  const [fx, setFx] = useState<CombatFxState>(EMPTY_FX);
  const [damageFx, setDamageFx] = useState<DamageFxState>(EMPTY_DAMAGE_FX);
  const [isAnimating, setIsAnimating] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);
  const [resourceWarning, setResourceWarning] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroVisible(false), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  if (!combat) {
    return <div className="game-screen active combat-rpg-fallback"><h2>No active battle</h2></div>;
  }

  const region = regionById(combat.regionId);
  if (!region || !character) return null;

  const loadout = getClassCombatLoadout(character.id);
  const scene = bossSceneForRegion(region.id);
  const combatProfile = bossCombatProfileForRegion(region.id);
  const classFx = classBattleFx[character.id] ?? classBattleFx[1];
  const playerSprite = publicAssetPath(goalQuestAssets.classes[character.id]);
  const arenaBackground = publicAssetPath(goalQuestAssets.acts[region.id]);
  const bossMaxHp = region.boss.hp;
  const bossPercent = percent(combat.enemyCurrentHp, bossMaxHp);
  const playerPercent = percent(combat.playerHp, stats.maxHp);
  const playerMp = combat.playerMp ?? stats.mp;
  const playerMpPercent = percent(playerMp, stats.maxMp);
  const playerEffects = combat.playerEffects ?? [];
  const bossEffects = combat.bossEffects ?? [];
  const combatOutcome = combat.outcome ?? (combat.enemyCurrentHp <= 0 ? "victory" : combat.playerHp <= 0 ? "defeat" : "active");
  const victory = combatOutcome === "victory";
  const defeat = combatOutcome === "defeat";
  const recentLog = combat.log.slice(-5);
  const phaseLabel = bossPhaseLabel(bossPercent);
  const bossEnraged = bossPercent <= 33 && bossPercent > 0;
  const nextBossAttackIndex = combat.turn % Math.max(1, region.boss.attacks.length);
  const nextBossAttack = region.boss.attacks[nextBossAttackIndex] ?? "Strike";
  const nextAttackProfile = bossAttackProfileFor(region.id, nextBossAttack);
  const reward = combat.reward ?? 100 * region.boss.difficulty;

  const finishResult = () => useGoalQuestStore.setState({ currentCombat: null, screen: "world" });

  const awardVictory = ({ damage, actionName, nextHp, nextMp, nextPlayerEffects, nextBossEffects }: {
    damage: number;
    actionName: string;
    nextHp: number;
    nextMp: number;
    nextPlayerEffects: CombatStatusEffect[];
    nextBossEffects: CombatStatusEffect[];
  }) => {
    const rewardExp = 100 * region.boss.difficulty;
    useGoalQuestStore.setState((state) => {
      const nextExp = state.stats.exp + rewardExp;
      const nextDailyExp = state.stats.dailyExp + rewardExp;
      const shouldLevel = nextExp >= state.stats.nextLevelExp;
      const nextMaxHp = shouldLevel ? state.stats.maxHp + 10 : state.stats.maxHp;
      const nextMaxMp = shouldLevel ? state.stats.maxMp + 10 : state.stats.maxMp;
      return {
        defeatedBosses: [...new Set([...state.defeatedBosses, region.id])],
        stats: {
          ...state.stats,
          exp: nextExp,
          dailyExp: nextDailyExp,
          level: shouldLevel ? state.stats.level + 1 : state.stats.level,
          maxHp: nextMaxHp,
          maxMp: nextMaxMp,
          hp: shouldLevel ? nextMaxHp : nextHp,
          mp: shouldLevel ? nextMaxMp : nextMp,
          nextLevelExp: shouldLevel ? Math.floor(state.stats.nextLevelExp * 1.5) : state.stats.nextLevelExp
        },
        currentCombat: state.currentCombat ? {
          ...state.currentCombat,
          enemyCurrentHp: 0,
          playerHp: nextHp,
          playerMp: nextMp,
          playerEffects: nextPlayerEffects,
          bossEffects: nextBossEffects,
          outcome: "victory",
          reward: rewardExp,
          log: [...state.currentCombat.log, `${actionName} deals ${damage} damage.`, "Victory!"]
        } : state.currentCombat
      };
    });
  };

  const triggerAttack = (move: ClassCombatMove) => {
    if (isAnimating || victory || defeat) return;
    if (move.action.mpCost > playerMp) {
      setResourceWarning(`NOT ENOUGH MP · ${move.action.name.toUpperCase()} NEEDS ${move.action.mpCost}`);
      window.setTimeout(() => setResourceWarning(""), 1500);
      return;
    }

    const bossAttackIndex = combat.turn % Math.max(1, region.boss.attacks.length);
    const bossAttack = region.boss.attacks[bossAttackIndex] ?? "Strike";
    const attackProfile = bossAttackProfileFor(region.id, bossAttack);
    const playerFx = classFx[move.attackType];
    const bossFx = scene.attackFx[bossAttack] ?? "fx-boss-strike";

    const confused = getEffect(playerEffects, "confused")?.potency ?? 0;
    const weakened = getEffect(playerEffects, "weakened")?.potency ?? 0;
    const bossVulnerable = getEffect(bossEffects, "vulnerable")?.potency ?? 0;
    const bossWeakened = getEffect(bossEffects, "weakened")?.potency ?? 0;
    const playerGuard = getEffect(playerEffects, "guard")?.potency ?? 0;
    const playerVulnerable = getEffect(playerEffects, "vulnerable")?.potency ?? 0;

    const focusBonus = Math.min(10, Math.floor(stats.dailyExp / 25));
    const playerPower = Math.max(1, move.action.power + focusBonus - confused - weakened);
    const bossDefense = Math.max(0, Math.floor(region.boss.difficulty * 1.5) - bossVulnerable);
    const rawPlayerDamage = Math.max(1, playerPower - bossDefense);
    const dealtDamage = Math.min(combat.enemyCurrentHp, rawPlayerDamage);

    let nextPlayerEffects = [...playerEffects];
    let nextBossEffects = [...bossEffects];
    let nextHp = combat.playerHp;
    let nextMp = Math.max(0, playerMp - move.action.mpCost);
    let healed = 0;

    if (move.action.healPower) {
      healed = Math.min(move.action.healPower, stats.maxHp - nextHp);
      nextHp += healed;
    }
    if (move.action.defensePower) {
      nextPlayerEffects = upsertEffect(nextPlayerEffects, { id: "guard", turns: 1, potency: move.action.defensePower });
    }
    if (move.action.effect) {
      nextBossEffects = upsertEffect(nextBossEffects, {
        id: move.action.effect.id,
        turns: move.action.effect.turns,
        potency: move.action.effect.potency
      });
    }

    const bossWillFall = combat.enemyCurrentHp - rawPlayerDamage <= 0;
    const bossBase = 8 + region.boss.difficulty * 4 + (bossEnraged ? 3 : 0);
    const bossPower = Math.max(1, Math.floor(bossBase * attackProfile.powerMultiplier) - bossWeakened);
    const classDefense = Math.floor(character.hp / 20);
    const effectiveGuard = Math.max(0, playerGuard + (move.action.defensePower ?? 0) - (attackProfile.guardBreak ?? 0));
    const rawBossDamage = Math.max(1, bossPower - classDefense - effectiveGuard + playerVulnerable);
    const receivedDamage = Math.min(nextHp, rawBossDamage);
    const finalHp = Math.max(0, nextHp - rawBossDamage);
    const playerWillFall = !bossWillFall && finalHp <= 0;
    const mpDrained = bossWillFall ? 0 : Math.min(nextMp, attackProfile.mpDrain ?? 0);
    nextMp = Math.max(0, nextMp - mpDrained);
    const bossHeal = bossWillFall ? 0 : Math.min(attackProfile.bossHeal ?? 0, Math.max(0, bossMaxHp - (combat.enemyCurrentHp - dealtDamage)));

    if (attackProfile.guardBreak) {
      nextPlayerEffects = reduceGuard(nextPlayerEffects, attackProfile.guardBreak);
    }
    if (attackProfile.effect && !bossWillFall && !playerWillFall) {
      nextPlayerEffects = upsertEffect(nextPlayerEffects, attackProfile.effect);
    }

    setResourceWarning("");
    setIsAnimating(true);
    setDamageFx({ ...EMPTY_DAMAGE_FX, heal: healed > 0 ? healed : null });
    setFx({ playerFx, bossFx: "", actionLabel: move.action.name, bossActionLabel: "" });

    window.setTimeout(() => {
      setDamageFx((current) => ({ ...current, bossDamage: dealtDamage, bossHit: true }));

      if (bossWillFall) {
        awardVictory({ damage: dealtDamage, actionName: move.action.name, nextHp, nextMp, nextPlayerEffects, nextBossEffects });
        return;
      }

      useGoalQuestStore.setState((state) => {
        const enemyAfterPlayer = Math.max(0, state.currentCombat ? state.currentCombat.enemyCurrentHp - dealtDamage : 0);
        const enemyAfterHeal = Math.min(bossMaxHp, enemyAfterPlayer + bossHeal);
        return {
          stats: { ...state.stats, hp: playerWillFall ? 0 : finalHp, mp: nextMp },
          currentCombat: state.currentCombat ? {
            ...state.currentCombat,
            enemyCurrentHp: enemyAfterHeal,
            playerHp: playerWillFall ? 0 : finalHp,
            playerMp: nextMp,
            playerEffects: playerWillFall ? nextPlayerEffects : tickEffects(nextPlayerEffects),
            bossEffects: tickEffects(nextBossEffects),
            turn: state.currentCombat.turn + 1,
            outcome: playerWillFall ? "defeat" : "active",
            log: [
              ...state.currentCombat.log,
              `${move.action.name} deals ${dealtDamage} damage.${healed ? ` Restores ${healed} HP.` : ""}`,
              `${region.boss.name} uses ${bossAttack} for ${receivedDamage} damage.`,
              ...(attackProfile.effect && !playerWillFall ? [`${EFFECT_LABELS[attackProfile.effect.id]} affects you.`] : []),
              ...(mpDrained ? [`${bossAttack} drains ${mpDrained} MP.`] : []),
              ...(bossHeal ? [`${region.boss.name} recovers ${bossHeal} HP.`] : []),
              ...(attackProfile.guardBreak ? [`${bossAttack} breaks ${attackProfile.guardBreak} guard.`] : []),
              ...(playerWillFall ? ["You were defeated."] : [])
            ]
          } : state.currentCombat
        };
      });
    }, 300);

    if (!bossWillFall) {
      window.setTimeout(() => {
        setFx((current) => ({ ...current, bossFx, bossActionLabel: bossAttack }));
        setDamageFx((current) => ({
          ...current,
          playerDamage: receivedDamage,
          playerHit: true,
          bossHeal: bossHeal || null,
          mpDrain: mpDrained || null
        }));
      }, 620);
    }

    window.setTimeout(() => {
      setFx(EMPTY_FX);
      setDamageFx(EMPTY_DAMAGE_FX);
      setIsAnimating(false);
    }, bossWillFall || playerWillFall ? 1500 : 1220);
  };

  const intentSubline = bossEnraged
    ? combatProfile.enragedLine
    : bossPercent <= 66
      ? combatProfile.phaseTwoLine
      : nextAttackProfile.telegraph;

  return (
    <div
      className={`game-screen active combat-rpg-screen combat-region-${region.id} ${scene.atmosphere} ${damageFx.playerHit ? "combat-screen-player-hit" : ""} ${damageFx.bossHit ? "combat-screen-boss-hit" : ""} ${victory ? "combat-screen-victory" : ""} ${defeat ? "combat-screen-defeat" : ""}`}
      style={{
        "--region-accent": region.color,
        "--region-rgb": region.colorRgb,
        "--class-accent": character.color,
        backgroundImage: `linear-gradient(180deg, rgba(3,8,20,.14), rgba(2,6,16,.5) 52%, rgba(2,5,13,.9)), url("${arenaBackground}")`
      } as React.CSSProperties}
    >
      <div className="combat-rpg-vignette" aria-hidden="true" />
      <BossArenaDecor regionId={region.id} />
      <div className="combat-rpg-particles" aria-hidden="true"><span /><span /><span /><span /><span /><span /></div>

      {introVisible ? (
        <div className="combat-rpg-intro" aria-live="polite">
          <small>{scene.arenaLabel}</small>
          <strong>{region.boss.name}</strong>
          <span>{scene.encounterLine}</span>
        </div>
      ) : null}

      <header className="combat-rpg-header">
        <div className="combat-rpg-title-block">
          <span>{scene.arenaLabel}</span>
          <h1>VS {region.boss.name}</h1>
          <p>{scene.epithet}</p>
        </div>
        <button type="button" className="combat-rpg-flee" onClick={fleeCombat} disabled={isAnimating || victory || defeat}>
          <span>↩</span> FLEE
        </button>
      </header>

      <section className="combat-rpg-hud combat-rpg-hud--player" aria-label="Player status">
        <div className="combat-rpg-hud-icon">{character.icon}</div>
        <div className="combat-rpg-hud-copy">
          <div><strong>{character.name}</strong><span>LV. {stats.level}</span></div>
          <div className="combat-rpg-hp-row"><span>HP</span><b>{combat.playerHp}/{stats.maxHp}</b></div>
          <div className="combat-rpg-hp-track"><i style={{ width: `${playerPercent}%` }} /></div>
          <div className="combat-rpg-mp-row"><span>MP</span><b>{playerMp}/{stats.maxMp}</b></div>
          <div className="combat-rpg-mp-track"><i style={{ width: `${playerMpPercent}%` }} /></div>
          {effectChips(playerEffects, "player")}
        </div>
      </section>

      <section className="combat-rpg-hud combat-rpg-hud--boss" aria-label="Boss status">
        <div className="combat-rpg-hud-copy">
          <div><strong>{region.boss.name}</strong><span>{combatProfile.identity}</span></div>
          <div className="combat-rpg-hp-row"><span>HP</span><b>{combat.enemyCurrentHp}/{bossMaxHp}</b></div>
          <div className="combat-rpg-hp-track combat-rpg-hp-track--boss"><i style={{ width: `${bossPercent}%` }} /></div>
          <div className={`combat-rpg-phase ${bossEnraged ? "is-enraged" : ""}`}>{victory ? "DEFEATED" : phaseLabel}</div>
          {effectChips(bossEffects, "boss")}
        </div>
        <div className="combat-rpg-hud-icon">{scene.bossGlyph}</div>
      </section>

      {!victory && !defeat ? (
        <div className={`combat-rpg-intent ${bossEnraged ? "is-enraged" : ""}`} aria-live="polite">
          <span>BOSS INTENT</span>
          <strong>{isAnimating && fx.bossActionLabel ? fx.bossActionLabel : nextBossAttack}</strong>
          <small>{intentSubline}</small>
        </div>
      ) : null}

      <main className="combat-rpg-stage" aria-label={`Battle against ${region.boss.name}`}>
        <div className={`combat-rpg-fighter combat-rpg-player ${classFx.aura} ${fx.playerFx} ${damageFx.playerHit ? "is-hit" : ""} ${defeat ? "is-defeated" : ""}`}>
          <div className="combat-rpg-ground-shadow" />
          <div className="combat-rpg-player-aura" aria-hidden="true" />
          <img src={playerSprite} alt={character.name} className="combat-rpg-player-sprite" />
          {fx.actionLabel ? <div className="combat-rpg-action-callout combat-rpg-action-callout--player">{fx.actionLabel}</div> : null}
          {damageFx.playerDamage !== null ? <div className="combat-rpg-damage-number combat-rpg-damage-number--player">-{damageFx.playerDamage}</div> : null}
          {damageFx.heal !== null ? <div className="combat-rpg-heal-number">+{damageFx.heal}</div> : null}
          {damageFx.mpDrain !== null ? <div className="combat-rpg-resource-number">-{damageFx.mpDrain} MP</div> : null}
          <div className="combat-player-projectile" aria-hidden="true"><span /></div>
        </div>

        <div className="combat-rpg-versus-mark" aria-hidden="true">✦</div>

        <div className={`combat-rpg-fighter combat-rpg-boss ${scene.bossClass} ${fx.bossFx} ${bossEnraged ? "is-enraged" : ""} ${damageFx.bossHit ? "is-hit" : ""} ${victory ? "combat-rpg-boss--defeated" : ""}`}>
          <div className="combat-rpg-ground-shadow combat-rpg-ground-shadow--boss" />
          <div className="combat-rpg-boss-aura" aria-hidden="true" />
          <BossSprite regionId={region.id} className="combat-rpg-boss-sprite" />
          {fx.bossActionLabel ? <div className="combat-rpg-action-callout combat-rpg-action-callout--boss">{fx.bossActionLabel}</div> : null}
          {damageFx.bossDamage !== null ? <div className="combat-rpg-damage-number combat-rpg-damage-number--boss">-{damageFx.bossDamage}</div> : null}
          {damageFx.bossHeal !== null ? <div className="combat-rpg-heal-number combat-rpg-heal-number--boss">+{damageFx.bossHeal}</div> : null}
          <div className="combat-boss-projectile" aria-hidden="true"><span /></div>
        </div>

        <div className={`combat-rpg-impact-layer ${fx.playerFx ? "is-player-impact" : ""} ${fx.bossFx ? "is-boss-impact" : ""}`} aria-hidden="true"><i /><i /><i /><i /></div>
      </main>

      <section className={`combat-rpg-command-panel ${victory || defeat ? "is-result" : ""}`}>
        {victory || defeat ? (
          <div className={`combat-rpg-result-card ${victory ? "is-victory" : "is-defeat"}`}>
            <span>{victory ? "✦ ENCOUNTER CLEARED ✦" : "THE PATH REMAINS"}</span>
            <strong>{victory ? "VICTORY" : "DEFEAT"}</strong>
            <p>{victory ? `${region.boss.name} has fallen. ${region.name} is yours.` : `${region.boss.name} stopped this attempt. Recover and challenge it again.`}</p>
            {victory ? <b>+{reward} EXP</b> : <b>HP DEPLETED</b>}
            <button type="button" className="combat-rpg-result-continue" onClick={finishResult}>
              {victory ? "CONTINUE JOURNEY" : "RETURN TO WORLD"} <span>›</span>
            </button>
          </div>
        ) : (
          <>
            <div className="combat-rpg-command-title">
              <span>{isAnimating ? "ACTION IN PROGRESS" : resourceWarning || (bossEnraged ? "BOSS ENRAGED · CHOOSE CAREFULLY" : "CHOOSE YOUR ACTION")}</span>
              <small>TURN {Math.max(1, combat.turn + 1)}</small>
            </div>
            <div className="combat-rpg-actions">
              {loadout.map((move, index) => {
                const insufficientMp = move.action.mpCost > playerMp;
                return (
                  <button
                    key={move.attackType}
                    type="button"
                    className={`combat-rpg-action combat-rpg-action--${move.attackType} ${insufficientMp ? "is-resource-locked" : ""}`}
                    onClick={() => triggerAttack(move)}
                    disabled={isAnimating || insufficientMp}
                    title={insufficientMp ? `Needs ${move.action.mpCost} MP` : move.action.name}
                  >
                    <span className="combat-rpg-action-number">0{index + 1}</span>
                    <span className="combat-rpg-action-icon">{move.icon}</span>
                    <span className="combat-rpg-action-copy"><strong>{move.action.name}</strong><small>{actionDescription(move)}</small></span>
                    <span className="combat-rpg-action-cost">{move.action.mpCost ? `${move.action.mpCost} MP` : "FREE"}</span>
                    <span className="combat-rpg-action-chevron">›</span>
                  </button>
                );
              })}
            </div>

            <div className="combat-rpg-log" aria-live="polite">
              {recentLog.map((entry, index) => <span key={`${entry}-${index}`}>{entry}</span>)}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
