import { REGIONS } from "./data";

export type BossAssetStatus = "ready" | "pending" | "invalid";

type BossSpriteTheme = {
  name: string;
  sprite: string;
  hdSrc?: string;
  hdBase64Src?: string;
  hdStem?: string;
  hdParts?: number;
  hdMime: "image/png" | "image/webp" | "image/avif";
  assetStatus: BossAssetStatus;
  auditNote: string;
};

/*
 * Boss art contract
 * -----------------
 * The final boss renders are now stored as normal PNG files under
 * public/assets/bosses/hd. Boss Lab (?bosslab=1) loads those files directly.
 *
 * The files currently have a .png.png suffix because that is how they were
 * uploaded from the desktop. We intentionally reference the exact repository
 * filenames here so the visual QA can proceed without another asset migration.
 *
 * Outside Boss Lab the legacy pixel sprite remains only as an emergency
 * fallback if one of the direct PNG files fails to load.
 */
export const BOSS_PIXEL_THEMES: Record<number, BossSpriteTheme> = {
  1: {
    name: "Urzag, Devourer of Habits",
    sprite: "/assets/bosses/pixel/03-urzag.png.base64",
    hdSrc: "/assets/bosses/hd/01-urzag.png.png",
    hdParts: 0,
    hdMime: "image/png",
    assetStatus: "ready",
    auditNote: "Manual PNG uploaded and wired for live visual QA."
  },
  2: {
    name: "Zephyrion, Thief of Time",
    sprite: "/assets/bosses/pixel/06-zephyrion.png.base64",
    hdSrc: "/assets/bosses/hd/02-zephyrion.png.png",
    hdParts: 0,
    hdMime: "image/png",
    assetStatus: "ready",
    auditNote: "Manual PNG uploaded and wired for live visual QA."
  },
  3: {
    name: "Maldrak, Heart of Fire",
    sprite: "/assets/bosses/pixel/04-maldrak.png.base64",
    hdSrc: "/assets/bosses/hd/03-maldrak.png.png",
    hdParts: 0,
    hdMime: "image/png",
    assetStatus: "ready",
    auditNote: "Manual PNG uploaded and wired for live visual QA."
  },
  4: {
    name: "Xilith, Queen of Chaos",
    sprite: "/assets/bosses/pixel/01-xilith.png.base64",
    hdSrc: "/assets/bosses/hd/04-xilith.png.png",
    hdParts: 0,
    hdMime: "image/png",
    assetStatus: "ready",
    auditNote: "Manual PNG uploaded and wired for live visual QA."
  },
  5: {
    name: "Thalor, Titan of Steel",
    sprite: "/assets/bosses/pixel/02-thalor.png.base64",
    hdSrc: "/assets/bosses/hd/05-thalor.png.png",
    hdParts: 0,
    hdMime: "image/png",
    assetStatus: "ready",
    auditNote: "Manual PNG uploaded and wired for live visual QA."
  },
  6: {
    name: "Nyxara, Weaver of Nightmares",
    sprite: "/assets/bosses/pixel/07-nyxara.png.base64",
    hdSrc: "/assets/bosses/hd/06-nyxara.png.png",
    hdParts: 0,
    hdMime: "image/png",
    assetStatus: "ready",
    auditNote: "Manual PNG uploaded and wired for live visual QA."
  },
  7: {
    name: "Kaelstrom, Eternal Storm",
    sprite: "/assets/bosses/pixel/05-kaelstrom.png.base64",
    hdSrc: "/assets/bosses/hd/07-kaelstrom.png.png",
    hdParts: 0,
    hdMime: "image/png",
    assetStatus: "ready",
    auditNote: "Manual PNG uploaded and wired for live visual QA."
  },
  8: {
    name: "Oblivion, Final Consumer",
    sprite: "/assets/bosses/pixel/08-oblivion.png.base64",
    hdSrc: "/assets/bosses/hd/08-oblivion.png.png",
    hdParts: 0,
    hdMime: "image/png",
    assetStatus: "ready",
    auditNote: "Manual PNG uploaded and wired for live visual QA."
  }
};

/* Preserve combat mechanics, HP, difficulty and attacks. Only boss identity and
   visuals are mapped here, following the exact Act I -> Act VIII order. */
for (const region of REGIONS) {
  const theme = BOSS_PIXEL_THEMES[region.id];
  if (theme) region.boss.name = theme.name;
}

const bossThemeForRegion = (regionId: number) =>
  BOSS_PIXEL_THEMES[regionId] ?? BOSS_PIXEL_THEMES[1];

export const bossPixelSpriteForRegion = (regionId: number) =>
  bossThemeForRegion(regionId).sprite;

export const bossHdSpriteSrcForRegion = (regionId: number) =>
  bossThemeForRegion(regionId).hdSrc ?? "";

export const bossHdSpriteBase64SrcForRegion = (regionId: number) =>
  bossThemeForRegion(regionId).hdBase64Src ?? "";

export const bossHdSpritePartsForRegion = (regionId: number) => {
  const theme = bossThemeForRegion(regionId);
  if (!theme.hdParts || !theme.hdStem) return [];
  const extension = theme.hdMime === "image/avif" ? "avif" : theme.hdMime === "image/webp" ? "webp" : "png";
  return Array.from({ length: theme.hdParts }, (_, index) =>
    `/assets/bosses/hd/${theme.hdStem}.${extension}.base64.part${String(index + 1).padStart(2, "0")}`
  );
};

export const bossHdSpriteMimeForRegion = (regionId: number) =>
  bossThemeForRegion(regionId).hdMime;

export const bossAssetStatusForRegion = (regionId: number) =>
  bossThemeForRegion(regionId).assetStatus;

export const bossAssetAuditNoteForRegion = (regionId: number) =>
  bossThemeForRegion(regionId).auditNote;

export const bossHdDebugSourceForRegion = (regionId: number) => {
  const theme = bossThemeForRegion(regionId);
  if (theme.hdParts && theme.hdStem) {
    const extension = theme.hdMime === "image/avif" ? "avif" : theme.hdMime === "image/webp" ? "webp" : "png";
    return `/assets/bosses/hd/${theme.hdStem}.${extension}.base64.part01 (+${theme.hdParts - 1})`;
  }
  return theme.hdBase64Src ?? theme.hdSrc ?? "UNCONFIGURED";
};

export const bossPixelNameForRegion = (regionId: number) =>
  bossThemeForRegion(regionId).name;
