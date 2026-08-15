import React from "react";

import type { GearItem } from "../../../game/gear";

type HeroGearVisualsProps = {
  items: GearItem[];
  compact?: boolean;
};

export default function HeroGearVisuals({ items, compact = false }: HeroGearVisualsProps) {
  const aura = items.find((item) => item.slot === "aura");
  const visibleItems = items.filter((item) => item.slot !== "aura");

  return (
    <div className={`hero-gear-visuals ${compact ? "compact" : ""}`} aria-hidden="true">
      {aura ? <span className="hero-gear-aura" /> : null}
      {visibleItems.map((item) => (
        <span key={item.id} className={`hero-gear-token hero-gear-token--${item.slot}`} title={item.name}>
          {item.symbol}
        </span>
      ))}
    </div>
  );
}
