export type BossSceneTheme = {
  regionId: number;
  epithet: string;
  encounterLine: string;
  arenaLabel: string;
  bossGlyph: string;
  bossClass: string;
  atmosphere: string;
  attackFx: Record<string, string>;
};

export const BOSS_SCENES: Record<number, BossSceneTheme> = {
  1: {
    regionId: 1,
    epithet: "THE CHAOS THAT FEEDS ON UNFINISHED THOUGHTS",
    encounterLine: "The forest twists as disorder takes form.",
    arenaLabel: "CHAOS FOREST · THE FRACTURED GROVE",
    bossGlyph: "✦",
    bossClass: "boss-dragon-disorder",
    atmosphere: "chaos",
    attackFx: { Confusion: "fx-confusion", Procrastination: "fx-procrastination", Distraction: "fx-distraction" }
  },
  2: {
    regionId: 2,
    epithet: "THE WEIGHT OF WHO YOU USED TO BE",
    encounterLine: "The mountain remembers every version of you that refused to change.",
    arenaLabel: "MOUNTAIN OF IDENTITY · MIRROR SUMMIT",
    bossGlyph: "◆",
    bossClass: "boss-golem-old-self",
    atmosphere: "mountain",
    attackFx: { "Self-Criticism": "fx-stone-crush", Doubt: "fx-doubt", "Fear of Change": "fx-shackle" }
  },
  3: {
    regionId: 3,
    epithet: "EVERY BAD HABIT GROWS ANOTHER HEAD",
    encounterLine: "The city answers your routines with a many-headed shadow.",
    arenaLabel: "CITY OF INFLUENCE · BROKEN PLAZA",
    bossGlyph: "♜",
    bossClass: "boss-hydra-habits",
    atmosphere: "city",
    attackFx: { Temptation: "fx-temptation", "Negative Routine": "fx-routine", "Toxic Influence": "fx-toxic" }
  },
  4: {
    regionId: 4,
    epithet: "A FLAME THAT BURNS WITHOUT PURPOSE",
    encounterLine: "Heat ripples across the dunes. Discouragement takes flight.",
    arenaLabel: "DESERT OF MOTIVATION · SUNKEN ALTAR",
    bossGlyph: "☀",
    bossClass: "boss-phoenix-discouragement",
    atmosphere: "desert",
    attackFx: { Discouragement: "fx-ashfall", "Lack of Purpose": "fx-eclipse", Burnout: "fx-burnout" }
  },
  5: {
    regionId: 5,
    epithet: "THE DEEP PULL OF EVERY EXCUSE",
    encounterLine: "The ocean goes still before the thing beneath it rises.",
    arenaLabel: "OCEAN OF DISCIPLINE · DROWNED TEMPLE",
    bossGlyph: "≋",
    bossClass: "boss-kraken-laziness",
    atmosphere: "ocean",
    attackFx: { Laziness: "fx-tentacle", Excuses: "fx-mist", "Self-Deception": "fx-ink" }
  },
  6: {
    regionId: 6,
    epithet: "THE STORM BETWEEN AN IDEA AND THE FIRST STEP",
    encounterLine: "Thunder rolls through an empty sky. The blank page roars back.",
    arenaLabel: "SKY OF CREATIVITY · SHATTERED AERIE",
    bossGlyph: "ϟ",
    bossClass: "boss-dragon-block",
    atmosphere: "sky",
    attackFx: { "Creative Block": "fx-static", Perfectionism: "fx-crystal", "Fear of Failure": "fx-fall" }
  },
  7: {
    regionId: 7,
    epithet: "FEAR GIVEN A VOICE",
    encounterLine: "The ground cracks. Anxiety steps through the fire.",
    arenaLabel: "HELL OF FEAR · THE RED GATE",
    bossGlyph: "✚",
    bossClass: "boss-demon-anxiety",
    atmosphere: "hell",
    attackFx: { Anxiety: "fx-anxiety", Panic: "fx-panic", Paralysis: "fx-paralysis" }
  },
  8: {
    regionId: 8,
    epithet: "PERFECTION WITHOUT BALANCE BECOMES A CAGE",
    encounterLine: "At the edge of the journey, even harmony must be challenged.",
    arenaLabel: "SKY OF HARMONY · CELESTIAL THRESHOLD",
    bossGlyph: "✧",
    bossClass: "boss-angel-balance",
    atmosphere: "harmony",
    attackFx: { Imbalance: "fx-imbalance", Obsession: "fx-obsession", Burnout: "fx-whiteout" }
  }
};

export const bossSceneForRegion = (regionId: number) => BOSS_SCENES[regionId] ?? BOSS_SCENES[1];

export const classBattleFx: Record<number, { weak: string; medium: string; strong: string; aura: string }> = {
  1: { weak: "player-magic-bolt", medium: "player-magic-lance", strong: "player-magic-fire", aura: "aura-mage" },
  2: { weak: "player-sword-slash", medium: "player-knight-lunge", strong: "player-knight-breaker", aura: "aura-knight" },
  3: { weak: "player-light-hit", medium: "player-heal-pulse", strong: "player-radiant-burst", aura: "aura-healer" },
  4: { weak: "player-shield-bash", medium: "player-tank-guard", strong: "player-fortress-breaker", aura: "aura-tank" },
  5: { weak: "player-arrow-shot", medium: "player-focus-arrow", strong: "player-arrow-volley", aura: "aura-archer" },
  6: { weak: "player-sacred-hit", medium: "player-clarity-ray", strong: "player-balance-judgment", aura: "aura-cleric" },
  7: { weak: "player-ninja-strike", medium: "player-shadow-cut", strong: "player-distraction-break", aura: "aura-ninja" },
  8: { weak: "player-flask-toss", medium: "player-mixture", strong: "player-transmutation", aura: "aura-alchemist" }
};