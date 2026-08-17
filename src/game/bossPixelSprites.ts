export const BOSS_PIXEL_SPRITES: Record<number, string> = {
  1: "/assets/bosses/pixel/01-xilith.png.base64",
  2: "/assets/bosses/pixel/02-thalor.png.base64",
  3: "/assets/bosses/pixel/03-urzag.png.base64",
  4: "/assets/bosses/pixel/04-maldrak.png.base64",
  5: "/assets/bosses/pixel/05-kaelstrom.png.base64",
  6: "/assets/bosses/pixel/06-zephyrion.png.base64",
  7: "/assets/bosses/pixel/07-nyxara.png.base64",
  8: "/assets/bosses/pixel/08-oblivion.png.base64"
};

export const bossPixelSpriteForRegion = (regionId: number) => BOSS_PIXEL_SPRITES[regionId] ?? BOSS_PIXEL_SPRITES[1];
