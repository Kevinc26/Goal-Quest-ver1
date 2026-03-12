import React from "react";

import { useGoalQuestStore } from "../../../stores/goalQuestStore";

export default function SettingsScreen() {
  const stats = useGoalQuestStore((state) => state.stats);
  const setScreen = useGoalQuestStore((state) => state.setScreen);
  const changeDailyGoal = useGoalQuestStore((state) => state.changeDailyGoal);
  const resetGame = useGoalQuestStore((state) => state.resetGame);

  return (
    <div className="game-screen active">
      <button type="button" className="ff-button" onClick={() => setScreen("start")} style={{ marginBottom: "20px" }}>
        ← VOLVER
      </button>

      <h2 style={{ color: "var(--primary)", margin: "30px 0" }}>CONFIGURACION</h2>

      <div className="ff-menu">
        <div style={{ margin: "20px 0" }}>
          <div style={{ color: "var(--primary)" }}>TAREAS DIARIAS ({stats.dailyTasksGoal})</div>
          <input
            type="range"
            min={3}
            max={10}
            value={stats.dailyTasksGoal}
            onChange={(event) => changeDailyGoal(Number(event.target.value))}
            style={{ width: "100%" }}
          />
        </div>

        <button type="button" className="ff-button" onClick={resetGame} style={{ width: "100%", background: "var(--danger)" }}>
          🔄 REINICIAR
        </button>
      </div>
    </div>
  );
}
