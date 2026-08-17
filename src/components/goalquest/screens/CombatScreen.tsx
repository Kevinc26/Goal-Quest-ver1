import React, { useEffect, useState } from "react";

import { bossSceneForRegion, classBattleFx } from "../../../game/bossPresentation";
import { getClassCombatLoadout, type LegacyAttackType } from "../../../game/combatLoadouts";
import { regionById } from "../../../game/data";
import { goalQuestAssets, useGoalQuestStore } from "../../../stores/goalQuestStore";
import BossSprite from "../combat/BossSprite";
import { percent, publicAssetPath } from "../utils";

type CombatFxState = {
  playerFx: string;
  bossFx: string;
  actionLabel: string;
  bossActionLabel: string;
};

const EMPTY_FX: CombatFxState = {
  playerFx: "",
  bossFx: "",
  actionLabel: "",
  bossActionLabel: ""
};

const actionDescription = (move: ReturnType<typeof getClassCombatLoadout>[number]) => {
  const parts = [`POWER ${move.action.power}`];
  if (move.action.healPower) parts.push(`HEAL ${move.action.healPower}`);
  if (move.action.defensePower) parts.push(`GUARD ${move.action.defensePower}`);
  if (move.action.effect) parts.push(move.action.effect.id.toUpperCase());
  return parts.join(" · ");
};

export default function CombatScreen() {
  const combat = useGoalQuestStore((state) => state.currentCombat);
  const stats = useGoalQuestStore((state) => state.stats);
  const character = useGoalQuestStore((state) => state.character);
  const performAttack = useGoalQuestStore((state) => state.performAttack);
  const fleeCombat = useGoalQuestStore((state) => state.fleeCombat);

  const [fx, setFx] = useState<CombatFxState>(EMPTY_FX);
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

  const triggerAttack = (attackType: LegacyAttackType, actionName: string) => {
    if (isAnimating || victory || defeat) return;

    const bossAttackIndex = combat.turn % Math.max(1, region.boss.attacks.length);
    const bossAttack = region.boss.attacks[bossAttackIndex] ?? "Strike";
    const playerFx = classFx[attackType];
    const bossFx = scene.attackFx[bossAttack] ?? "fx-boss-strike";

    setIsAnimating(true);
    setFx({ playerFx, bossFx: "", actionLabel: actionName, bossActionLabel: "" });

    window.setTimeout(() => {
      performAttack(attackType);
    }, 260);

    window.setTimeout(() => {
      setFx((current) => ({ ...current, bossFx, bossActionLabel: bossAttack }));
    }, 520);

    window.setTimeout(() => {
      setFx(EMPTY_FX);
      setIsAnimating(false);
    }, 1150);
  };

  return (
    <div
      className={`game-screen active combat-rpg-screen combat-region-${region.id} ${scene.atmosphere}`}
      style={{
        "--region-accent": region.color,
        "--region-rgb": region.colorRgb,
        "--class-accent": character.color,
        backgroundImage: `linear-gradient(180deg, rgba(3,8,20,.14), rgba(2,6,16,.5) 52%, rgba(2,5,13,.9)), url("${arenaBackground}")`
      } as React.CSSProperties}
    >
      <div className="combat-rpg-vignette" aria-hidden="true" />
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
        </div>
        <div className="combat-rpg-hud-icon">{scene.bossGlyph}</div>
      </section>

      <main className="combat-rpg-stage" aria-label={`Battle against ${region.boss.name}`}>
        <div className={`combat-rpg-fighter combat-rpg-player ${classFx.aura} ${fx.playerFx}`}>
          <div className="combat-rpg-ground-shadow" />
          <div className="combat-rpg-player-aura" aria-hidden="true" />
          <img src={playerSprite} alt={character.name} className="combat-rpg-player-sprite" />
          {fx.actionLabel ? <div className="combat-rpg-action-callout combat-rpg-action-callout--player">{fx.actionLabel}</div> : null}
          <div className="combat-player-projectile" aria-hidden="true"><span /></div>
        </div>

        <div className="combat-rpg-versus-mark" aria-hidden="true">✦</div>

        <div className={`combat-rpg-fighter combat-rpg-boss ${scene.bossClass} ${fx.bossFx} ${victory ? "combat-rpg-boss--defeated" : ""}`}>
          <div className="combat-rpg-ground-shadow combat-rpg-ground-shadow--boss" />
          <div className="combat-rpg-boss-aura" aria-hidden="true" />
          <BossSprite regionId={region.id} className="combat-rpg-boss-sprite" />
          {fx.bossActionLabel ? <div className="combat-rpg-action-callout combat-rpg-action-callout--boss">{fx.bossActionLabel}</div> : null}
          <div className="combat-boss-projectile" aria-hidden="true"><span /></div>
        </div>

        <div className={`combat-rpg-impact-layer ${fx.playerFx ? "is-player-impact" : ""} ${fx.bossFx ? "is-boss-impact" : ""}`} aria-hidden="true"><i /><i /><i /><i /></div>
      </main>

      <section className="combat-rpg-command-panel">
        <div className="combat-rpg-command-title">
          <span>{isAnimating ? "ACTION IN PROGRESS" : "CHOOSE YOUR ACTION"}</span>
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
