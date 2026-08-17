import React, { useEffect, useState } from "react";

import { bossSceneForRegion, classBattleFx } from "../../../game/bossPresentation";
import { getClassCombatLoadout, type LegacyAttackType } from "../../../game/combatLoadouts";
import { regionById } from "../../../game/data";
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
};

const EMPTY_FX: CombatFxState = {
  playerFx: "",
  bossFx: "",
  actionLabel: "",
  bossActionLabel: ""
};

const EMPTY_DAMAGE_FX: DamageFxState = {
  bossDamage: null,
  playerDamage: null,
  bossHit: false,
  playerHit: false
};

const actionDescription = (move: ReturnType<typeof getClassCombatLoadout>[number]) => {
  const parts = [`POWER ${move.action.power}`];
  if (move.action.healPower) parts.push(`HEAL ${move.action.healPower}`);
  if (move.action.defensePower) parts.push(`GUARD ${move.action.defensePower}`);
  if (move.action.effect) parts.push(move.action.effect.id.toUpperCase());
  return parts.join(" · ");
};

const bossPhaseLabel = (bossPercent: number) => {
  if (bossPercent > 66) return "PHASE I";
  if (bossPercent > 33) return "PHASE II";
  return "ENRAGED";
};

const predictedPlayerDamage = (attackType: LegacyAttackType, dailyExp: number) => {
  if (attackType === "weak") return 10 + Math.floor(dailyExp / 10);
  if (attackType === "medium") return 20 + Math.floor(dailyExp / 5);
  return 30 + Math.floor(dailyExp / 3);
};

export default function CombatScreen() {
  const combat = useGoalQuestStore((state) => state.currentCombat);
  const stats = useGoalQuestStore((state) => state.stats);
  const character = useGoalQuestStore((state) => state.character);
  const performAttack = useGoalQuestStore((state) => state.performAttack);
  const fleeCombat = useGoalQuestStore((state) => state.fleeCombat);

  const [fx, setFx] = useState<CombatFxState>(EMPTY_FX);
  const [damageFx, setDamageFx] = useState<DamageFxState>(EMPTY_DAMAGE_FX);
  const [isAnimating, setIsAnimating] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroVisible(false), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  if (!combat) {
    return (
      <div className="game-screen active combat-rpg-fallback">
        <h2>No active battle</h2>
      </div>
    );
  }

  const region = regionById(combat.regionId);
  if (!region || !character) {
    return null;
  }

  const loadout = getClassCombatLoadout(character.id);
  const scene = bossSceneForRegion(region.id);
  const classFx = classBattleFx[character.id] ?? classBattleFx[1];
  const playerSprite = publicAssetPath(goalQuestAssets.classes[character.id]);
  const arenaBackground = publicAssetPath(goalQuestAssets.acts[region.id]);
  const bossMaxHp = region.boss.hp;
  const bossPercent = percent(combat.enemyCurrentHp, bossMaxHp);
  const playerPercent = percent(combat.playerHp, stats.maxHp);
  const victory = combat.enemyCurrentHp <= 0;
  const defeat = combat.playerHp <= 0;
  const recentLog = combat.log.slice(-3);
  const phaseLabel = bossPhaseLabel(bossPercent);
  const bossEnraged = bossPercent <= 33 && bossPercent > 0;
  const nextBossAttackIndex = combat.turn % Math.max(1, region.boss.attacks.length);
  const nextBossAttack = region.boss.attacks[nextBossAttackIndex] ?? "Strike";

  const triggerAttack = (attackType: LegacyAttackType, actionName: string) => {
    if (isAnimating || victory || defeat) return;

    const bossAttackIndex = combat.turn % Math.max(1, region.boss.attacks.length);
    const bossAttack = region.boss.attacks[bossAttackIndex] ?? "Strike";
    const playerFx = classFx[attackType];
    const bossFx = scene.attackFx[bossAttack] ?? "fx-boss-strike";
    const dealtDamage = Math.min(combat.enemyCurrentHp, predictedPlayerDamage(attackType, stats.dailyExp));
    const receivedDamage = Math.min(combat.playerHp, 10 + region.boss.difficulty * 5);

    setIsAnimating(true);
    setDamageFx(EMPTY_DAMAGE_FX);
    setFx({ playerFx, bossFx: "", actionLabel: actionName, bossActionLabel: "" });

    window.setTimeout(() => {
      setDamageFx((current) => ({ ...current, bossDamage: dealtDamage, bossHit: true }));
      performAttack(attackType);
    }, 260);

    window.setTimeout(() => {
      setFx((current) => ({ ...current, bossFx, bossActionLabel: bossAttack }));
      setDamageFx((current) => ({ ...current, playerDamage: receivedDamage, playerHit: true }));
    }, 520);

    window.setTimeout(() => {
      setFx(EMPTY_FX);
      setDamageFx(EMPTY_DAMAGE_FX);
      setIsAnimating(false);
    }, 1150);
  };

  return (
    <div
      className={`game-screen active combat-rpg-screen combat-region-${region.id} ${scene.atmosphere} ${damageFx.playerHit ? "combat-screen-player-hit" : ""} ${damageFx.bossHit ? "combat-screen-boss-hit" : ""}`}
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
        </div>
      </section>

      <section className="combat-rpg-hud combat-rpg-hud--boss" aria-label="Boss status">
        <div className="combat-rpg-hud-copy">
          <div><strong>{region.boss.name}</strong><span>RANK {region.boss.difficulty}</span></div>
          <div className="combat-rpg-hp-row"><span>HP</span><b>{combat.enemyCurrentHp}/{bossMaxHp}</b></div>
          <div className="combat-rpg-hp-track combat-rpg-hp-track--boss"><i style={{ width: `${bossPercent}%` }} /></div>
          <div className={`combat-rpg-phase ${bossEnraged ? "is-enraged" : ""}`}>{phaseLabel}</div>
        </div>
        <div className="combat-rpg-hud-icon">{scene.bossGlyph}</div>
      </section>

      <div className={`combat-rpg-intent ${bossEnraged ? "is-enraged" : ""}`} aria-live="polite">
        <span>BOSS INTENT</span>
        <strong>{isAnimating && fx.bossActionLabel ? fx.bossActionLabel : nextBossAttack}</strong>
        <small>{bossEnraged ? "ENRAGED STRIKE INCOMING" : "READ THE ENEMY · PLAN YOUR TURN"}</small>
      </div>

      <main className="combat-rpg-stage" aria-label={`Battle against ${region.boss.name}`}>
        <div className={`combat-rpg-fighter combat-rpg-player ${classFx.aura} ${fx.playerFx} ${damageFx.playerHit ? "is-hit" : ""}`}>
          <div className="combat-rpg-ground-shadow" />
          <div className="combat-rpg-player-aura" aria-hidden="true" />
          <img src={playerSprite} alt={character.name} className="combat-rpg-player-sprite" />
          {fx.actionLabel ? <div className="combat-rpg-action-callout combat-rpg-action-callout--player">{fx.actionLabel}</div> : null}
          {damageFx.playerDamage !== null ? <div className="combat-rpg-damage-number combat-rpg-damage-number--player">-{damageFx.playerDamage}</div> : null}
          <div className="combat-player-projectile" aria-hidden="true"><span /></div>
        </div>

        <div className="combat-rpg-versus-mark" aria-hidden="true">✦</div>

        <div className={`combat-rpg-fighter combat-rpg-boss ${scene.bossClass} ${fx.bossFx} ${bossEnraged ? "is-enraged" : ""} ${damageFx.bossHit ? "is-hit" : ""} ${victory ? "combat-rpg-boss--defeated" : ""}`}>
          <div className="combat-rpg-ground-shadow combat-rpg-ground-shadow--boss" />
          <div className="combat-rpg-boss-aura" aria-hidden="true" />
          <BossSprite regionId={region.id} className="combat-rpg-boss-sprite" />
          {fx.bossActionLabel ? <div className="combat-rpg-action-callout combat-rpg-action-callout--boss">{fx.bossActionLabel}</div> : null}
          {damageFx.bossDamage !== null ? <div className="combat-rpg-damage-number combat-rpg-damage-number--boss">-{damageFx.bossDamage}</div> : null}
          <div className="combat-boss-projectile" aria-hidden="true"><span /></div>
        </div>

        <div className={`combat-rpg-impact-layer ${fx.playerFx ? "is-player-impact" : ""} ${fx.bossFx ? "is-boss-impact" : ""}`} aria-hidden="true"><i /><i /><i /><i /></div>
      </main>

      <section className="combat-rpg-command-panel">
        <div className="combat-rpg-command-title">
          <span>{isAnimating ? "ACTION IN PROGRESS" : bossEnraged ? "BOSS ENRAGED · CHOOSE CAREFULLY" : "CHOOSE YOUR ACTION"}</span>
          <small>TURN {Math.max(1, combat.turn + 1)}</small>
        </div>
        <div className="combat-rpg-actions">
          {loadout.map((move, index) => (
            <button
              key={move.attackType}
              type="button"
              className={`combat-rpg-action combat-rpg-action--${move.attackType}`}
              onClick={() => triggerAttack(move.attackType, move.action.name)}
              disabled={isAnimating || victory || defeat}
            >
              <span className="combat-rpg-action-number">0{index + 1}</span>
              <span className="combat-rpg-action-icon">{move.icon}</span>
              <span className="combat-rpg-action-copy"><strong>{move.action.name}</strong><small>{actionDescription(move)}</small></span>
              <span className="combat-rpg-action-chevron">›</span>
            </button>
          ))}
        </div>

        <div className="combat-rpg-log" aria-live="polite">
          {recentLog.map((entry, index) => <span key={`${entry}-${index}`}>{entry}</span>)}
        </div>
      </section>

      {victory ? (
        <div className="combat-rpg-result combat-rpg-result--victory" aria-live="assertive"><span>✦ BOSS DEFEATED ✦</span><strong>VICTORY</strong><small>{region.name} answers to you now.</small></div>
      ) : null}

      {defeat ? (
        <div className="combat-rpg-result combat-rpg-result--defeat" aria-live="assertive"><span>THE BATTLE IS NOT OVER</span><strong>DEFEAT</strong><small>Return stronger. The path remains.</small></div>
      ) : null}
    </div>
  );
}
