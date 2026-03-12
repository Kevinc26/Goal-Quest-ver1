import React from "react";

import { goalQuestAssets, goalQuestRegions, useGoalQuestStore } from "../../../stores/goalQuestStore";
import { percent } from "../utils";
import StatusBar from "../shared/StatusBar";

export default function WorldScreen() {
  const character = useGoalQuestStore((state) => state.character);
  const stats = useGoalQuestStore((state) => state.stats);
  const completedMissions = useGoalQuestStore((state) => state.completedMissions);
  const setScreen = useGoalQuestStore((state) => state.setScreen);
  const enterRegion = useGoalQuestStore((state) => state.enterRegion);
  const startCombat = useGoalQuestStore((state) => state.startCombat);
  const getPathName = useGoalQuestStore((state) => state.getPathName);
  const getPathDescription = useGoalQuestStore((state) => state.getPathDescription);
  const isRegionUnlocked = useGoalQuestStore((state) => state.isRegionUnlocked);
  const isRegionCompleted = useGoalQuestStore((state) => state.isRegionCompleted);
  const isBossDefeated = useGoalQuestStore((state) => state.isBossDefeated);
  const getNextAvailableMission = useGoalQuestStore((state) => state.getNextAvailableMission);

  if (!character) {
    return (
      <div className="game-screen active">
        <h2 style={{ color: "var(--warning)" }}>Primero elige un personaje</h2>
        <div className="button-container">
          <button type="button" className="ff-button" onClick={() => setScreen("characters")}>
            IR A PERSONAJES
          </button>
        </div>
      </div>
    );
  }

  const progress = percent(stats.dailyTasksCompleted, stats.dailyTasksGoal);

  return (
    <div className="game-screen active">
      <StatusBar />

      <h2 style={{ color: "var(--primary)", margin: "20px 0" }}>{getPathName()}</h2>
      <p style={{ color: "#aaa", marginBottom: "10px", fontSize: "12px" }}>{getPathDescription()}</p>

      <div className="daily-progress-container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
          <div>
            <div style={{ color: "var(--warning)", fontSize: "14px" }}>PROGRESO DIARIO</div>
            <div style={{ color: "#aaa", fontSize: "10px" }}>
              {stats.dailyTasksGoal - stats.dailyTasksCompleted <= 0
                ? "Completado"
                : `${stats.dailyTasksGoal - stats.dailyTasksCompleted} restantes`}
            </div>
          </div>
          <div style={{ color: "var(--warning)", fontSize: "16px" }}>
            {stats.dailyTasksCompleted}/{stats.dailyTasksGoal}
          </div>
        </div>

        <div className="daily-progress-bar" style={{ width: "100%" }}>
          <div className="daily-progress-fill" style={{ width: `${progress}%` }}>
            <div className="daily-progress-text">{Math.round(progress)}%</div>
          </div>
        </div>

        <div className="button-container">
          <button type="button" className="ff-button" onClick={() => setScreen("daily")} style={{ padding: "10px 20px", fontSize: "12px" }}>
            📅 DIARIAS
          </button>
          <button
            type="button"
            className="ff-button"
            onClick={() => setScreen("achievements")}
            style={{ padding: "10px 20px", fontSize: "12px", background: "var(--gold)" }}
          >
            🏆 LOGROS
          </button>
        </div>
      </div>

      <p style={{ color: "#aaa", marginBottom: "30px" }}>7 misiones por region para desbloquear al jefe</p>

      <div className="map-grid">
        {goalQuestRegions.map((region) => {
          const unlocked = isRegionUnlocked(region.id);
          const regionProgress = (completedMissions[region.id] ?? []).filter(Boolean).length;
          const completed = isRegionCompleted(region.id);
          const bossDefeated = isBossDefeated(region.id);
          const nextMission = getNextAvailableMission(region.id);

          return (
            <div
              key={region.id}
              className={`region-tile ${unlocked ? "" : "locked"}`}
              onClick={() => {
                if (unlocked) {
                  enterRegion(region.id);
                }
              }}
              aria-hidden="true"
            >
              <div>
                <div style={{ width: "100%", aspectRatio: "16/9", borderRadius: "12px", overflow: "hidden", marginBottom: "10px" }}>
                  <img
                    src={goalQuestAssets.acts[region.id]}
                    alt={region.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", imageRendering: "pixelated" }}
                  />
                </div>
                <h4 style={{ color: region.color }}>{region.name}</h4>
              </div>

              {unlocked ? (
                <>
                  <div style={{ margin: "15px 0" }}>
                    <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: "5px", height: "8px" }}>
                      <div
                        style={{
                          height: "100%",
                          background: region.color,
                          borderRadius: "5px",
                          width: `${(regionProgress / 7) * 100}%`
                        }}
                      />
                    </div>
                    <div style={{ fontSize: "10px", color: "#aaa", marginTop: "5px" }}>{regionProgress}/7 misiones</div>
                    {!completed && nextMission !== -1 ? (
                      <div style={{ fontSize: "9px", color: "var(--warning)", marginTop: "5px" }}>🔥 Hoy: Dia {nextMission + 1}</div>
                    ) : null}
                  </div>

                  {completed && !bossDefeated ? (
                    <button
                      type="button"
                      className="ff-button"
                      onClick={(event) => {
                        event.stopPropagation();
                        startCombat(region.id);
                      }}
                      style={{ padding: "8px 15px", fontSize: "11px", background: "var(--danger)", margin: "5px 0" }}
                    >
                      ⚔️ JEFE
                    </button>
                  ) : null}

                  {bossDefeated ? <div style={{ color: "var(--warning)", fontSize: "12px", marginTop: "10px" }}>👑 Derrotado</div> : null}
                </>
              ) : (
                <>
                  <div style={{ fontSize: "30px", margin: "10px 0" }}>🔒</div>
                  <div style={{ fontSize: "10px", color: "#aaa" }}>Completa region anterior</div>
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="button-container">
        <button type="button" className="ff-button" onClick={() => setScreen("daily")}>
          📅 DIARIAS
        </button>
        <button type="button" className="ff-button" onClick={() => setScreen("rest")}>
          🔥 DESCANSAR
        </button>
        <button type="button" className="ff-button" onClick={() => setScreen("start")}>
          🏠 MENU
        </button>
      </div>
    </div>
  );
}
