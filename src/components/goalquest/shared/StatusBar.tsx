import React from "react";

import { useGoalQuestStore, goalQuestAssets } from "../../../stores/goalQuestStore";
import { percent } from "../utils";

function StatBlock({
  label,
  color,
  value,
  width,
  barClass
}: {
  label: string;
  color: string;
  value: string;
  width: number;
  barClass: "hp-bar" | "mp-bar" | "exp-bar";
}) {
  return (
    <div>
      <div style={{ fontSize: "10px", color }}>{label}</div>
      <div className={`stat-bar ${barClass}`}>
        <div className="stat-fill" style={{ width: `${width}%` }}>
          <div className="stat-text">{value}</div>
        </div>
      </div>
    </div>
  );
}

export default function StatusBar() {
  const character = useGoalQuestStore((state) => state.character);
  const stats = useGoalQuestStore((state) => state.stats);
  const getPathName = useGoalQuestStore((state) => state.getPathName);

  if (!character) {
    return null;
  }

  const dailyProgress = percent(stats.dailyTasksCompleted, stats.dailyTasksGoal);

  return (
    <div className="status-bar">
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            overflow: "hidden",
            border: "2px solid rgba(255,255,255,0.2)",
            background: "rgba(0,0,0,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <img
            src={goalQuestAssets.classes[character.id]}
            alt={character.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", imageRendering: "pixelated" }}
          />
        </div>
        <div>
          <div style={{ color: "var(--primary)", fontWeight: "bold" }}>{character.name}</div>
          <div style={{ fontSize: "10px", color: "#aaa" }}>{getPathName()}</div>
          <div style={{ fontSize: "10px", color: "var(--warning)" }}>Nivel {stats.level}</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap" }}>
        <StatBlock
          label="HP"
          color="var(--danger)"
          value={`${stats.hp}/${stats.maxHp}`}
          width={percent(stats.hp, stats.maxHp)}
          barClass="hp-bar"
        />
        <StatBlock
          label="MP"
          color="var(--primary)"
          value={`${stats.mp}/${stats.maxMp}`}
          width={percent(stats.mp, stats.maxMp)}
          barClass="mp-bar"
        />
        <StatBlock
          label="EXP"
          color="var(--warning)"
          value={`${stats.exp}/${stats.nextLevelExp}`}
          width={percent(stats.exp, stats.nextLevelExp)}
          barClass="exp-bar"
        />
        <div>
          <div style={{ fontSize: "10px", color: "var(--info)", textAlign: "center" }}>DIARIO</div>
          <div className="daily-progress-bar" style={{ width: "120px", height: "10px" }}>
            <div className="daily-progress-fill" style={{ width: `${dailyProgress}%` }}>
              <div className="daily-progress-text">
                {stats.dailyTasksCompleted}/{stats.dailyTasksGoal}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
