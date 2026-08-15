import React, { useMemo } from "react";

import { useGoalQuestStore } from "../../../stores/goalQuestStore";

type ParticleMeta = {
  id: string;
  left: number;
  top: number;
  duration: number;
  delay: number;
  opacity: number;
  size: number;
};

const weightedEdgePosition = () => {
  const roll = Math.random();

  if (roll < 0.32) {
    return Math.random() * 20;
  }

  if (roll < 0.64) {
    return 80 + Math.random() * 20;
  }

  return 20 + Math.random() * 60;
};

const createParticles = (count: number): ParticleMeta[] =>
  Array.from({ length: count }, (_, index) => ({
    id: `particle-${index}`,
    left: weightedEdgePosition(),
    top: weightedEdgePosition(),
    duration: 8 + Math.random() * 16,
    delay: Math.random() * 8,
    opacity: 0.2 + Math.random() * 0.55,
    size: 1 + Math.random() * 1.7
  }));

export default function ParticleBackground() {
  const corruptionLevel = useGoalQuestStore((state) => state.corruptionLevel);

  const particles = useMemo(() => {
    const base = 46;
    const extra = corruptionLevel * 16;
    return createParticles(base + extra);
  }, [corruptionLevel]);

  return (
    <div className="particle-container" aria-hidden="true">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
    </div>
  );
}
