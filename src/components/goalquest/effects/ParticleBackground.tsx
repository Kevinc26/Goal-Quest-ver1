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

const createParticles = (count: number): ParticleMeta[] =>
  Array.from({ length: count }, (_, index) => ({
    id: `particle-${index}`,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: 8 + Math.random() * 16,
    delay: Math.random() * 8,
    opacity: 0.25 + Math.random() * 0.65,
    size: 1 + Math.random() * 2
  }));

export default function ParticleBackground() {
  const corruptionLevel = useGoalQuestStore((state) => state.corruptionLevel);

  const particles = useMemo(() => {
    const base = 50;
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
