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
    <div className="game-screen active start-screen">
      <header className="start-header">
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
      ) : null}

      <div className="ff-menu start-menu">
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
              className="menu-option start-primary-action"
              onClick={() => setScreen("characters")}
            >
              <i className="fas fa-gamepad" aria-hidden="true" />
              <span>NEXT → CHOOSE YOUR CLASS</span>
            </button>
            <button
              type="button"
              className="menu-option start-secondary-action"
              onClick={() => setScreen("settings")}
            >
              <i className="fas fa-cog" aria-hidden="true" />
              <span>SETTINGS</span>
            </button>
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
