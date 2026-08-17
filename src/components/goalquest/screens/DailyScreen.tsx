import React, { useEffect, useState } from "react";

import { getJourneyMode, subscribeJourneyMode, type JourneyMode } from "../../../game/journeyMode";
import type { CurrentTask, DailyMission, MissionType } from "../../../game/types";
import { useGoalQuestStore } from "../../../stores/goalQuestStore";
import { percent } from "../utils";

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

  const [journeyMode, setJourneyModeState] = useState<JourneyMode | null>(() => getJourneyMode());
  const [forgeOpen, setForgeOpen] = useState(() => getJourneyMode() === "custom");
  const [customQuestText, setCustomQuestText] = useState("");
  const [customQuestMode, setCustomQuestMode] = useState<CustomQuestMode>("check");
  const [customQuestMinutes, setCustomQuestMinutes] = useState(10);

  useEffect(() => subscribeJourneyMode(setJourneyModeState), []);
  useEffect(() => {
    if (journeyMode === "custom") {
      setForgeOpen(true);
    }
  }, [journeyMode]);

  const availableMissions = getAvailableDailyMissions();
  const progress = percent(stats.dailyTasksCompleted, stats.dailyTasksGoal);
  const cleanQuestText = customQuestText.trim().replace(/\s+/g, " ");
  const canForgeQuest = cleanQuestText.length >= 3 && !todayCompleted;
  const customOnly = journeyMode === "custom";
  const isHybrid = journeyMode === "hybrid";

  const resetForge = () => {
    setCustomQuestText("");
    setCustomQuestMode("check");
    setCustomQuestMinutes(10);
    setForgeOpen(customOnly);
  };

  const goBack = () => {
    setScreen(journeyMode === "adventure" ? "world" : "start");
  };

  const forgeCustomQuest = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canForgeQuest) return;
    const currentState = useGoalQuestStore.getState();
    if (currentState.todayCompleted) return;

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

    useGoalQuestStore.setState({ currentTask: customTask, taskTimerPaused: false });
    resetForge();
  };

  return (
    <div className="game-screen active">
      <button type="button" className="ff-button" onClick={goBack} style={{ marginBottom: "20px" }}>← BACK</button>

      <div className="daily-missions-header">
        <div style={{ fontSize: "50px", color: "var(--warning)" }}>{customOnly ? "⚒️" : "📅"}</div>
        <div>
          <h2 style={{ color: "var(--warning)" }}>{customOnly ? "MY QUESTS" : isHybrid ? "PERSONAL QUESTS" : "DAILY QUESTS"}</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "12px" }}>
            {customOnly
              ? "Turn your real-life goals into quests and grow your hero."
              : "Create your own quests or choose a suggested challenge."}
          </p>
        </div>
      </div>

      <div className="daily-progress-box">
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <div style={{ color: "var(--warning)" }}>QUEST GOAL</div>
          <div style={{ color: "var(--warning)" }}>{stats.dailyTasksCompleted}/{stats.dailyTasksGoal}</div>
        </div>
        <div className="daily-progress-bar" style={{ width: "100%" }}><div className="daily-progress-fill" style={{ width: `${progress}%` }} /></div>
        <div style={{ color: "var(--info)", marginTop: "10px", fontSize: "12px", lineHeight: 1.55 }}>Every quest gives +25 EXP • Complete your daily goal for +50 bonus EXP</div>
      </div>

      <section style={{ width: "100%", maxWidth: "800px", margin: "0 auto 30px", padding: "22px", border: "2px solid var(--primary)", borderRadius: "15px", background: "linear-gradient(180deg, rgba(13,31,40,.92), rgba(10,10,24,.84))", boxShadow: "0 0 28px rgba(77, 255, 145, 0.12)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "15px", flexWrap: "wrap" }}>
          <div style={{ fontSize: "40px" }}>⚒️</div>
          <div style={{ flex: "1 1 320px", textAlign: "left" }}>
            <div style={{ color: "var(--warning)", fontSize: "8px", marginBottom: "7px" }}>YOUR LIFE → YOUR ADVENTURE</div>
            <h3 style={{ color: "var(--primary)", fontSize: "15px", marginBottom: "8px", textAlign: "left" }}>CREATE YOUR OWN QUEST</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "10px", lineHeight: 1.75, textAlign: "left" }}>Write something you genuinely want to accomplish. Completing it rewards the same hero that travels through GoalQuest.</p>
          </div>
          {!forgeOpen ? (
            <button type="button" className="ff-button" onClick={() => setForgeOpen(true)} disabled={todayCompleted} style={todayCompleted ? { opacity: 0.68, cursor: "not-allowed" } : undefined}>
              {todayCompleted ? "QUEST GOAL COMPLETE" : "⚒️ CREATE QUEST"}
            </button>
          ) : null}
        </div>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "16px" }}>
          <span style={{ border: "1px solid rgba(77,255,145,.35)", borderRadius: "999px", padding: "7px 9px", color: "#baf7d2", fontSize: "8px" }}>+25 EXP</span>
          <span style={{ border: "1px solid rgba(255,209,102,.35)", borderRadius: "999px", padding: "7px 9px", color: "#ffe39a", fontSize: "8px" }}>LEVEL PROGRESS</span>
          <span style={{ border: "1px solid rgba(70,199,232,.35)", borderRadius: "999px", padding: "7px 9px", color: "#9ae9ff", fontSize: "8px" }}>GEAR UNLOCKS</span>
        </div>

        {forgeOpen ? (
          <form onSubmit={forgeCustomQuest} style={{ marginTop: "22px", borderTop: "1px solid rgba(255,255,255,0.18)", paddingTop: "20px" }}>
            <label style={{ display: "block", color: "var(--warning)", fontSize: "10px", marginBottom: "10px", textAlign: "left" }}>WHAT DO YOU WANT TO ACCOMPLISH?</label>
            <input type="text" value={customQuestText} onChange={(event) => setCustomQuestText(event.target.value)} placeholder="e.g. Finish my presentation" maxLength={100} autoFocus style={fieldStyle} />
            <div style={{ color: "var(--text-faint)", fontSize: "9px", marginTop: "8px", textAlign: "right" }}>{customQuestText.length}/100</div>

            <div style={{ marginTop: "20px" }}>
              <div style={{ color: "var(--warning)", fontSize: "10px", marginBottom: "10px", textAlign: "left" }}>HOW WILL YOU COMPLETE IT?</div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button type="button" className="ff-button" onClick={() => setCustomQuestMode("check")} style={{ flex: "1 1 220px", background: customQuestMode === "check" ? "var(--primary)" : "#39394f", color: customQuestMode === "check" ? "#111" : "#f2f2f5", borderBottomColor: customQuestMode === "check" ? "#2a8c5e" : "#242436" }}>✅ CHECK OFF</button>
                <button type="button" className="ff-button" onClick={() => setCustomQuestMode("timer")} style={{ flex: "1 1 220px", background: customQuestMode === "timer" ? "var(--warning)" : "#39394f", color: customQuestMode === "timer" ? "#111" : "#f2f2f5", borderBottomColor: customQuestMode === "timer" ? "#b8862c" : "#242436" }}>⏰ FOCUS TIMER</button>
              </div>
            </div>

            {customQuestMode === "timer" ? (
              <div style={{ marginTop: "20px" }}>
                <label style={{ display: "block", color: "var(--warning)", fontSize: "10px", marginBottom: "10px", textAlign: "left" }}>FOCUS MINUTES</label>
                <input type="number" min={1} max={120} value={customQuestMinutes} onChange={(event) => setCustomQuestMinutes(Number(event.target.value))} style={fieldStyle} />
              </div>
            ) : null}

            <p style={{ color: "var(--text-subtle)", fontSize: "10px", lineHeight: 1.75, margin: "18px 0 5px" }}>Complete the quest to earn 25 EXP, advance your daily goal, and move your hero closer to the next level and gear reward.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap", marginTop: "15px" }}>
              <button type="submit" className="ff-button" disabled={!canForgeQuest} style={!canForgeQuest ? { opacity: 0.68, cursor: "not-allowed", boxShadow: "none" } : undefined}>⚒️ START MY QUEST</button>
              {!customOnly ? <button type="button" className="ff-button" onClick={resetForge} style={{ background: "#555568", color: "white", borderBottomColor: "#343444" }}>CANCEL</button> : null}
            </div>
          </form>
        ) : null}
      </section>

      {!customOnly ? (
        <>
          <h3 style={{ color: "var(--primary)", marginBottom: "8px" }}>SUGGESTED QUESTS</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "10px", marginBottom: "20px" }}>Need inspiration? Select one of GoalQuest's suggested challenges.</p>

          {availableMissions.length > 0 ? (
            <div className="daily-mission-list">
              {availableMissions.map((mission: DailyMission, index: number) => (
                <button key={mission.id} type="button" className="daily-mission-item available" onClick={() => startDailyTask(index)} disabled={todayCompleted} style={{ width: "100%", textAlign: "left", color: "white", ...(todayCompleted ? { opacity: 0.68, cursor: "not-allowed" } : {}) }}>
                  <div style={{ width: "24px", height: "24px", border: `2px solid ${mission.categoryColor}`, borderRadius: "5px", display: "flex", alignItems: "center", justifyContent: "center" }}>{mission.type === "timer" ? "⏰" : "📝"}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: "var(--warning)", fontSize: "12px", lineHeight: 1.6 }}>{mission.text}{mission.type === "timer" ? ` (${mission.time} min)` : ""}</div>
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
        </>
      ) : (
        <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto", padding: "18px", border: "1px solid rgba(255,255,255,.12)", borderRadius: "12px", background: "rgba(255,255,255,.035)", color: "var(--text-muted)", fontSize: "9px", lineHeight: 1.7 }}>
          <strong style={{ color: "var(--warning)" }}>THIS PATH IS YOURS.</strong><br />GoalQuest will not choose your tasks for you. Create the quests that matter to your real life and your hero will grow with you.
        </div>
      )}
    </div>
  );
}
