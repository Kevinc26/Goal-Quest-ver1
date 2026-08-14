import React from "react";

import { goalQuestAssets, useGoalQuestStore } from "../../../stores/goalQuestStore";
import { publicAssetPath } from "../utils";
import NextStepCard from "../shared/NextStepCard";

export default function StartScreen() {
  const character = useGoalQuestStore((state) => state.character);
  const stats = useGoalQuestStore((state) => state.stats);
  const setScreen = useGoalQuestStore((state) => state.setScreen);
  const getPathName = useGoalQuestStore((state) => state.getPathName);
  const getPathDescription = useGoalQuestStore((state) => state.getPathDescription);
  const characterImageSrc = character ? publicAssetPath(goalQuestAssets.classes[character.id]) : "";
  const remainingDailies = Math.max(0, stats.dailyTasksGoal - stats.dailyTasksCompleted);
  const regionDoneToday = stats.lastRegionMissionDate === new Date().toDateString();

  return (
    <div className="game-screen active start-screen">
      <h1 className="game-title">GOALQUEST</h1>
      <p style={{ textAlign: "center", color: "var(--warning)", margin: "20px 0" }}>
        Psychological Transformation RPG
      </p>

      {character ? (
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <img
            src={characterImageSrc}
            alt={character.name}
            loading="eager"
            decoding="async"
            style={{
              width: "120px",
              height: "120px",
              objectFit: "contain",
              imageRendering: "pixelated",
              filter: `drop-shadow(0 0 18px ${character.color})`,
              margin: "0 auto",
              display: "block"
            }}
          />
          <div style={{ color: character.color, fontSize: "16px", marginTop: "10px" }}>{getPathName()}</div>
          <div style={{ color: "var(--text-muted)", fontSize: "12px", lineHeight: 1.6, marginTop: "6px" }}>{getPathDescription()}</div>
        </div>
      ) : null}

      {!character ? (
        <NextStepCard
          icon="🎭"
          title="CHOOSE YOUR CLASS"
          text="Pick the class that represents the person you want to become. Your class sets your path, then the real adventure begins."
        />
      ) : remainingDailies > 0 ? (
        <NextStepCard
          icon="📅"
          title="COMPLETE YOUR DAILY GOAL"
          text={`Complete ${remainingDailies} more daily quest${remainingDailies === 1 ? "" : "s"}. Choose a suggested quest or forge one around something that matters to you today.`}
        />
      ) : regionDoneToday ? (
        <NextStepCard
          icon="✅"
          accent="var(--primary)"
          title="TODAY'S CORE LOOP IS COMPLETE"
          text="Your daily goal and today's region quest are done. Explore your progress, rest, or return tomorrow for the next region step."
        />
      ) : (
        <NextStepCard
          icon="🗺️"
          accent="var(--primary)"
          title="ADVANCE YOUR REGION"
          text="Your daily goal is complete. Enter the world and finish today's highlighted region quest to move your story forward."
        />
      )}

      <div className="ff-menu">
        {character ? (
          <>
            <button type="button" className="menu-option" onClick={() => setScreen("world")}>
              <i className="fas fa-play" />
              <span>{remainingDailies === 0 && !regionDoneToday ? "NEXT → CONTINUE ADVENTURE" : "CONTINUE ADVENTURE"}</span>
            </button>
            <button type="button" className="menu-option" onClick={() => setScreen("daily")}>
              <i className="fas fa-calendar-day" />
              <span>
                {remainingDailies > 0 ? "NEXT → " : ""}DAILY QUESTS ({stats.dailyTasksCompleted}/{stats.dailyTasksGoal})
              </span>
            </button>
            <button type="button" className="menu-option" onClick={() => setScreen("characters")}>
              <i className="fas fa-gamepad" />
              <span>CHANGE CLASS</span>
            </button>
            <button type="button" className="menu-option" onClick={() => setScreen("settings")}>
              <i className="fas fa-cog" />
              <span>SETTINGS</span>
            </button>
          </>
        ) : (
          <>
            <button type="button" className="menu-option" onClick={() => setScreen("characters")}>
              <i className="fas fa-gamepad" />
              <span>NEXT → CHOOSE YOUR CLASS</span>
            </button>
            <button type="button" className="menu-option" onClick={() => setScreen("settings")}>
              <i className="fas fa-cog" />
              <span>SETTINGS</span>
            </button>
          </>
        )}
      </div>

      {character && stats.dailyStreak > 0 ? (
        <div style={{ textAlign: "center", color: "var(--warning)", marginTop: "30px" }}>
          🔥 Streak: {stats.dailyStreak} days
        </div>
      ) : null}

      <div
        style={{ position: "absolute", bottom: "20px", width: "100%", textAlign: "center", color: "var(--text-faint)", fontSize: "10px" }}
      >
        © 2026 GOALQUEST
      </div>
    </div>
  );
}
