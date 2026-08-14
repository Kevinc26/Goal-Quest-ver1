import React from "react";

import { regionById } from "../../../game/data";
import { useGoalQuestStore } from "../../../stores/goalQuestStore";
import NextStepCard from "../shared/NextStepCard";

const readableAccent = (color: string) => `color-mix(in srgb, ${color} 72%, white)`;

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
        <NextStepCard icon="🗺️" title="REGION UNAVAILABLE" text="Return to the world map and choose an unlocked region.">
          <button type="button" className="ff-button" onClick={() => setScreen("world")} style={{ margin: 0 }}>
            BACK TO MAP
          </button>
        </NextStepCard>
      </div>
    );
  }

  const today = new Date().toDateString();
  const missionFlags = completedMissions[region.id] ?? [];
  const nextMission = getNextAvailableMission(region.id);
  const regionCompleted = isRegionCompleted(region.id);
  const bossDefeated = isBossDefeated(region.id);
  const regionDoneToday = stats.lastRegionMissionDate === today;
  const regionTextAccent = readableAccent(region.color);

  return (
    <div className="game-screen active">
      <button type="button" className="ff-button" onClick={() => setScreen("world")} style={{ marginBottom: "20px" }}>
        ← BACK
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
          <h2 style={{ color: regionTextAccent }}>{region.name}</h2>
          <p style={{ color: "var(--text-faint)", fontSize: "12px", lineHeight: 1.55 }}>Difficulty: {region.boss.difficulty}</p>
          <p style={{ color: "var(--info)", fontSize: "11px", marginTop: "5px" }}>
            {missionFlags.filter(Boolean).length}/7 quests
          </p>
        </div>
      </div>

      {bossDefeated ? (
        <NextStepCard
          icon="👑"
          accent="var(--gold)"
          title="REGION COMPLETE"
          text="The boss has been defeated. Return to the world map and continue into the next unlocked region."
        >
          <button type="button" className="ff-button" onClick={() => setScreen("world")} style={{ margin: 0 }}>
            CONTINUE JOURNEY
          </button>
        </NextStepCard>
      ) : regionCompleted ? (
        <NextStepCard
          icon="⚔️"
          accent="var(--danger)"
          title={`BOSS READY: ${region.boss.name}`}
          text="All 7 region quests are complete. Your next step is to defeat the boss and close this chapter."
        >
          <button
            type="button"
            className="ff-button"
            onClick={() => startCombat(region.id)}
            style={{ margin: 0, background: "var(--danger)" }}
          >
            ⚔️ CHALLENGE BOSS
          </button>
        </NextStepCard>
      ) : regionDoneToday ? (
        <NextStepCard
          icon="🌙"
          accent="var(--primary)"
          title="TODAY'S REGION QUEST IS COMPLETE"
          text={`You advanced ${region.name} today. Region progression is limited to one quest per day, so return tomorrow for Day ${Math.min(7, nextMission + 1)}.`}
        />
      ) : nextMission >= 0 ? (
        <NextStepCard
          icon="🔥"
          accent={region.color}
          title={`COMPLETE DAY ${nextMission + 1}`}
          text={`${region.missions[nextMission]} — select the highlighted quest below to advance this region today.`}
        />
      ) : null}

      <h3 style={{ color: "var(--primary)", marginBottom: "8px" }}>7-DAY QUEST PATH</h3>
      <p style={{ color: "var(--text-muted)", fontSize: "10px", lineHeight: 1.7, marginBottom: "20px" }}>
        Complete one highlighted region quest per day. Finish all 7 quests to unlock the boss.
      </p>

      <div className="mission-list">
        {Array.from({ length: 7 }).map((_, index) => {
          const missionCompleted = Boolean(missionFlags[index]);
          const isNext = index === nextMission;
          const canPlay = !regionDoneToday && !missionCompleted && isNext;
          let statusText = "";

          if (missionCompleted) {
            statusText = "QUEST COMPLETE • +25 EXP";
          } else if (canPlay) {
            statusText = "DO THIS QUEST TODAY • +25 EXP";
          } else if (isNext) {
            statusText = "NEXT QUEST • COME BACK TOMORROW";
          } else if (index > nextMission) {
            statusText = "LOCKED • COMPLETE PREVIOUS QUEST";
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
                {missionCompleted ? "✓" : canPlay ? "🔥" : region.missionTypes[index] === "timer" ? "⏰" : "📝"}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: missionCompleted ? regionTextAccent : canPlay ? "var(--warning)" : "white", lineHeight: 1.55 }}>
                  Day {index + 1}: {region.missions[index]}
                </div>
                {statusText ? <div style={{ color: "var(--text-muted)", fontSize: "10px", lineHeight: 1.5, marginTop: "5px" }}>{statusText}</div> : null}
              </div>
            </button>
          );
        })}
      </div>

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
            👑 Boss defeated
          </div>
        </div>
      ) : null}
    </div>
  );
}
