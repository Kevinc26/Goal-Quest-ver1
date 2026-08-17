import { REGIONS } from "./data";

export const BOSS_PIXEL_THEMES: Record<number, { name: string; sprite: string }> = {
  1: { name: "Xilith, Queen of Chaos", sprite: "/assets/bosses/pixel/01-xilith.png.base64" },
  2: { name: "Thalor, Titan of Steel", sprite: "/assets/bosses/pixel/02-thalor.png.base64" },
  3: { name: "Urzag, Devourer of Habits", sprite: "/assets/bosses/pixel/03-urzag.png.base64" },
  4: { name: "Maldrak, Heart of Fire", sprite: "/assets/bosses/pixel/04-maldrak.png.base64" },
  5: { name: "Kaelstrom, Eternal Storm", sprite: "/assets/bosses/pixel/05-kaelstrom.png.base64" },
  6: { name: "Zephyrion, Thief of Time", sprite: "/assets/bosses/pixel/06-zephyrion.png.base64" },
  7: { name: "Nyxara, Weaver of Nightmares", sprite: "/assets/bosses/pixel/07-nyxara.png.base64" },
  8: { name: "Oblivion, Final Consumer", sprite: "/assets/bosses/pixel/08-oblivion.png.base64" }
};

/* Keep the existing combat mechanics, HP, difficulty and attacks, but make the
   boss identity shown throughout the app match the new pixel-art roster. */
for (const region of REGIONS) {
  const theme = BOSS_PIXEL_THEMES[region.id];
  if (theme) {
    region.boss.name = theme.name;
  }
}

export const bossPixelSpriteForRegion = (regionId: number) =>
  BOSS_PIXEL_THEMES[regionId]?.sprite ?? BOSS_PIXEL_THEMES[1].sprite;

export const bossPixelNameForRegion = (regionId: number) =>
  BOSS_PIXEL_THEMES[regionId]?.name ?? BOSS_PIXEL_THEMES[1].name;
