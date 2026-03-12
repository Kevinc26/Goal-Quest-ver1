import React from "react";

import type { DailyMission } from "../../../game/types";
import { useGoalQuestStore } from "../../../stores/goalQuestStore";
import { percent } from "../utils";

export default function DailyScreen() {
  const stats = useGoalQuestStore((state) => state.stats);
  const setScreen = useGoalQuestStore((state) => state.setScreen);
  const getAvailableDailyMissions = useGoalQuestStore((state) => state.getAvailableDailyMissions);
  const startDailyTask = useGoalQuestStore((state) => state.startDailyTask);

  const availableMissions = getAvailableDailyMissions();
  const progress = percent(stats.dailyTasksCompleted, stats.dailyTasksGoal);

  return (
    <div className="game-screen active">
      <button type="button" className="ff-button" onClick={() => setScreen("world")} style={{ marginBottom: "20px" }}>
        ← VOLVER
      </button>

      <div className="daily-missions-header">
        <div style={{ fontSize: "50px", color: "var(--warning)" }}>📅</div>
        <div>
          <h2 style={{ color: "var(--warning)" }}>MISIONES DIARIAS</h2>
          <p style={{ color: "#aaa", fontSize: "12px" }}>{availableMissions.length} disponibles hoy</p>
        </div>
      </div>

      <div className="daily-progress-box">
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <div style={{ color: "var(--warning)" }}>PROGRESO</div>
          <div style={{ color: "var(--warning)" }}>
            {stats.dailyTasksCompleted}/{stats.dailyTasksGoal}
          </div>
        </div>
        <div className="daily-progress-bar" style={{ width: "100%" }}>
          <div className="daily-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div style={{ color: "var(--info)", marginTop: "10px", fontSize: "12px" }}>+50 EXP al completar el dia</div>
      </div>

      <h3 style={{ color: "var(--primary)", marginBottom: "20px" }}>MISIONES DE HOY</h3>

      {availableMissions.length > 0 ? (
        <div className="daily-mission-list">
          {availableMissions.map((mission: DailyMission, index: number) => (
            <button
              key={mission.id}
              type="button"
              className="daily-mission-item available"
              onClick={() => startDailyTask(index)}
              style={{ width: "100%", textAlign: "left", color: "white" }}
            >
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  border: `2px solid ${mission.categoryColor}`,
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {mission.type === "timer" ? "⏰" : "📝"}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: "var(--warning)", fontSize: "12px" }}>
                  {mission.text}
                  {mission.type === "timer" ? ` (${mission.time} min)` : ""}
                </div>
                <div style={{ color: mission.categoryColor }}>{mission.category}</div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div style={{ background: "rgba(26,26,46,0.95)", padding: "40px", border: "2px solid var(--primary)" }}>
          <div style={{ fontSize: "60px", color: "var(--primary)" }}>🏆</div>
          <h3 style={{ color: "var(--primary)" }}>TODAS COMPLETADAS</h3>
        </div>
      )}
    </div>
  );
}
