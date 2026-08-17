import React, { useEffect, useState } from "react";

import { getEquippedItems, loadEquipment, type EquippedGear } from "../../../game/gear";
import { saveGoalQuestCloud } from "../../../lib/cloudSave";
import { goalQuestAssets, useGoalQuestStore } from "../../../stores/goalQuestStore";
import { useGoalQuestAuth } from "../auth/AuthProvider";
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
  const auth = useGoalQuestAuth();
  const [equipment, setEquipment] = useState<EquippedGear>(EMPTY_EQUIPMENT);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    if (!character) {
      setEquipment(EMPTY_EQUIPMENT);
      return;
    }
    setEquipment(loadEquipment(character.id, stats));
  }, [character, stats.level]);

  const handleSignOut = async () => {
    if (signingOut) {
      return;
    }

    setSigningOut(true);
    try {
      if (auth.session) {
        try {
          await saveGoalQuestCloud(auth.session);
        } catch (error) {
          console.error("Final GoalQuest cloud save before sign out failed", error);
        }
      }
      await auth.signOut();
    } finally {
      setSigningOut(false);
    }
  };

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
  const heroAccent = character?.color ?? "#4dff91";

  return (
    <div className={`game-screen active start-screen start-screen--intro ${character ? "start-screen--player" : "start-screen--new"}`}>
      <header className="start-header">
        <div className="start-title-kicker" aria-hidden="true">
          <span />
          <i className="fas fa-crown" />
          <span />
        </div>
        <h1 className="game-title">GOALQUEST</h1>
        <p className="start-tagline">Turn your goals into an adventure</p>
      </header>

      <section
        className={`intro-quest-layout ${character ? "intro-quest-layout--player" : ""}`}
        aria-label={character ? "Current GoalQuest hero" : "Begin your GoalQuest journey"}
      >
        {character ? (
          <aside className="intro-quest-panel intro-quest-panel--left intro-player-panel">
            <span className="intro-panel-eyebrow">YOUR PROGRESS</span>

            <div className="intro-journey-step">
              <span className="intro-step-icon">★</span>
              <div>
                <strong>LEVEL {stats.level}</strong>
                <small>{stats.exp} / {stats.nextLevelExp} XP</small>
              </div>
            </div>

            <div className="intro-journey-step">
              <span className="intro-step-icon">◆</span>
              <div>
                <strong>DAILY QUESTS</strong>
                <small>{stats.dailyTasksCompleted}/{stats.dailyTasksGoal} completed today</small>
              </div>
            </div>

            <div className="intro-journey-step">
              <span className="intro-step-icon">✦</span>
              <div>
                <strong>STREAK</strong>
                <small>{stats.dailyStreak} day{stats.dailyStreak === 1 ? "" : "s"} strong</small>
              </div>
            </div>
          </aside>
        ) : (
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
        )}

        <div className="intro-quest-center">
          <div
            className={`intro-portal-scene ${character ? "intro-portal-scene--player" : ""}`}
            style={{ "--hero-accent": heroAccent } as React.CSSProperties}
            aria-hidden="true"
          >
            <span className="intro-portal-aura" />
            <span className="intro-portal-ring intro-portal-ring--outer" />
            <span className="intro-portal-ring intro-portal-ring--inner" />
            <span className="intro-rune intro-rune--one">✦</span>
            <span className="intro-rune intro-rune--two">◆</span>
            <span className="intro-rune intro-rune--three">✧</span>

            {character ? (
              <div className="intro-selected-hero-wrap">
                <HeroGearVisuals items={equippedItems} compact />
                <img
                  className="intro-hero-image intro-hero-image--selected"
                  src={characterImageSrc}
                  alt=""
                  loading="eager"
                  decoding="async"
                />
              </div>
            ) : (
              <img className="intro-hero-image" src={introHeroSrc} alt="" loading="eager" decoding="async" />
            )}

            <span className="intro-hero-platform" />
          </div>

          {character ? (
            <div className="intro-player-meta">
              <div className="intro-player-class">LV. {stats.level} • {character.name.toUpperCase()}</div>
              <div className="intro-player-path">{getPathName()}</div>
              <p className="intro-player-description">{getPathDescription()}</p>
              <div className="intro-player-xp-row" aria-hidden="true">
                <span>XP</span>
                <span>{stats.exp} / {stats.nextLevelExp}</span>
              </div>
              <div
                className="start-xp-track intro-player-xp-track"
                role="progressbar"
                aria-label="Experience progress"
                aria-valuemin={0}
                aria-valuemax={stats.nextLevelExp}
                aria-valuenow={Math.min(stats.exp, stats.nextLevelExp)}
              >
                <span className="start-xp-fill" style={{ width: `${xpProgress}%` }} />
              </div>
            </div>
          ) : (
            <p className="intro-hero-callout">YOUR HERO AWAITS</p>
          )}
        </div>

        {character ? (
          <aside className="intro-quest-panel intro-quest-panel--right intro-player-panel">
            <span className="intro-panel-eyebrow">NEXT OBJECTIVES</span>

            <div className="intro-feature-row">
              <span className="intro-feature-icon"><i className="fas fa-calendar-day" aria-hidden="true" /></span>
              <span>{remainingDailies > 0 ? `${remainingDailies} daily quest${remainingDailies === 1 ? "" : "s"} left` : "Daily quests cleared"}</span>
            </div>

            <div className="intro-feature-row">
              <span className="intro-feature-icon"><i className="fas fa-map-marked-alt" aria-hidden="true" /></span>
              <span>{regionDoneToday ? "Region mission complete" : "Continue your region"}</span>
            </div>

            <div className="intro-feature-row">
              <span className="intro-feature-icon"><i className="fas fa-gem" aria-hidden="true" /></span>
              <span>{equippedItems.length}/4 gear equipped</span>
            </div>

            <div className="intro-feature-row">
              <span className="intro-feature-icon"><i className="fas fa-trophy" aria-hidden="true" /></span>
              <span>Keep building your hero</span>
            </div>
          </aside>
        ) : (
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
        )}
      </section>

      <div className={`ff-menu start-menu start-menu--intro ${character ? "start-menu--player" : ""}`}>
        {character ? (
          <>
            <button
              type="button"
              className="menu-option start-primary-action intro-primary-action"
              onClick={() => setScreen("world")}
            >
              <i className="fas fa-play" aria-hidden="true" />
              <span>{remainingDailies === 0 && !regionDoneToday ? "NEXT → CONTINUE ADVENTURE" : "CONTINUE ADVENTURE"}</span>
              <span className="intro-primary-arrow" aria-hidden="true">›</span>
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

            <div className="start-secondary-actions start-secondary-actions--player">
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

            {auth.configured && auth.session ? (
              <button
                type="button"
                className="menu-option start-secondary-action"
                onClick={() => void handleSignOut()}
                disabled={signingOut}
                aria-label="Sign out of GoalQuest"
                style={{
                  width: "100%",
                  minHeight: "34px",
                  padding: "7px 12px",
                  justifyContent: "center",
                  gap: "8px",
                  color: "#aebdcc",
                  borderColor: "rgba(174,189,204,.28)",
                  background: "rgba(13,25,40,.72)",
                  opacity: signingOut ? 0.65 : 0.9
                }}
              >
                <i className="fas fa-right-from-bracket" aria-hidden="true" />
                <span>{signingOut ? "SAVING ADVENTURE..." : "SIGN OUT"}</span>
              </button>
            ) : null}
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

      <footer className="start-footer">© 2026 GOALQUEST</footer>
    </div>
  );
}
