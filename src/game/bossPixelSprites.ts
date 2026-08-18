import { REGIONS } from "./data";

type BossSpriteTheme = {
  name: string;
  sprite: string;
  hdStem: string;
  hdParts: number;
  hdMime: "image/webp" | "image/avif";
};

export const BOSS_PIXEL_THEMES: Record<number, BossSpriteTheme> = {
  1: { name: "Urzag, Devourer of Habits", sprite: "/assets/bosses/pixel/03-urzag.png.base64", hdStem: "01-urzag-game", hdParts: 0, hdMime: "image/webp" },
  2: { name: "Zephyrion, Thief of Time", sprite: "/assets/bosses/pixel/06-zephyrion.png.base64", hdStem: "02-zephyrion-game", hdParts: 1, hdMime: "image/avif" },
  3: { name: "Maldrak, Heart of Fire", sprite: "/assets/bosses/pixel/04-maldrak.png.base64", hdStem: "03-maldrak-game", hdParts: 0, hdMime: "image/webp" },
  4: { name: "Xilith, Queen of Chaos", sprite: "/assets/bosses/pixel/01-xilith.png.base64", hdStem: "04-xilith-game", hdParts: 0, hdMime: "image/webp" },
  5: { name: "Thalor, Titan of Steel", sprite: "/assets/bosses/pixel/02-thalor.png.base64", hdStem: "05-thalor-game", hdParts: 0, hdMime: "image/webp" },
  6: { name: "Nyxara, Weaver of Nightmares", sprite: "/assets/bosses/pixel/07-nyxara.png.base64", hdStem: "06-nyxara-game", hdParts: 0, hdMime: "image/webp" },
  7: { name: "Kaelstrom, Eternal Storm", sprite: "/assets/bosses/pixel/05-kaelstrom.png.base64", hdStem: "07-kaelstrom-game", hdParts: 0, hdMime: "image/webp" },
  8: { name: "Oblivion, Final Consumer", sprite: "/assets/bosses/pixel/08-oblivion.png.base64", hdStem: "08-oblivion-game", hdParts: 0, hdMime: "image/webp" }
};

/* Preserve combat mechanics, HP, difficulty and attacks. Only the boss identity
   and visual are replaced, following the exact Act I -> Act VIII poster order. */
for (const region of REGIONS) {
  const theme = BOSS_PIXEL_THEMES[region.id];
  if (theme) region.boss.name = theme.name;
}

export const bossPixelSpriteForRegion = (regionId: number) =>
  BOSS_PIXEL_THEMES[regionId]?.sprite ?? BOSS_PIXEL_THEMES[1].sprite;

export const bossHdSpritePartsForRegion = (regionId: number) => {
  const theme = BOSS_PIXEL_THEMES[regionId] ?? BOSS_PIXEL_THEMES[1];
  if (!theme.hdParts) return [];
  return Array.from({ length: theme.hdParts }, (_, index) =>
    `/assets/bosses/hd/${theme.hdStem}.webp.base64.part${String(index + 1).padStart(2, "0")}`
  );
};

export const bossHdSpriteMimeForRegion = (regionId: number) =>
  (BOSS_PIXEL_THEMES[regionId] ?? BOSS_PIXEL_THEMES[1]).hdMime;

export const bossPixelNameForRegion = (regionId: number) =>
  BOSS_PIXEL_THEMES[regionId]?.name ?? BOSS_PIXEL_THEMES[1].name;
