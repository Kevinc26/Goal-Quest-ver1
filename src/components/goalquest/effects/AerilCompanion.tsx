import React, { useEffect, useMemo, useState } from "react";

import { useGoalQuestStore } from "../../../stores/goalQuestStore";

const AERIL_MESSAGES: Record<number, string[]> = {
  0: [
    "El portal esta estable.",
    "Todo esta en equilibrio.",
    "Tu presencia fortalece el vinculo."
  ],
  1: [
    "Siento interferencia...",
    "El sistema necesita atencion.",
    "Hay estatica en el aire."
  ],
  2: [
    "La corrupcion se esta filtrando.",
    "El portal no resistira mucho.",
    "Te necesitamos."
  ],
  3: [
    "Estamos perdiendo estabilidad.",
    "No tardes.",
    "El mundo depende de ti."
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

  const [message, setMessage] = useState("Has regresado.");
  const [glitch, setGlitch] = useState(false);
  const [imgError, setImgError] = useState(false);

  const pool = useMemo(() => AERIL_MESSAGES[corruptionLevel] ?? AERIL_MESSAGES[0], [corruptionLevel]);

  useEffect(() => {
    const next = pool[Math.floor(Math.random() * pool.length)] ?? "Seguimos en contacto.";
    setMessage(next);
  }, [pool, dailyStreak]);

  useEffect(() => {
    if (dailyStreak >= 30) {
      setMessage("El viaje ya te esta transformando.");
      return;
    }

    if (dailyStreak >= 7) {
      setMessage("Tu presencia fortalece el portal.");
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
            src="/assets/classes/Aerial.png"
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
        <div style={{ marginTop: "8px", color: "#aaa", fontSize: "9px" }}>{getMotivationalMessage()}</div>
      </div>
    </>
  );
}
