import { REGIONS } from "./data";

export type BossAssetStatus = "ready" | "pending" | "invalid";

type BossSpriteTheme = {
  name: string;
  sprite: string;
  hdSrc?: string;
  hdBase64Src?: string;
  hdStem?: string;
  hdParts?: number;
  hdMime: "image/webp" | "image/avif";
  assetStatus: BossAssetStatus;
  auditNote: string;
};

/*
 * Boss art contract
 * -----------------
 * Boss Lab (?bosslab=1) is a strict visual QA mode. Only entries explicitly
 * marked "ready" may render HD art there; pending/invalid entries show a loud
 * error card instead of silently falling back to the legacy pixel sprite.
 *
 * Outside Boss Lab we keep gameplay safe: approved HD art is preferred and a
 * legacy pixel sprite is used only when an approved HD asset fails to load.
 */
export const BOSS_PIXEL_THEMES: Record<number, BossSpriteTheme> = {
  1: {
    name: "Urzag, Devourer of Habits",
    sprite: "/assets/bosses/pixel/03-urzag.png.base64",
    hdSrc: "/assets/bosses/hd3/01-urzag-hd.avif",
    hdBase64Src: "/assets/bosses/hd3/01-urzag-hd.avif.base64",
    hdStem: "01-urzag-hd",
    hdParts: 0,
    hdMime: "image/avif",
    assetStatus: "pending",
    auditNote: "HD candidate exists but has not passed a distinct-render visual audit."
  },
  2: {
    name: "Zephyrion, Thief of Time",
    sprite: "/assets/bosses/pixel/06-zephyrion.png.base64",
    hdSrc: "/assets/bosses/hd3/02-zephyrion-hd.avif",
    hdBase64Src: "/assets/bosses/hd3/02-zephyrion-hd.avif.base64",
    hdStem: "02-zephyrion-hd-v2",
    hdParts: 6,
    hdMime: "image/avif",
    assetStatus: "ready",
    auditNote: "Approved chunked v2 HD render."
  },
  3: {
    name: "Maldrak, Heart of Fire",
    sprite: "/assets/bosses/pixel/04-maldrak.png.base64",
    hdSrc: "/assets/bosses/hd3/03-maldrak-hd.avif",
    hdBase64Src: "/assets/bosses/hd3/03-maldrak-hd.avif.base64",
    hdStem: "03-maldrak-hd",
    hdParts: 0,
    hdMime: "image/avif",
    assetStatus: "pending",
    auditNote: "HD candidate exists but has not passed a distinct-render visual audit."
  },
  4: {
    name: "Xilith, Queen of Chaos",
    sprite: "/assets/bosses/pixel/01-xilith.png.base64",
    hdSrc: "/assets/bosses/hd3/04-xilith-hd.avif",
    hdBase64Src: "/assets/bosses/hd3/04-xilith-hd.avif.base64",
    hdStem: "04-xilith-hd",
    hdParts: 0,
    hdMime: "image/avif",
    assetStatus: "invalid",
    auditNote: "Rejected: the current candidate is visually too close to the legacy pixel boss."
  },
  5: {
    name: "Thalor, Titan of Steel",
    sprite: "/assets/bosses/pixel/02-thalor.png.base64",
    hdSrc: "/assets/bosses/hd4/05-thalor-hd.avif",
    hdBase64Src: "/assets/bosses/hd4/05-thalor-hd.avif.base64",
    hdStem: "05-thalor-hd",
    hdParts: 0,
    hdMime: "image/avif",
    assetStatus: "pending",
    auditNote: "Current staged candidate is incomplete/unverified and is not approved for combat."
  },
  6: {
    name: "Nyxara, Weaver of Nightmares",
    sprite: "/assets/bosses/pixel/07-nyxara.png.base64",
    hdSrc: "/assets/bosses/hd4/06-nyxara-hd.avif",
    hdBase64Src: "/assets/bosses/hd4/06-nyxara-hd.avif.base64",
    hdStem: "06-nyxara-hd",
    hdParts: 0,
    hdMime: "image/avif",
    assetStatus: "pending",
    auditNote: "HD candidate exists but has not passed a distinct-render visual audit."
  },
  7: {
    name: "Kaelstrom, Eternal Storm",
    sprite: "/assets/bosses/pixel/05-kaelstrom.png.base64",
    hdSrc: "/assets/bosses/hd3/07-kaelstrom-hd.avif",
    hdBase64Src: "/assets/bosses/hd3/07-kaelstrom-hd.avif.base64",
    hdStem: "07-kaelstrom-hd",
    hdParts: 0,
    hdMime: "image/avif",
    assetStatus: "pending",
    auditNote: "HD candidate exists but has not passed a distinct-render visual audit."
  },
  8: {
    name: "Oblivion, Final Consumer",
    sprite: "/assets/bosses/pixel/08-oblivion.png.base64",
    hdSrc: "/assets/bosses/hd3/08-oblivion-hd.avif",
    hdStem: "08-oblivion-hd",
    hdParts: 0,
    hdMime: "image/avif",
    assetStatus: "pending",
    auditNote: "No approved HD render is currently present."
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
  const extension = theme.hdMime === "image/avif" ? "avif" : "webp";
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
    return `/assets/bosses/hd/${theme.hdStem}.${theme.hdMime === "image/avif" ? "avif" : "webp"}.base64.part01 (+${theme.hdParts - 1})`;
  }
  return theme.hdBase64Src ?? theme.hdSrc ?? "UNCONFIGURED";
};

export const bossPixelNameForRegion = (regionId: number) =>
  bossThemeForRegion(regionId).name;
