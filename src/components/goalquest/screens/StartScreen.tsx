import React, { useEffect, useState } from "react";

import { getEquippedItems, loadEquipment, type EquippedGear } from "../../../game/gear";
import { goalQuestAssets, useGoalQuestStore } from "../../../stores/goalQuestStore";
import HeroGearVisuals from "../gear/HeroGearVisuals";
import { publicAssetPath } from "../utils";

const EMPTY_EQUIPMENT: EquippedGear = {
  weapon: null,
  armor: null,
  relic: null,
  aura: null
};

export default function StartScreen() {
  const character = useGoalQuestStore((state) => state.character);
  const stats = useGoalQuestStore((state) => state.stats);
  const setScreen = useGoalQuestStore((state) => state.setScreen);
  const getPathName = useGoalQuestStore((state) => state.getPathName);
  const getPathDescription = useGoalQuestStore((state) => state.getPathDescription);
  const [equipment, setEquipment] = useState<EquippedGear>(EMPTY_EQUIPMENT);

  useEffect(() => {
    if (!character) {
      setEquipment(EMPTY_EQUIPMENT);
      return;
    }
    setEquipment(loadEquipment(character.id, stats));
  }, [character, stats.level]);

  const characterImageSrc = character ? publicAssetPath(goalQuestAssets.classes[character.id]) : "";
  const introHeroSrc = publicAssetPath(goalQuestAssets.classes[2]);
  const equippedItems = character ? getEquippedItems(character.id, stats, equipment) : [];
  const remainingDailies = Math.max(0, stats.dailyTasksGoal - stats.dailyTasksCompleted);
  const regionDoneToday = stats.lastRegionMissionDate === new Date().toDateString();
  const dailyProgress = stats.dailyTasksGoal > 0
    ? Math.min(100, Math.round((stats.dailyTasksCompleted / stats.dailyTasksGoal) * 100))
    : 0;
  const xpProgress = stats.nextLevelExp > 0
    ? Math.min(100, Math.round((stats.exp / stats.nextLevelExp) * 100))
    : 0;

  return (
    <div className={`game-screen active start-screen ${character ? "" : "start-screen--intro"}`}>
      <header className="start-header">
        <div className="start-title-kicker" aria-hidden="true">
          <span />
          <i className="fas fa-crown" />
          <span />
        </div>
        <h1 className="game-title">GOALQUEST</h1>
        <p className="start-tagline">Turn your goals into an adventure</p>
      </header>

      {character ? (
        <section className="start-character-panel" aria-label="Current character progress">
          <div className="start-character-stage" style={{ "--gear-accent": character.color } as React.CSSProperties}>
            <HeroGearVisuals items={equippedItems} compact />
            <img
              className="start-character-image"
              src={characterImageSrc}
              alt={character.name}
              loading="eager"
              decoding="async"
              style={{ filter: `drop-shadow(0 0 10px ${character.color})` }}
            />
            <span className="start-character-platform" aria-hidden="true" />
          </div>

          <div className="start-character-meta">
            <div className="start-character-class">
              LV. {stats.level} • {character.name.toUpperCase()}
            </div>
            <div className="start-path-name">{getPathName()}</div>
            <p className="start-path-description">{getPathDescription()}</p>

            {equippedItems.length > 0 ? (
              <button type="button" className="start-gear-summary" onClick={() => setScreen("gear")}>
                <span>◆ GEAR</span>
                <span>{equippedItems.length}/4 EQUIPPED</span>
              </button>
            ) : null}

            <div className="start-xp-row" aria-hidden="true">
              <span>XP</span>
              <span>{stats.exp} / {stats.nextLevelExp}</span>
            </div>
            <div
              className="start-xp-track"
              role="progressbar"
              aria-label="Experience progress"
              aria-valuemin={0}
              aria-valuemax={stats.nextLevelExp}
              aria-valuenow={Math.min(stats.exp, stats.nextLevelExp)}
            >
              <span className="start-xp-fill" style={{ width: `${xpProgress}%` }} />
            </div>
          </div>
        </section>
      ) : (
        <section className="intro-quest-layout" aria-label="Begin your GoalQuest journey">
          <aside className="intro-quest-panel intro-quest-panel--left">
            <span className="intro-panel-eyebrow">YOUR JOURNEY</span>
            <div className="intro-journey-step">
              <span className="intro-step-icon">◆</span>
              <div>
                <strong>COMPLETE QUESTS</strong>
                <small>Turn real goals into missions.</small>
              </div>
            </div>
            <div className="intro-journey-step">
              <span className="intro-step-icon">✦</span>
              <div>
                <strong>EARN XP</strong>
                <small>Build momentum every day.</small>
              </div>
            </div>
            <div className="intro-journey-step">
              <span className="intro-step-icon">★</span>
              <div>
                <strong>EVOLVE</strong>
                <small>Unlock visible rewards.</small>
              </div>
            </div>
          </aside>

          <div className="intro-quest-center">
            <div className="intro-portal-scene" aria-hidden="true">
              <span className="intro-portal-aura" />
              <span className="intro-portal-ring intro-portal-ring--outer" />
              <span className="intro-portal-ring intro-portal-ring--inner" />
              <span className="intro-rune intro-rune--one">✦</span>
              <span className="intro-rune intro-rune--two">◆</span>
              <span className="intro-rune intro-rune--three">✧</span>
              <img className="intro-hero-image" src={introHeroSrc} alt="" loading="eager" decoding="async" />
              <span className="intro-hero-platform" />
            </div>

            <p className="intro-hero-callout">YOUR HERO AWAITS</p>
          </div>

          <aside className="intro-quest-panel intro-quest-panel--right">
            <span className="intro-panel-eyebrow">EVERY QUEST COUNTS</span>
            <div className="intro-feature-row">
              <span className="intro-feature-icon"><i className="fas fa-fire" aria-hidden="true" /></span>
              <span>Build streaks</span>
            </div>
            <div className="intro-feature-row">
              <span className="intro-feature-icon"><i className="fas fa-gem" aria-hidden="true" /></span>
              <span>Unlock gear</span>
            </div>
            <div className="intro-feature-row">
              <span className="intro-feature-icon"><i className="fas fa-star" aria-hidden="true" /></span>
              <span>Evolve your hero</span>
            </div>
            <div className="intro-feature-row">
              <span className="intro-feature-icon"><i className="fas fa-trophy" aria-hidden="true" /></span>
              <span>Defeat milestones</span>
            </div>
          </aside>
        </section>
      )}

      <div className={`ff-menu start-menu ${character ? "" : "start-menu--intro"}`}>
        {character ? (
          <>
            <button
              type="button"
              className="menu-option start-primary-action"
              onClick={() => setScreen("world")}
            >
              <i className="fas fa-play" aria-hidden="true" />
              <span>{remainingDailies === 0 && !regionDoneToday ? "NEXT → CONTINUE ADVENTURE" : "CONTINUE ADVENTURE"}</span>
            </button>

            <button
              type="button"
              className="menu-option start-daily-action"
              onClick={() => setScreen("daily")}
            >
              <i className="fas fa-calendar-day" aria-hidden="true" />
              <span className="start-daily-copy">
                <span className="start-daily-topline">
                  <span>{remainingDailies > 0 ? "NEXT → DAILY QUESTS" : "DAILY QUESTS"}</span>
                  <span className="start-daily-count">{stats.dailyTasksCompleted}/{stats.dailyTasksGoal}</span>
                </span>
                <span className="start-daily-progress-track" aria-hidden="true">
                  <span className="start-daily-progress-fill" style={{ width: `${dailyProgress}%` }} />
                </span>
              </span>
            </button>

            <div className="start-secondary-actions">
              <button
                type="button"
                className="menu-option start-secondary-action start-gear-action"
                onClick={() => setScreen("gear")}
              >
                <i className="fas fa-gem" aria-hidden="true" />
                <span>GEAR</span>
              </button>
              <button
                type="button"
                className="menu-option start-secondary-action"
                onClick={() => setScreen("characters")}
              >
                <i className="fas fa-gamepad" aria-hidden="true" />
                <span>CHANGE CLASS</span>
              </button>
              <button
                type="button"
                className="menu-option start-secondary-action"
                onClick={() => setScreen("settings")}
              >
                <i className="fas fa-cog" aria-hidden="true" />
                <span>SETTINGS</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <button
              type="button"
              className="menu-option start-primary-action intro-primary-action"
              onClick={() => setScreen("characters")}
            >
              <i className="fas fa-play" aria-hidden="true" />
              <span>BEGIN QUEST</span>
              <span className="intro-primary-arrow" aria-hidden="true">›</span>
            </button>
            <button
              type="button"
              className="menu-option start-secondary-action intro-settings-action"
              onClick={() => setScreen("settings")}
            >
              <i className="fas fa-cog" aria-hidden="true" />
              <span>SETTINGS</span>
            </button>
            <p className="intro-save-note">PROGRESS SAVES ON THIS DEVICE</p>
          </>
        )}
      </div>

      {character && stats.dailyStreak > 0 ? (
        <div className="start-streak">🔥 {stats.dailyStreak} DAY{stats.dailyStreak === 1 ? "" : "S"} STREAK</div>
      ) : null}

      <footer className="start-footer">© 2026 GOALQUEST</footer>
    </div>
  );
}
