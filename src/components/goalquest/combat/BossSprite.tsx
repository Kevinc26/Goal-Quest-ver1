import React from "react";

import { bossPixelSpriteForRegion } from "../../../game/bossPixelSprites";

type BossSpriteProps = {
  regionId: number;
  className?: string;
};

export default function BossSprite({ regionId, className }: BossSpriteProps) {
  return (
    <img
      src={bossPixelSpriteForRegion(regionId)}
      alt={`Boss for region ${regionId}`}
      className={className}
      draggable={false}
    />
  );
}
