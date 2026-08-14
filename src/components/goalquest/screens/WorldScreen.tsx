import React from "react";

import { goalQuestAssets, goalQuestRegions, useGoalQuestStore } from "../../../stores/goalQuestStore";
import { percent, publicAssetPath } from "../utils";
import StatusBar from "../shared/StatusBar";

const readableAccent = (color: string) => `color-mix(in srgb, ${color} 72%, white)`;

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
        <div style={{ textAlign: "center", maxWidth: "560px", margin: "40px auto" }}>
          <div style={{ fontSize: "56px", marginBottom: "20px" }}>🎭</div>
          <h2 style={{ color: "var(--primary)", marginBottom: "16px" }}>CHOOSE A CLASS FIRST</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "11px", lineHeight: 1.7, marginBottom: "24px" }}>
            Your class defines your path. Choose one before entering the world map.
          </p>
          <button type="button" className="ff-button" onClick={() => setScreen("characters")}>
            CHOOSE MY CLASS
          </button>
        </div>
      </div>
    );
  }

  const progress = percent(stats.dailyTasksCompleted, stats.dailyTasksGoal);
  const dailyRemaining = Math.max(0, stats.dailyTasksGoal - stats.dailyTasksCompleted);

  return (
    <div className="game-screen active">
      <StatusBar />

      <h2 style={{ color: "var(--primary)", margin: "20px 0" }}>{getPathName()}</h2>
      <p style={{ color: "var(--text-muted)", marginBottom: "10px", fontSize: "12px", lineHeight: 1.65 }}>{getPathDescription()}</p>

      <div className="daily-progress-container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px", gap: "12px" }}>
          <div>
            <div style={{ color: "var(--warning)", fontSize: "14px" }}>DAILY QUEST PROGRESS</div>
            <div style={{ color: "var(--text-muted)", fontSize: "10px", lineHeight: 1.5, marginTop: "4px" }}>
              {dailyRemaining <= 0 ? "Completed" : `${dailyRemaining} remaining`}
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
            📅 DAILY QUESTS
          </button>
          <button
            type="button"
            className="ff-button"
            onClick={() => setScreen("achievements")}
            style={{ padding: "10px 20px", fontSize: "12px", background: "var(--gold)" }}
          >
            🏆 ACHIEVEMENTS
          </button>
        </div>
      </div>

      <p style={{ color: "var(--text-muted)", fontSize: "11px", lineHeight: 1.7, marginBottom: "30px" }}>
        Region rule: complete one quest per day. Finish all 7 to unlock that region's boss.
      </p>

      <div className="map-grid">
        {goalQuestRegions.map((region) => {
          const unlocked = isRegionUnlocked(region.id);
          const regionProgress = (completedMissions[region.id] ?? []).filter(Boolean).length;
          const completed = isRegionCompleted(region.id);
          const bossDefeated = isBossDefeated(region.id);
          const nextMission = getNextAvailableMission(region.id);
          const regionTextAccent = readableAccent(region.color);

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
                <div style={{ width: "100%", aspectRatio: "16/9", borderRadius: "12px", overflow: "hidden", marginBottom: "10px", background: "rgba(0,0,0,0.35)" }}>
                  <img
                    src={publicAssetPath(goalQuestAssets.acts[region.id])}
                    alt={region.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", imageRendering: "pixelated" }}
                  />
                </div>
                <h4 style={{ color: regionTextAccent, lineHeight: 1.5 }}>{region.name}</h4>
              </div>

              {unlocked ? (
                <>
                  <div style={{ margin: "15px 0" }}>
                    <div style={{ background: "rgba(0,0,0,0.45)", borderRadius: "5px", height: "8px" }}>
                      <div
                        style={{
                          height: "100%",
                          background: region.color,
                          borderRadius: "5px",
                          width: `${(regionProgress / 7) * 100}%`
                        }}
                      />
                    </div>
                    <div style={{ fontSize: "10px", color: "var(--text-muted)", marginTop: "6px" }}>{regionProgress}/7 quests</div>
                    {!completed && nextMission !== -1 ? (
                      <div style={{ fontSize: "9px", color: "var(--warning)", lineHeight: 1.45, marginTop: "6px" }}>🔥 Next: Day {nextMission + 1}</div>
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
                      ⚔️ BOSS READY
                    </button>
                  ) : null}

                  {bossDefeated ? <div style={{ color: "var(--warning)", fontSize: "12px", marginTop: "10px" }}>👑 Region cleared</div> : null}
                </>
              ) : (
                <>
                  <div style={{ fontSize: "30px", margin: "10px 0" }}>🔒</div>
                  <div style={{ fontSize: "10px", color: "var(--text-muted)", lineHeight: 1.5 }}>Complete the previous region</div>
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="button-container">
        <button type="button" className="ff-button" onClick={() => setScreen("daily")}>
          📅 DAILY QUESTS
        </button>
        <button type="button" className="ff-button" onClick={() => setScreen("rest")}>
          🔥 REST
        </button>
        <button type="button" className="ff-button" onClick={() => setScreen("start")}>
          🏠 MENU
        </button>
      </div>
    </div>
  );
}
