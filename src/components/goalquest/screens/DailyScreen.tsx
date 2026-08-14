import React, { useState } from "react";

import type { CurrentTask, DailyMission, MissionType } from "../../../game/types";
import { useGoalQuestStore } from "../../../stores/goalQuestStore";
import { percent } from "../utils";
import NextStepCard from "../shared/NextStepCard";

type CustomQuestMode = Extract<MissionType, "check" | "timer">;

const createQuestId = () =>
  globalThis.crypto?.randomUUID?.() ?? Date.now().toString() + "-" + Math.random().toString(36).slice(2, 8);

const fieldStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(0, 0, 0, 0.36)",
  border: "2px solid var(--primary)",
  borderRadius: "10px",
  padding: "14px",
  color: "white",
  fontFamily: "'Press Start 2P', cursive",
  fontSize: "10px",
  lineHeight: 1.5,
  outline: "none"
};

export default function DailyScreen() {
  const stats = useGoalQuestStore((state) => state.stats);
  const todayCompleted = useGoalQuestStore((state) => state.todayCompleted);
  const setScreen = useGoalQuestStore((state) => state.setScreen);
  const getAvailableDailyMissions = useGoalQuestStore((state) => state.getAvailableDailyMissions);
  const startDailyTask = useGoalQuestStore((state) => state.startDailyTask);

  const [forgeOpen, setForgeOpen] = useState(false);
  const [customQuestText, setCustomQuestText] = useState("");
  const [customQuestMode, setCustomQuestMode] = useState<CustomQuestMode>("check");
  const [customQuestMinutes, setCustomQuestMinutes] = useState(10);

  const availableMissions = getAvailableDailyMissions();
  const progress = percent(stats.dailyTasksCompleted, stats.dailyTasksGoal);
  const remaining = Math.max(0, stats.dailyTasksGoal - stats.dailyTasksCompleted);
  const cleanQuestText = customQuestText.trim().replace(/\s+/g, " ");
  const canForgeQuest = cleanQuestText.length >= 3 && !todayCompleted;

  const resetForge = () => {
    setCustomQuestText("");
    setCustomQuestMode("check");
    setCustomQuestMinutes(10);
    setForgeOpen(false);
  };

  const forgeCustomQuest = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canForgeQuest) {
      return;
    }

    const currentState = useGoalQuestStore.getState();
    if (currentState.todayCompleted) {
      return;
    }

    const safeMinutes = Math.min(120, Math.max(1, Math.floor(customQuestMinutes || 10)));
    const initialSeconds = customQuestMode === "timer" ? safeMinutes * 60 : 0;
    const questId = createQuestId();

    const customTask: CurrentTask = {
      id: questId,
      type: "daily",
      missionId: `custom-${questId}`,
      missionText: cleanQuestText,
      missionType: customQuestMode,
      userInput: "",
      initialSeconds,
      secondsLeft: initialSeconds
    };

    useGoalQuestStore.setState({
      currentTask: customTask,
      taskTimerPaused: false
    });

    resetForge();
  };

  return (
    <div className="game-screen active">
      <button type="button" className="ff-button" onClick={() => setScreen("world")} style={{ marginBottom: "20px" }}>
        ← BACK
      </button>

      <div className="daily-missions-header">
        <div style={{ fontSize: "50px", color: "var(--warning)" }}>📅</div>
        <div>
          <h2 style={{ color: "var(--warning)" }}>DAILY QUESTS</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "12px" }}>{availableMissions.length} suggested quests available today</p>
        </div>
      </div>

      <div className="daily-progress-box">
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <div style={{ color: "var(--warning)" }}>QUEST GOAL</div>
          <div style={{ color: "var(--warning)" }}>
            {stats.dailyTasksCompleted}/{stats.dailyTasksGoal}
          </div>
        </div>
        <div className="daily-progress-bar" style={{ width: "100%" }}>
          <div className="daily-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div style={{ color: "var(--info)", marginTop: "10px", fontSize: "12px", lineHeight: 1.55 }}>+50 EXP bonus for completing the daily quest goal</div>
      </div>

      {todayCompleted ? (
        <NextStepCard
          icon="🏆"
          accent="var(--primary)"
          title="DAILY QUEST GOAL COMPLETE"
          text="You earned today's completion bonus. Your next step is to return to the world map and advance your region quest."
        >
          <button type="button" className="ff-button" onClick={() => setScreen("world")} style={{ margin: 0 }}>
            NEXT → WORLD MAP
          </button>
        </NextStepCard>
      ) : (
        <NextStepCard
          icon="🎯"
          title={`COMPLETE ${remaining} MORE QUEST${remaining === 1 ? "" : "S"}`}
          text="Pick any Suggested Quest below or Forge Your Own Quest. Every completed daily quest gives 25 EXP and moves this progress bar forward."
        />
      )}

      <section
        style={{
          width: "100%",
          maxWidth: "800px",
          margin: "0 auto 30px",
          padding: "20px",
          border: "2px solid var(--primary)",
          borderRadius: "15px",
          background: "rgba(10, 10, 24, 0.78)",
          boxShadow: "0 0 20px rgba(77, 255, 145, 0.08)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "15px", flexWrap: "wrap" }}>
          <div style={{ fontSize: "34px" }}>⚒️</div>
          <div style={{ flex: "1 1 320px", textAlign: "left" }}>
            <h3 style={{ color: "var(--primary)", fontSize: "14px", marginBottom: "8px", textAlign: "left" }}>
              FORGE YOUR OWN QUEST
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "10px", lineHeight: 1.75, textAlign: "left" }}>
              Create a quest around what actually matters to you today. It counts exactly like a suggested daily quest.
            </p>
          </div>

          {!forgeOpen ? (
            <button
              type="button"
              className="ff-button"
              onClick={() => setForgeOpen(true)}
              disabled={todayCompleted}
              style={todayCompleted ? { opacity: 0.68, cursor: "not-allowed" } : undefined}
            >
              {todayCompleted ? "QUEST GOAL COMPLETE" : "⚒️ FORGE QUEST"}
            </button>
          ) : null}
        </div>

        {forgeOpen ? (
          <form onSubmit={forgeCustomQuest} style={{ marginTop: "22px", borderTop: "1px solid rgba(255,255,255,0.18)", paddingTop: "20px" }}>
            <label style={{ display: "block", color: "var(--warning)", fontSize: "10px", marginBottom: "10px", textAlign: "left" }}>
              WHAT WILL YOU DO?
            </label>
            <input
              type="text"
              value={customQuestText}
              onChange={(event) => setCustomQuestText(event.target.value)}
              placeholder="e.g. Read 20 pages"
              maxLength={100}
              autoFocus
              style={fieldStyle}
            />
            <div style={{ color: "var(--text-faint)", fontSize: "9px", marginTop: "8px", textAlign: "right" }}>
              {customQuestText.length}/100
            </div>

            <div style={{ marginTop: "20px" }}>
              <div style={{ color: "var(--warning)", fontSize: "10px", marginBottom: "10px", textAlign: "left" }}>QUEST TYPE</div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button
                  type="button"
                  className="ff-button"
                  onClick={() => setCustomQuestMode("check")}
                  style={{
                    flex: "1 1 220px",
                    background: customQuestMode === "check" ? "var(--primary)" : "#39394f",
                    color: customQuestMode === "check" ? "#111" : "#f2f2f5",
                    borderBottomColor: customQuestMode === "check" ? "#2a8c5e" : "#242436"
                  }}
                >
                  ✅ CHECK OFF
                </button>
                <button
                  type="button"
                  className="ff-button"
                  onClick={() => setCustomQuestMode("timer")}
                  style={{
                    flex: "1 1 220px",
                    background: customQuestMode === "timer" ? "var(--warning)" : "#39394f",
                    color: customQuestMode === "timer" ? "#111" : "#f2f2f5",
                    borderBottomColor: customQuestMode === "timer" ? "#b8862c" : "#242436"
                  }}
                >
                  ⏰ TIMER
                </button>
              </div>
            </div>

            {customQuestMode === "timer" ? (
              <div style={{ marginTop: "20px" }}>
                <label style={{ display: "block", color: "var(--warning)", fontSize: "10px", marginBottom: "10px", textAlign: "left" }}>
                  MINUTES
                </label>
                <input
                  type="number"
                  min={1}
                  max={120}
                  value={customQuestMinutes}
                  onChange={(event) => setCustomQuestMinutes(Number(event.target.value))}
                  style={fieldStyle}
                />
              </div>
            ) : null}

            <p style={{ color: "var(--text-subtle)", fontSize: "10px", lineHeight: 1.75, margin: "18px 0 5px" }}>
              Custom quests count toward today's quest goal and award the same 25 EXP as a suggested daily quest.
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap", marginTop: "15px" }}>
              <button
                type="submit"
                className="ff-button"
                disabled={!canForgeQuest}
                style={!canForgeQuest ? { opacity: 0.68, cursor: "not-allowed", boxShadow: "none" } : undefined}
              >
                ⚒️ START QUEST
              </button>
              <button type="button" className="ff-button" onClick={resetForge} style={{ background: "#555568", color: "white", borderBottomColor: "#343444" }}>
                CANCEL
              </button>
            </div>
          </form>
        ) : null}
      </section>

      <h3 style={{ color: "var(--primary)", marginBottom: "8px" }}>SUGGESTED QUESTS</h3>
      <p style={{ color: "var(--text-muted)", fontSize: "10px", marginBottom: "20px" }}>Select any quest below to start it immediately.</p>

      {availableMissions.length > 0 ? (
        <div className="daily-mission-list">
          {availableMissions.map((mission: DailyMission, index: number) => (
            <button
              key={mission.id}
              type="button"
              className="daily-mission-item available"
              onClick={() => startDailyTask(index)}
              disabled={todayCompleted}
              style={{ width: "100%", textAlign: "left", color: "white", ...(todayCompleted ? { opacity: 0.68, cursor: "not-allowed" } : {}) }}
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
                <div style={{ color: "var(--warning)", fontSize: "12px", lineHeight: 1.6 }}>
                  {mission.text}
                  {mission.type === "timer" ? ` (${mission.time} min)` : ""}
                </div>
                <div style={{ color: mission.categoryColor, marginTop: "4px" }}>{mission.category}</div>
                <div style={{ color: "var(--text-faint)", fontSize: "9px", lineHeight: 1.45, marginTop: "6px" }}>SELECT TO START • +25 EXP</div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div style={{ background: "rgba(26,26,46,0.95)", padding: "40px", border: "2px solid var(--primary)" }}>
          <div style={{ fontSize: "60px", color: "var(--primary)" }}>🏆</div>
          <h3 style={{ color: "var(--primary)" }}>ALL QUESTS COMPLETE</h3>
        </div>
      )}
    </div>
  );
}
