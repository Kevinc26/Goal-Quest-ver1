import React from "react";

import { regionById } from "../../../game/data";
import { useGoalQuestStore } from "../../../stores/goalQuestStore";

export default function RegionScreen() {
  const currentRegion = useGoalQuestStore((state) => state.currentRegion);
  const completedMissions = useGoalQuestStore((state) => state.completedMissions);
  const setScreen = useGoalQuestStore((state) => state.setScreen);
  const startRegionTask = useGoalQuestStore((state) => state.startRegionTask);
  const getNextAvailableMission = useGoalQuestStore((state) => state.getNextAvailableMission);
  const isBossDefeated = useGoalQuestStore((state) => state.isBossDefeated);
  const isRegionCompleted = useGoalQuestStore((state) => state.isRegionCompleted);
  const startCombat = useGoalQuestStore((state) => state.startCombat);
  const stats = useGoalQuestStore((state) => state.stats);

  const region = currentRegion ? regionById(currentRegion) : null;

  if (!region) {
    return (
      <div className="game-screen active">
        <h2 style={{ color: "var(--warning)" }}>Region no disponible</h2>
        <button type="button" className="ff-button" onClick={() => setScreen("world")}>
          VOLVER AL MAPA
        </button>
      </div>
    );
  }

  const missionFlags = completedMissions[region.id] ?? [];
  const nextMission = getNextAvailableMission(region.id);
  const regionCompleted = isRegionCompleted(region.id);
  const bossDefeated = isBossDefeated(region.id);

  return (
    <div className="game-screen active">
      <button type="button" className="ff-button" onClick={() => setScreen("world")} style={{ marginBottom: "20px" }}>
        ← VOLVER
      </button>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "30px",
          flexWrap: "wrap"
        }}
      >
        <div style={{ fontSize: "50px", color: region.color }}>{region.icon}</div>
        <div>
          <h2 style={{ color: region.color }}>{region.name}</h2>
          <p style={{ color: "#666", fontSize: "12px" }}>Dificultad: {region.boss.difficulty}</p>
          <p style={{ color: "var(--info)", fontSize: "11px", marginTop: "5px" }}>
            {missionFlags.filter(Boolean).length}/7 misiones
          </p>
          {stats.lastRegionMissionDate === new Date().toDateString() ? (
            <p style={{ color: "var(--warning)", fontSize: "11px", marginTop: "5px" }}>
              🌙 Mision de region completada hoy
            </p>
          ) : (
            <p style={{ color: "var(--warning)", fontSize: "11px", marginTop: "5px" }}>
              🔥 Hoy: Dia {nextMission + 1}
            </p>
          )}
        </div>
      </div>

      <h3 style={{ color: "var(--primary)", marginBottom: "20px" }}>MISIONES DE LA SEMANA</h3>

      <div className="mission-list">
        {Array.from({ length: 7 }).map((_, index) => {
          const missionCompleted = Boolean(missionFlags[index]);
          const isNext = index === nextMission;
          const canPlay = stats.lastRegionMissionDate !== new Date().toDateString() && !missionCompleted && isNext;
          let statusText = "";

          if (missionCompleted) {
            statusText = "+25 EXP";
          } else if (canPlay) {
            statusText = "DISPONIBLE";
          } else if (isNext) {
            statusText = "Vuelve manana";
          } else if (index > nextMission) {
            statusText = "Bloqueada";
          }

          return (
            <button
              key={`${region.id}-${index}`}
              type="button"
              className={`mission-item ${missionCompleted ? "completed" : ""} ${canPlay ? "today" : ""}`}
              onClick={() => {
                if (canPlay) {
                  startRegionTask(region.id, index);
                }
              }}
              style={{ width: "100%", textAlign: "left", color: "white" }}
            >
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  border: `2px solid ${region.color}`,
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: missionCompleted ? region.color : "transparent"
                }}
              >
                {missionCompleted ? "✓" : isNext ? "🔥" : region.missionTypes[index] === "timer" ? "⏰" : "📝"}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: missionCompleted ? region.color : canPlay ? "var(--warning)" : "white" }}>
                  Dia {index + 1}: {region.missions[index]}
                </div>
                {statusText ? <div style={{ color: "#aaa", fontSize: "10px" }}>{statusText}</div> : null}
              </div>
            </button>
          );
        })}
      </div>

      {regionCompleted && !bossDefeated ? (
        <div className="button-container" style={{ marginTop: "30px" }}>
          <button
            type="button"
            className="ff-button"
            onClick={() => startCombat(region.id)}
            style={{ background: "var(--danger)" }}
          >
            ⚔️ DESAFIAR A {region.boss.name}
          </button>
        </div>
      ) : null}

      {bossDefeated ? (
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <div
            style={{
              color: "var(--warning)",
              padding: "15px",
              background: "rgba(255,209,102,0.1)",
              borderRadius: "10px",
              border: "2px solid var(--warning)"
            }}
          >
            👑 Jefe derrotado
          </div>
        </div>
      ) : null}
    </div>
  );
}
