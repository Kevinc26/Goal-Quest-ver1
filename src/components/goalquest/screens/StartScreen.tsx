import React from "react";

import { useGoalQuestStore } from "../../../stores/goalQuestStore";

export default function StartScreen() {
  const character = useGoalQuestStore((state) => state.character);
  const stats = useGoalQuestStore((state) => state.stats);
  const setScreen = useGoalQuestStore((state) => state.setScreen);
  const getPathName = useGoalQuestStore((state) => state.getPathName);
  const getPathDescription = useGoalQuestStore((state) => state.getPathDescription);

  return (
    <div className="game-screen active">
      <h1 className="game-title">GOALQUEST</h1>
      <p style={{ textAlign: "center", color: "var(--warning)", margin: "20px 0" }}>
        RPG de Transformacion Psicologica
      </p>

      {character ? (
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div style={{ fontSize: "40px", color: character.color }}>{character.icon}</div>
          <div style={{ color: character.color, fontSize: "16px", marginTop: "10px" }}>{getPathName()}</div>
          <div style={{ color: "#aaa", fontSize: "12px", marginTop: "5px" }}>{getPathDescription()}</div>
        </div>
      ) : null}

      <div className="ff-menu">
        {character ? (
          <>
            <button type="button" className="menu-option" onClick={() => setScreen("world")}>
              <i className="fas fa-play" />
              <span>CONTINUAR AVENTURA</span>
            </button>
            <button type="button" className="menu-option" onClick={() => setScreen("daily")}>
              <i className="fas fa-calendar-day" />
              <span>
                MISIONES DIARIAS ({stats.dailyTasksCompleted}/{stats.dailyTasksGoal})
              </span>
            </button>
            <button type="button" className="menu-option" onClick={() => setScreen("characters")}>
              <i className="fas fa-gamepad" />
              <span>JUGAR AHORA (cambiar clase)</span>
            </button>
            <button type="button" className="menu-option" onClick={() => setScreen("settings")}>
              <i className="fas fa-cog" />
              <span>CONFIGURACION</span>
            </button>
          </>
        ) : (
          <>
            <button type="button" className="menu-option" onClick={() => setScreen("characters")}>
              <i className="fas fa-gamepad" />
              <span>JUGAR AHORA</span>
            </button>
            <button type="button" className="menu-option" onClick={() => setScreen("settings")}>
              <i className="fas fa-cog" />
              <span>CONFIGURACION</span>
            </button>
          </>
        )}
      </div>

      {character && stats.dailyStreak > 0 ? (
        <div style={{ textAlign: "center", color: "var(--warning)", marginTop: "30px" }}>
          🔥 Racha: {stats.dailyStreak} dias
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
