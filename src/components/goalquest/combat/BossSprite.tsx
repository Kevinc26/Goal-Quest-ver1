import React, { useEffect, useState } from "react";

import {
  bossHdSpriteMimeForRegion,
  bossHdSpritePartsForRegion,
  bossPixelSpriteForRegion
} from "../../../game/bossPixelSprites";

type BossSpriteProps = {
  regionId: number;
  className?: string;
};

const fetchBase64Text = async (path: string) => {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Unable to load boss sprite asset: ${path}`);
  return (await response.text()).trim();
};

export default function BossSprite({ regionId, className }: BossSpriteProps) {
  const [spriteSrc, setSpriteSrc] = useState("");

  useEffect(() => {
    let active = true;
    const legacySpriteFile = bossPixelSpriteForRegion(regionId);
    const hdParts = bossHdSpritePartsForRegion(regionId);
    const hdMime = bossHdSpriteMimeForRegion(regionId);

    setSpriteSrc("");

    const loadLegacy = () =>
      fetchBase64Text(legacySpriteFile).then((base64) => `data:image/png;base64,${base64}`);

    const loadSprite = hdParts.length
      ? Promise.all(hdParts.map(fetchBase64Text))
          .then((parts) => `data:${hdMime};base64,${parts.join("")}`)
          .catch(loadLegacy)
      : loadLegacy();

    loadSprite
      .then((src) => {
        if (active) setSpriteSrc(src);
      })
      .catch(() => {
        if (active) setSpriteSrc("");
      });

    return () => {
      active = false;
    };
  }, [regionId]);

  if (!spriteSrc) {
    return <span className={`${className ?? ""} combat-rpg-boss-sprite--loading`} aria-hidden="true" />;
  }

  return <img src={spriteSrc} alt={`Boss for region ${regionId}`} className={className} draggable={false} />;
}
