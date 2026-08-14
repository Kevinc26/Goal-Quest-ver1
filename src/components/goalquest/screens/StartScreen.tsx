import React from "react";

import { goalQuestAssets, useGoalQuestStore } from "../../../stores/goalQuestStore";
import { publicAssetPath } from "../utils";

export default function StartScreen() {
  const character = useGoalQuestStore((state) => state.character);
  const stats = useGoalQuestStore((state) => state.stats);
  const setScreen = useGoalQuestStore((state) => state.setScreen);
  const getPathName = useGoalQuestStore((state) => state.getPathName);
  const getPathDescription = useGoalQuestStore((state) => state.getPathDescription);
  const characterImageSrc = character ? publicAssetPath(goalQuestAssets.classes[character.id]) : "";

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
          <div style={{ color: "#aaa", fontSize: "12px", marginTop: "5px" }}>{getPathDescription()}</div>
        </div>
      ) : null}

      <div className="ff-menu">
        {character ? (
          <>
            <button type="button" className="menu-option" onClick={() => setScreen("world")}>
              <i className="fas fa-play" />
              <span>CONTINUE ADVENTURE</span>
            </button>
            <button type="button" className="menu-option" onClick={() => setScreen("daily")}>
              <i className="fas fa-calendar-day" />
              <span>
                DAILY MISSIONS ({stats.dailyTasksCompleted}/{stats.dailyTasksGoal})
              </span>
            </button>
            <button type="button" className="menu-option" onClick={() => setScreen("characters")}>
              <i className="fas fa-gamepad" />
              <span>PLAY NOW (change class)</span>
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
              <span>PLAY NOW</span>
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
        style={{ position: "absolute", bottom: "20px", width: "100%", textAlign: "center", color: "#666", fontSize: "10px" }}
      >
        © 2026 GOALQUEST
      </div>
    </div>
  );
}
