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
    epithet: "THE HUNGER BENEATH THE ROOTS",
    encounterLine: "Roots split. Stone burns. Something ancient feeds beneath the grove.",
    arenaLabel: "CINDERROOT WILDS · THE FRACTURED GROVE",
    bossGlyph: "✦",
    bossClass: "boss-dragon-disorder",
    atmosphere: "chaos",
    attackFx: { Confusion: "fx-confusion", Procrastination: "fx-procrastination", Distraction: "fx-distraction" }
  },
  2: {
    regionId: 2,
    epithet: "THE THIEF BETWEEN SECONDS",
    encounterLine: "The bells stop. Time folds around the summit.",
    arenaLabel: "CHRONOSPIRE HEIGHTS · THE BROKEN HOUR",
    bossGlyph: "◆",
    bossClass: "boss-golem-old-self",
    atmosphere: "mountain",
    attackFx: { "Self-Criticism": "fx-stone-crush", Doubt: "fx-doubt", "Fear of Change": "fx-shackle" }
  },
  3: {
    regionId: 3,
    epithet: "THE FLAME THAT REFUSES TO DIE",
    encounterLine: "The forge awakens. Lava answers Maldrak's heartbeat.",
    arenaLabel: "ASHEN CRUCIBLE · HEARTFORGE CALDERA",
    bossGlyph: "♜",
    bossClass: "boss-hydra-habits",
    atmosphere: "city",
    attackFx: { Temptation: "fx-temptation", "Negative Routine": "fx-routine", "Toxic Influence": "fx-toxic" }
  },
  4: {
    regionId: 4,
    epithet: "BEAUTY WITHOUT ORDER BECOMES MADNESS",
    encounterLine: "The veil opens. Every thorn bends toward the queen.",
    arenaLabel: "THORNVEIL COURT · THE CHAOS BLOOM",
    bossGlyph: "☀",
    bossClass: "boss-phoenix-discouragement",
    atmosphere: "desert",
    attackFx: { Discouragement: "fx-ashfall", "Lack of Purpose": "fx-eclipse", Burnout: "fx-burnout" }
  },
  5: {
    regionId: 5,
    epithet: "THE TITAN FORGED BENEATH THE ICE",
    encounterLine: "Metal groans beneath the glacier. Thalor begins to move.",
    arenaLabel: "FROSTIRON DEPTHS · THE FROZEN FOUNDRY",
    bossGlyph: "≋",
    bossClass: "boss-kraken-laziness",
    atmosphere: "ocean",
    attackFx: { Laziness: "fx-tentacle", Excuses: "fx-mist", "Self-Deception": "fx-ink" }
  },
  6: {
    regionId: 6,
    epithet: "SHE WEAVES WHAT YOU FEAR TO SEE",
    encounterLine: "The sky goes black. Threads of nightmare tighten around the path.",
    arenaLabel: "DREAMLESS VEIL · THE HOLLOW LOOM",
    bossGlyph: "ϟ",
    bossClass: "boss-dragon-block",
    atmosphere: "sky",
    attackFx: { "Creative Block": "fx-static", Perfectionism: "fx-crystal", "Fear of Failure": "fx-fall" }
  },
  7: {
    regionId: 7,
    epithet: "THE STORM THAT NEVER ENDS",
    encounterLine: "The heavens split. Kaelstrom descends with the thunder.",
    arenaLabel: "TEMPEST CROWN · STORMBREAK CITADEL",
    bossGlyph: "✚",
    bossClass: "boss-demon-anxiety",
    atmosphere: "hell",
    attackFx: { Anxiety: "fx-anxiety", Panic: "fx-panic", Paralysis: "fx-paralysis" }
  },
  8: {
    regionId: 8,
    epithet: "WHEN EVERYTHING ENDS, OBLIVION REMAINS",
    encounterLine: "Beyond the last gate, the light itself is being consumed.",
    arenaLabel: "SHATTERED HEAVENS · CELESTIAL THRESHOLD",
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