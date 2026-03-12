import React from "react";

import { useGoalQuestStore } from "../../../stores/goalQuestStore";

export default function AchievementsScreen() {
  const stats = useGoalQuestStore((state) => state.stats);
  const defeatedBosses = useGoalQuestStore((state) => state.defeatedBosses);
  const setScreen = useGoalQuestStore((state) => state.setScreen);
  const getMotivationalMessage = useGoalQuestStore((state) => state.getMotivationalMessage);

  const cards = [
    { label: "Tareas Completadas", value: stats.totalTasksCompleted, color: "var(--primary)" },
    { label: "Dias Completos", value: stats.daysCompleted, color: "var(--warning)" },
    { label: "Racha Actual", value: stats.dailyStreak, color: "var(--info)" },
    { label: "Jefes Derrotados", value: defeatedBosses.length, color: "var(--danger)" }
  ];

  return (
    <div className="game-screen active">
      <button type="button" className="ff-button" onClick={() => setScreen("world")} style={{ marginBottom: "20px" }}>
        ← VOLVER
      </button>

      <h2 style={{ color: "var(--gold)", marginBottom: "20px" }}>LOGROS</h2>
      <p style={{ color: "#aaa", marginBottom: "30px" }}>{getMotivationalMessage()}</p>

      <div className="map-grid">
        {cards.map((card) => (
          <div key={card.label} className="region-tile" style={{ borderColor: card.color }}>
            <div style={{ color: card.color, fontSize: "12px", marginBottom: "10px" }}>{card.label}</div>
            <div style={{ fontSize: "36px", color: card.color }}>{card.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
