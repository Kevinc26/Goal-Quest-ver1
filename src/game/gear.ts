import { readBonusGearUnlocks } from "./retention";
import type { Stats } from "./types";

export type GearSlot = "weapon" | "armor" | "relic" | "aura";

export interface GearItem {
  id: string;
  characterId: number;
  slot: GearSlot;
  name: string;
  symbol: string;
  unlockLevel: number;
  description: string;
}

export type EquippedGear = Record<GearSlot, string | null>;

const EMPTY_EQUIPMENT: EquippedGear = {
  weapon: null,
  armor: null,
  relic: null,
  aura: null
};

const CLASS_GEAR: Record<number, Array<Omit<GearItem, "id" | "characterId" | "unlockLevel">>> = {
  1: [
    { slot: "weapon", name: "Clarity Staff", symbol: "✦", description: "A focus catalyst earned through early consistency." },
    { slot: "armor", name: "Arcane Focus Robes", symbol: "▣", description: "Robes worn by adventurers who keep showing up." },
    { slot: "relic", name: "Mind Crystal", symbol: "◆", description: "A crystal that reflects a disciplined mind." },
    { slot: "aura", name: "Astral Aura", symbol: "✧", description: "A visible mark of sustained transformation." }
  ],
  2: [
    { slot: "weapon", name: "Willpower Blade", symbol: "⚔", description: "A blade forged by repeated action, not motivation." },
    { slot: "armor", name: "Iron Discipline Armor", symbol: "▣", description: "Armor earned by building routines that hold under pressure." },
    { slot: "relic", name: "Resolve Crest", symbol: "◆", description: "A crest carried by those who keep their promises to themselves." },
    { slot: "aura", name: "Vanguard Aura", symbol: "✦", description: "A golden presence reserved for proven consistency." }
  ],
  3: [
    { slot: "weapon", name: "Vitality Staff", symbol: "✚", description: "A restorative focus earned through steady progress." },
    { slot: "armor", name: "Renewal Vestments", symbol: "▣", description: "Light armor symbolizing recovery and sustainable effort." },
    { slot: "relic", name: "Restorative Charm", symbol: "◆", description: "A charm that represents making space to recover." },
    { slot: "aura", name: "Bloom Aura", symbol: "✦", description: "A living glow that marks long-term renewal." }
  ],
  4: [
    { slot: "weapon", name: "Resolve Hammer", symbol: "◆", description: "A heavy symbol of staying steady when pressure rises." },
    { slot: "armor", name: "Bastion Plate", symbol: "▣", description: "Plate forged from repeated acts of resilience." },
    { slot: "relic", name: "Stoneheart Sigil", symbol: "◆", description: "A sigil awarded for enduring without losing direction." },
    { slot: "aura", name: "Fortress Aura", symbol: "✦", description: "A protective glow earned through dependable effort." }
  ],
  5: [
    { slot: "weapon", name: "Focus Bow", symbol: "➶", description: "A bow awarded for choosing one target and following through." },
    { slot: "armor", name: "Precision Leathers", symbol: "▣", description: "Light gear for adventurers who cut through distraction." },
    { slot: "relic", name: "Hawk Eye Charm", symbol: "◆", description: "A charm representing deliberate attention." },
    { slot: "aura", name: "Wind Aura", symbol: "✦", description: "A swift glow earned by mastering focused momentum." }
  ],
  6: [
    { slot: "weapon", name: "Balance Scepter", symbol: "✧", description: "A scepter earned by progressing without losing your center." },
    { slot: "armor", name: "Harmony Vestments", symbol: "▣", description: "Vestments that represent sustainable balance." },
    { slot: "relic", name: "Centered Sigil", symbol: "◆", description: "A sigil for keeping competing priorities in harmony." },
    { slot: "aura", name: "Sacred Aura", symbol: "✦", description: "A calm glow earned through consistent balance." }
  ],
  7: [
    { slot: "weapon", name: "Swift Kunai", symbol: "✣", description: "A quick weapon earned by building reliable momentum." },
    { slot: "armor", name: "Shadow Wraps", symbol: "▣", description: "Flexible gear for moving cleanly between priorities." },
    { slot: "relic", name: "Momentum Charm", symbol: "◆", description: "A charm representing speed without chaos." },
    { slot: "aura", name: "Phantom Aura", symbol: "✦", description: "A sharp aura earned through sustained agility." }
  ],
  8: [
    { slot: "weapon", name: "Focus Flask", symbol: "⚗", description: "A catalyst awarded for turning intention into action." },
    { slot: "armor", name: "Catalyst Coat", symbol: "▣", description: "A coat worn by adventurers who keep changing deliberately." },
    { slot: "relic", name: "Transmutation Core", symbol: "◆", description: "A core representing habits transformed through repetition." },
    { slot: "aura", name: "Prism Aura", symbol: "✦", description: "A shifting glow earned through long-term transformation." }
  ]
};

const SLOT_LEVELS: Record<GearSlot, number> = {
  weapon: 2,
  armor: 4,
  relic: 7,
  aura: 10
};

export const GEAR_SLOT_LABELS: Record<GearSlot, string> = {
  weapon: "WEAPON",
  armor: "ARMOR",
  relic: "RELIC",
  aura: "AURA"
};

export const getGearForCharacter = (characterId: number): GearItem[] =>
  (CLASS_GEAR[characterId] ?? []).map((item) => ({
    ...item,
    id: `${characterId}-${item.slot}`,
    characterId,
    unlockLevel: SLOT_LEVELS[item.slot]
  }));

export const getGearUnlockedAtLevel = (characterId: number, level: number) =>
  getGearForCharacter(characterId).find((item) => item.unlockLevel === level) ?? null;

export const isGearUnlocked = (item: GearItem, stats: Stats) =>
  stats.level >= item.unlockLevel || readBonusGearUnlocks(item.characterId).includes(item.id);

export const getNextGearReward = (characterId: number, stats: Stats) =>
  getGearForCharacter(characterId)
    .filter((item) => !isGearUnlocked(item, stats))
    .sort((a, b) => a.unlockLevel - b.unlockLevel)[0] ?? null;

const storageKey = (characterId: number) => `goalquest_gear_v1_${characterId}`;

export const defaultEquipmentFor = (characterId: number, stats: Stats): EquippedGear => {
  const equipment = { ...EMPTY_EQUIPMENT };
  for (const item of getGearForCharacter(characterId)) {
    if (isGearUnlocked(item, stats)) {
      equipment[item.slot] = item.id;
    }
  }
  return equipment;
};

export const loadEquipment = (characterId: number, stats: Stats): EquippedGear => {
  if (typeof window === "undefined") {
    return defaultEquipmentFor(characterId, stats);
  }

  const raw = window.localStorage.getItem(storageKey(characterId));
  if (!raw) {
    return defaultEquipmentFor(characterId, stats);
  }

  try {
    const parsed = JSON.parse(raw) as Partial<EquippedGear>;
    const available = getGearForCharacter(characterId);
    const equipment = { ...EMPTY_EQUIPMENT };

    for (const slot of Object.keys(EMPTY_EQUIPMENT) as GearSlot[]) {
      const candidate = parsed[slot] ?? null;
      const item = available.find((gear) => gear.id === candidate && gear.slot === slot);
      equipment[slot] = item && isGearUnlocked(item, stats) ? item.id : null;
    }

    return equipment;
  } catch {
    return defaultEquipmentFor(characterId, stats);
  }
};

export const saveEquipment = (characterId: number, equipment: EquippedGear) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(storageKey(characterId), JSON.stringify(equipment));
  window.dispatchEvent(new CustomEvent("goalquest:equipment-changed", { detail: { characterId } }));
};

export const getEquippedItems = (characterId: number, stats: Stats, equipment: EquippedGear) => {
  const items = getGearForCharacter(characterId);
  return items.filter((item) => equipment[item.slot] === item.id && isGearUnlocked(item, stats));
};
