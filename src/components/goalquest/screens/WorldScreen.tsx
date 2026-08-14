import React from "react";

import { goalQuestAssets, goalQuestRegions, useGoalQuestStore } from "../../../stores/goalQuestStore";
import { percent, publicAssetPath } from "../utils";
import StatusBar from "../shared/StatusBar";
import NextStepCard from "../shared/NextStepCard";

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
        <NextStepCard
          icon="🎭"
          title="CHOOSE A CLASS FIRST"
          text="Your class defines your path. Choose one before entering the world map."
        >
          <button type="button" className="ff-button" onClick={() => setScreen("characters")} style={{ margin: 0 }}>
            CHOOSE MY CLASS
          </button>
        </NextStepCard>
      </div>
    );
  }

  const progress = percent(stats.dailyTasksCompleted, stats.dailyTasksGoal);
  const dailyRemaining = Math.max(0, stats.dailyTasksGoal - stats.dailyTasksCompleted);
  const regionDoneToday = stats.lastRegionMissionDate === new Date().toDateString();
  const bossReadyRegion = goalQuestRegions.find(
    (region) => isRegionUnlocked(region.id) && isRegionCompleted(region.id) && !isBossDefeated(region.id)
  );
  const recommendedRegion = [...goalQuestRegions]
    .reverse()
    .find((region) => isRegionUnlocked(region.id) && !isRegionCompleted(region.id) && !isBossDefeated(region.id));
  const recommendedMission = recommendedRegion ? getNextAvailableMission(recommendedRegion.id) : -1;

  return (
    <div className="game-screen active">
      <StatusBar />

      <h2 style={{ color: "var(--primary)", margin: "20px 0" }}>{getPathName()}</h2>
      <p style={{ color: "#aaa", marginBottom: "10px", fontSize: "12px" }}>{getPathDescription()}</p>

      {dailyRemaining > 0 ? (
        <NextStepCard
          icon="📅"
          title="COMPLETE YOUR DAILY GOAL"
          text={`Complete ${dailyRemaining} more daily quest${dailyRemaining === 1 ? "" : "s"}. Daily quests build EXP and prepare you to keep advancing your journey.`}
        >
          <button type="button" className="ff-button" onClick={() => setScreen("daily")} style={{ margin: 0 }}>
            NEXT → DAILY QUESTS
          </button>
        </NextStepCard>
      ) : bossReadyRegion ? (
        <NextStepCard
          icon="⚔️"
          accent="var(--danger)"
          title={`BOSS READY: ${bossReadyRegion.boss.name}`}
          text={`You completed all 7 quests in ${bossReadyRegion.name}. Defeat the boss to finish this chapter.`}
        >
          <button
            type="button"
            className="ff-button"
            onClick={() => startCombat(bossReadyRegion.id)}
            style={{ margin: 0, background: "var(--danger)" }}
          >
            ⚔️ CHALLENGE BOSS
          </button>
        </NextStepCard>
      ) : regionDoneToday ? (
        <NextStepCard
          icon="✅"
          accent="var(--primary)"
          title="TODAY'S CORE LOOP IS COMPLETE"
          text="Your daily goal and region quest are complete. Return tomorrow for the next region step, or review achievements and rest."
        />
      ) : recommendedRegion ? (
        <NextStepCard
          icon="🗺️"
          accent={recommendedRegion.color}
          title={`ADVANCE ${recommendedRegion.name}`}
          text={
            recommendedMission >= 0
              ? `Enter the region and complete Day ${recommendedMission + 1}. You can advance one region quest per day.`
              : "Enter the region to continue your adventure."
          }
        >
          <button
            type="button"
            className="ff-button"
            onClick={() => enterRegion(recommendedRegion.id)}
            style={{ margin: 0 }}
          >
            NEXT → ENTER REGION
          </button>
        </NextStepCard>
      ) : (
        <NextStepCard
          icon="👑"
          accent="var(--gold)"
          title="YOUR CURRENT JOURNEY IS COMPLETE"
          text="You have cleared every available region. Review your achievements and keep your daily streak alive."
        />
      )}

      <div className="daily-progress-container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
          <div>
            <div style={{ color: "var(--warning)", fontSize: "14px" }}>DAILY QUEST PROGRESS</div>
            <div style={{ color: "#aaa", fontSize: "10px" }}>
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

      <p style={{ color: "#aaa", marginBottom: "30px" }}>Region rule: complete one quest per day. Finish all 7 to unlock that region's boss.</p>

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
                    src={publicAssetPath(goalQuestAssets.acts[region.id])}
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
                    <div style={{ fontSize: "10px", color: "#aaa", marginTop: "5px" }}>{regionProgress}/7 quests</div>
                    {!completed && nextMission !== -1 ? (
                      <div style={{ fontSize: "9px", color: "var(--warning)", marginTop: "5px" }}>🔥 Next: Day {nextMission + 1}</div>
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
                  <div style={{ fontSize: "10px", color: "#aaa" }}>Complete the previous region</div>
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
