import React, { useEffect, useMemo, useState } from "react";

import { useGoalQuestStore } from "../../../stores/goalQuestStore";
import { publicAssetPath } from "../utils";

const AERIL_MESSAGES: Record<number, string[]> = {
  0: [
    "The portal is stable.",
    "Everything is in balance.",
    "Your presence strengthens the bond."
  ],
  1: [
    "I can feel interference...",
    "The system needs attention.",
    "There is static in the air."
  ],
  2: [
    "The corruption is seeping through.",
    "The portal will not hold much longer.",
    "We need you."
  ],
  3: [
    "We are losing stability.",
    "Do not wait too long.",
    "The world depends on you."
  ]
};

const BORDER_BY_LEVEL: Record<number, string> = {
  0: "#4dff91",
  1: "#b388ff",
  2: "#aa00ff",
  3: "#ff00ff"
};

export default function AerilCompanion() {
  const corruptionLevel = useGoalQuestStore((state) => state.corruptionLevel);
  const dailyStreak = useGoalQuestStore((state) => state.stats.dailyStreak);
  const getMotivationalMessage = useGoalQuestStore((state) => state.getMotivationalMessage);

  const [message, setMessage] = useState("You have returned.");
  const [glitch, setGlitch] = useState(false);
  const [imgError, setImgError] = useState(false);

  const pool = useMemo(() => AERIL_MESSAGES[corruptionLevel] ?? AERIL_MESSAGES[0], [corruptionLevel]);

  useEffect(() => {
    const next = pool[Math.floor(Math.random() * pool.length)] ?? "We are still connected.";
    setMessage(next);
  }, [pool, dailyStreak]);

  useEffect(() => {
    if (dailyStreak >= 30) {
      setMessage("The journey is already transforming you.");
      return;
    }

    if (dailyStreak >= 7) {
      setMessage("Your presence strengthens the portal.");
    }
  }, [dailyStreak]);

  useEffect(() => {
    if (corruptionLevel < 2) {
      setGlitch(false);
      return;
    }

    const interval = window.setInterval(() => {
      if (Math.random() < 0.5) {
        setGlitch(true);
        window.setTimeout(() => setGlitch(false), 130);
      }
    }, 9000);

    return () => {
      window.clearInterval(interval);
    };
  }, [corruptionLevel]);

  return (
    <>
      <div
        className={`aeril-guardian ${corruptionLevel > 0 ? `corrupt-${corruptionLevel}` : ""} ${glitch ? "glitch" : ""}`}
        aria-hidden="true"
      >
        {!imgError ? (
          <img
            src={publicAssetPath("/assets/classes/Aerial.png")}
            alt="Aeril"
            className="aeril-sprite"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="aeril-sprite" style={{ fontSize: "56px", lineHeight: "1" }}>
            🔮
          </div>
        )}
      </div>

      <div className="aeril-message" style={{ borderLeftColor: BORDER_BY_LEVEL[corruptionLevel] }}>
        🔮 Aeril: "{message}"
        <div style={{ marginTop: "8px", color: "var(--text-muted)", fontSize: "10px", lineHeight: 1.6 }}>{getMotivationalMessage()}</div>
      </div>
    </>
  );
}
