import React from "react";

import { useGoalQuestStore } from "../../../stores/goalQuestStore";

export default function RestScreen() {
  const stats = useGoalQuestStore((state) => state.stats);
  const setScreen = useGoalQuestStore((state) => state.setScreen);
  const rest = useGoalQuestStore((state) => state.rest);

  return (
    <div className="game-screen active">
      <button type="button" className="ff-button" onClick={() => setScreen("world")} style={{ marginBottom: "20px" }}>
        ← VOLVER
      </button>

      <div style={{ textAlign: "center", margin: "50px 0" }}>
        <div style={{ fontSize: "100px" }}>🔥</div>
        <h2 style={{ color: "var(--warning)" }}>CAMPAMENTO</h2>
        <button type="button" className="ff-button" onClick={rest} style={{ fontSize: "16px", padding: "20px 40px" }}>
          💤 DESCANSAR
        </button>
      </div>

      <div style={{ background: "rgba(26,26,46,0.95)", borderRadius: "20px", padding: "30px", border: "3px solid var(--primary)" }}>
        <h3 style={{ color: "var(--warning)", textAlign: "center" }}>ESTADO</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "20px" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "var(--danger)" }}>HP</div>
            <div style={{ fontSize: "24px" }}>
              {stats.hp}/{stats.maxHp}
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "var(--primary)" }}>MP</div>
            <div style={{ fontSize: "24px" }}>
              {stats.mp}/{stats.maxMp}
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "var(--warning)" }}>NIVEL</div>
            <div style={{ fontSize: "24px" }}>{stats.level}</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "var(--secondary)" }}>RACHA</div>
            <div style={{ fontSize: "24px" }}>{stats.dailyStreak} dias</div>
          </div>
        </div>
      </div>
    </div>
  );
}
