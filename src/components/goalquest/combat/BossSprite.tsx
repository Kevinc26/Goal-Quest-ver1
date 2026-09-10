import React, { useEffect, useState } from "react";

import { isBossLabEnabled } from "../../../game/bossLabAccess";
import {
  bossAssetAuditNoteForRegion,
  bossAssetStatusForRegion,
  bossHdDebugSourceForRegion,
  bossHdSpriteBase64SrcForRegion,
  bossHdSpriteMimeForRegion,
  bossHdSpritePartsForRegion,
  bossHdSpriteSrcForRegion,
  bossPixelNameForRegion,
  bossPixelSpriteForRegion
} from "../../../game/bossPixelSprites";

type BossSpriteProps = {
  regionId: number;
  className?: string;
};

type SpriteLoadResult = {
  src: string;
  source: string;
  kind: "hd" | "legacy";
};

type SpriteState = {
  status: "loading" | "loaded" | "error";
  result?: SpriteLoadResult;
  error?: string;
};

const fetchBase64Text = async (path: string) => {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Unable to load boss sprite asset: ${path} (${response.status})`);
  const text = (await response.text()).trim();
  if (!text) throw new Error(`Boss sprite asset is empty: ${path}`);
  return text;
};

const preloadImage = (src: string) =>
  new Promise<string>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(src);
    image.onerror = () => reject(new Error(`Unable to decode boss sprite: ${src.slice(0, 96)}`));
    image.src = src;
  });

const loadBase64Asset = (path: string, mime: string) =>
  fetchBase64Text(path)
    .then((base64) => `data:${mime};base64,${base64}`)
    .then(preloadImage);

export default function BossSprite({ regionId, className }: BossSpriteProps) {
  const [spriteState, setSpriteState] = useState<SpriteState>({ status: "loading" });
  const strictMode = isBossLabEnabled();
  const assetStatus = bossAssetStatusForRegion(regionId);
  const bossName = bossPixelNameForRegion(regionId);
  const auditNote = bossAssetAuditNoteForRegion(regionId);
  const debugSource = bossHdDebugSourceForRegion(regionId);

  useEffect(() => {
    let active = true;
    const legacySpriteFile = bossPixelSpriteForRegion(regionId);
    const hdSrc = bossHdSpriteSrcForRegion(regionId);
    const hdBase64Src = bossHdSpriteBase64SrcForRegion(regionId);
    const hdParts = bossHdSpritePartsForRegion(regionId);
    const hdMime = bossHdSpriteMimeForRegion(regionId);

    setSpriteState({ status: "loading" });

    const loadLegacy = async (): Promise<SpriteLoadResult> => {
      const base64 = await fetchBase64Text(legacySpriteFile);
      return {
        src: `data:image/png;base64,${base64}`,
        source: legacySpriteFile,
        kind: "legacy"
      };
    };

    const loadHdOnly = async (): Promise<SpriteLoadResult> => {
      const errors: string[] = [];

      if (hdSrc) {
        try {
          const src = await preloadImage(hdSrc);
          return { src, source: hdSrc, kind: "hd" };
        } catch (error) {
          errors.push(error instanceof Error ? error.message : String(error));
        }
      }

      if (hdParts.length) {
        try {
          const parts = await Promise.all(hdParts.map(fetchBase64Text));
          const src = await preloadImage(`data:${hdMime};base64,${parts.join("")}`);
          return { src, source: `${hdParts[0]} (+${hdParts.length - 1})`, kind: "hd" };
        } catch (error) {
          errors.push(error instanceof Error ? error.message : String(error));
        }
      }

      if (hdBase64Src) {
        try {
          const src = await loadBase64Asset(hdBase64Src, hdMime);
          return { src, source: hdBase64Src, kind: "hd" };
        } catch (error) {
          errors.push(error instanceof Error ? error.message : String(error));
        }
      }

      throw new Error(errors.join(" | ") || "No HD source is configured for this boss.");
    };

    const loadSprite = async (): Promise<SpriteLoadResult> => {
      if (strictMode && assetStatus !== "ready") {
        throw new Error(`${assetStatus.toUpperCase()}: ${auditNote}`);
      }

      if (assetStatus === "ready") {
        try {
          return await loadHdOnly();
        } catch (error) {
          if (strictMode) throw error;
        }
      }

      // Outside Boss Lab, never ship a pending/invalid candidate. Keep combat
      // playable with the known legacy pixel sprite until the HD art is approved.
      return loadLegacy();
    };

    if (strictMode) {
      console.info("[BossLab][BossSprite] load", {
        regionId,
        bossName,
        assetStatus,
        selectedHdSource: debugSource,
        fallbackBlocked: true
      });
    }

    loadSprite()
      .then((result) => {
        if (!active) return;
        setSpriteState({ status: "loaded", result });
        if (strictMode) {
          console.info("[BossLab][BossSprite] success", {
            regionId,
            bossName,
            source: result.source,
            kind: result.kind,
            fallbackBlocked: true
          });
        }
      })
      .catch((error) => {
        if (!active) return;
        const message = error instanceof Error ? error.message : String(error);
        setSpriteState({ status: "error", error: message });
        if (strictMode) {
          console.error("[BossLab][BossSprite] blocked", {
            regionId,
            bossName,
            assetStatus,
            selectedHdSource: debugSource,
            error: message,
            fallbackBlocked: true
          });
        }
      });

    return () => {
      active = false;
    };
  }, [assetStatus, auditNote, bossName, debugSource, regionId, strictMode]);

  if (spriteState.status === "error" && strictMode) {
    const label = assetStatus === "invalid" ? "INVALID HD BOSS ASSET" : "MISSING HD BOSS ASSET";
    return (
      <div className="combat-rpg-boss-asset-error" role="status" aria-label={`${label}: ${bossName}`}>
        <strong>{label}</strong>
        <span>{bossName}</span>
        <small>REGION {regionId} · {debugSource}</small>
        <p>{spriteState.error}</p>
      </div>
    );
  }

  if (spriteState.status !== "loaded" || !spriteState.result) {
    return <span className={`${className ?? ""} combat-rpg-boss-sprite--loading`} aria-hidden="true" />;
  }

  return (
    <img
      src={spriteState.result.src}
      alt={`Boss for region ${regionId}`}
      className={`${className ?? ""} ${spriteState.result.kind === "hd" ? "combat-rpg-boss-sprite--hd" : "combat-rpg-boss-sprite--legacy"}`}
      data-boss-asset-kind={spriteState.result.kind}
      data-boss-asset-source={spriteState.result.source}
      draggable={false}
    />
  );
}
