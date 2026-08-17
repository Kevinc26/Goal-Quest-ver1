import React, { useState } from "react";

import { saveGoalQuestCloud } from "../../../lib/cloudSave";
import { useGoalQuestStore } from "../../../stores/goalQuestStore";
import { useGoalQuestAuth } from "../auth/AuthProvider";

export default function SettingsScreen() {
  const stats = useGoalQuestStore((state) => state.stats);
  const setScreen = useGoalQuestStore((state) => state.setScreen);
  const changeDailyGoal = useGoalQuestStore((state) => state.changeDailyGoal);
  const resetGame = useGoalQuestStore((state) => state.resetGame);
  const auth = useGoalQuestAuth();
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      if (auth.session) {
        try {
          await saveGoalQuestCloud(auth.session);
        } catch (error) {
          console.error("Final GoalQuest cloud save before sign out failed", error);
        }
      }
      await auth.signOut();
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <div className="game-screen active">
      <button type="button" className="ff-button" onClick={() => setScreen("start")} style={{ marginBottom: "20px" }}>
        ← BACK
      </button>

      <h2 style={{ color: "var(--primary)", margin: "30px 0" }}>SETTINGS</h2>

      <div className="ff-menu">
        {auth.configured && auth.session ? (
          <div
            style={{
              margin: "0 0 20px",
              padding: "16px",
              border: "1px solid rgba(70,199,232,.35)",
              borderRadius: "10px",
              background: "rgba(7,16,31,.62)"
            }}
          >
            <div style={{ color: "#46c7e8", fontSize: "8px", marginBottom: "10px" }}>☁ CLOUD ACCOUNT</div>
            <div style={{ color: "#aebdcc", fontSize: "7px", lineHeight: 1.7, overflowWrap: "anywhere" }}>
              {auth.session.user.email ?? "Authenticated adventurer"}
            </div>
            <div style={{ color: "#64798d", fontSize: "6px", lineHeight: 1.7, marginTop: "8px" }}>
              HERO · XP · QUESTS · GEAR SYNC ENABLED
            </div>
            <button
              type="button"
              className="ff-button"
              onClick={() => void handleSignOut()}
              disabled={signingOut}
              style={{ width: "100%", margin: "15px 0 0", background: "#23354b", color: "#dce7ee", borderBottomColor: "#172639" }}
            >
              {signingOut ? "SAVING..." : "SIGN OUT"}
            </button>
          </div>
        ) : null}

        <div style={{ margin: "20px 0" }}>
          <div style={{ color: "var(--primary)" }}>DAILY QUEST GOAL ({stats.dailyTasksGoal})</div>
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
          🔄 RESET
        </button>
      </div>
    </div>
  );
}
