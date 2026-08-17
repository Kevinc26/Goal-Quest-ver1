export const BOSS_PIXEL_SPRITES: Record<number, string> = {
  1: "/assets/bosses/pixel/01-xilith.png",
  2: "/assets/bosses/pixel/02-thalor.png",
  3: "/assets/bosses/pixel/03-urzag.png",
  4: "/assets/bosses/pixel/04-maldrak.png",
  5: "/assets/bosses/pixel/05-kaelstrom.png",
  6: "/assets/bosses/pixel/06-zephyrion.png",
  7: "/assets/bosses/pixel/07-nyxara.png",
  8: "/assets/bosses/pixel/08-oblivion.png"
};

export const bossPixelSpriteForRegion = (regionId: number) => BOSS_PIXEL_SPRITES[regionId] ?? BOSS_PIXEL_SPRITES[1];
