import React, { useEffect, useMemo } from "react";

import { useGoalQuestStore } from "../../../stores/goalQuestStore";

const buildGlitchLines = (level: number) =>
  Array.from({ length: level >= 2 ? 3 : 1 }, (_, index) => ({
    id: `glitch-${level}-${index}`,
    top: Math.random() * 100,
    delay: Math.random() * 4
  }));

export default function CorruptionVisuals() {
  const corruptionLevel = useGoalQuestStore((state) => state.corruptionLevel);
  const screen = useGoalQuestStore((state) => state.screen);

  const glitchLines = useMemo(() => buildGlitchLines(corruptionLevel), [corruptionLevel]);

  useEffect(() => {
    document.body.classList.remove("corruption-bg-2", "corruption-bg-3");

    if (corruptionLevel >= 2) {
      document.body.classList.add(`corruption-bg-${corruptionLevel}`);
    }

    return () => {
      document.body.classList.remove("corruption-bg-2", "corruption-bg-3");
    };
  }, [corruptionLevel]);

  useEffect(() => {
    const screenNode = document.querySelector(".game-screen");
    if (!screenNode) {
      return;
    }

    if (corruptionLevel >= 1) {
      screenNode.classList.add("corruption-border-effect");
    } else {
      screenNode.classList.remove("corruption-border-effect");
    }
  }, [corruptionLevel, screen]);

  if (corruptionLevel <= 0) {
    return null;
  }

  return (
    <>
      <div className={`corruption-overlay level-${corruptionLevel}`} aria-hidden="true" />
      {corruptionLevel >= 2
        ? glitchLines.map((line) => (
            <div
              key={line.id}
              className={`glitch-line level-${corruptionLevel}`}
              style={{ top: `${line.top}%`, animationDelay: `${line.delay}s` }}
              aria-hidden="true"
            />
          ))
        : null}
    </>
  );
}
