import React, { useEffect, useState } from "react";

import { bossPixelSpriteForRegion } from "../../../game/bossPixelSprites";

type BossSpriteProps = {
  regionId: number;
  className?: string;
};

export default function BossSprite({ regionId, className }: BossSpriteProps) {
  const [spriteSrc, setSpriteSrc] = useState("");

  useEffect(() => {
    let active = true;
    const spriteFile = bossPixelSpriteForRegion(regionId);

    setSpriteSrc("");

    fetch(spriteFile)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Unable to load boss sprite: ${spriteFile}`);
        }
        return response.text();
      })
      .then((base64) => {
        if (active) {
          setSpriteSrc(`data:image/png;base64,${base64.trim()}`);
        }
      })
      .catch(() => {
        if (active) {
          setSpriteSrc("");
        }
      });

    return () => {
      active = false;
    };
  }, [regionId]);

  if (!spriteSrc) {
    return <span className={`${className ?? ""} combat-rpg-boss-sprite--loading`} aria-hidden="true" />;
  }

  return (
    <img
      src={spriteSrc}
      alt={`Boss for region ${regionId}`}
      className={className}
      draggable={false}
    />
  );
}
