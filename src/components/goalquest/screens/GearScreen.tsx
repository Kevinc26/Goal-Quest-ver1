import React, { useEffect, useMemo, useState } from "react";

import {
  GEAR_SLOT_LABELS,
  getEquippedItems,
  getGearForCharacter,
  getNextGearReward,
  isGearUnlocked,
  loadEquipment,
  saveEquipment,
  type EquippedGear,
  type GearItem
} from "../../../game/gear";
import { goalQuestAssets, useGoalQuestStore } from "../../../stores/goalQuestStore";
import HeroGearVisuals from "../gear/HeroGearVisuals";
import { publicAssetPath } from "../utils";

const EMPTY_EQUIPMENT: EquippedGear = {
  weapon: null,
  armor: null,
  relic: null,
  aura: null
};

export default function GearScreen() {
  const character = useGoalQuestStore((state) => state.character);
  const stats = useGoalQuestStore((state) => state.stats);
  const setScreen = useGoalQuestStore((state) => state.setScreen);
  const [equipment, setEquipment] = useState<EquippedGear>(EMPTY_EQUIPMENT);

  useEffect(() => {
    if (!character) {
      return;
    }
    setEquipment(loadEquipment(character.id, stats));
  }, [character, stats.level]);

  const gear = useMemo(() => (character ? getGearForCharacter(character.id) : []), [character]);
  const equippedItems = character ? getEquippedItems(character.id, stats, equipment) : [];
  const unlockedCount = gear.filter((item) => isGearUnlocked(item, stats)).length;
  const nextReward = character ? getNextGearReward(character.id, stats) : null;

  if (!character) {
    return (
      <div className="game-screen active gear-screen">
        <button type="button" className="gear-back-button" onClick={() => setScreen("start")}>← BACK</button>
        <div className="gear-empty-state">
          <div className="gear-empty-icon">◇</div>
          <h2>NO HERO SELECTED</h2>
          <p>Choose a class before building your loadout.</p>
          <button type="button" className="gear-primary-button" onClick={() => setScreen("characters")}>CHOOSE CLASS</button>
        </div>
      </div>
    );
  }

  const spriteSrc = publicAssetPath(goalQuestAssets.classes[character.id]);

  const toggleGear = (item: GearItem) => {
    if (!isGearUnlocked(item, stats)) {
      return;
    }

    setEquipment((current) => {
      const next = {
        ...current,
        [item.slot]: current[item.slot] === item.id ? null : item.id
      };
      saveEquipment(character.id, next);
      return next;
    });
  };

  return (
    <div className="game-screen active gear-screen" style={{ "--gear-accent": character.color } as React.CSSProperties}>
      <button type="button" className="gear-back-button" onClick={() => setScreen("start")}>← BACK</button>

      <header className="gear-header">
        <p className="gear-kicker">HERO LOADOUT</p>
        <h2>GEAR & EVOLUTION</h2>
        <p>Level up by completing real quests. New milestones unlock visible rewards for your hero.</p>
      </header>

      <section className="gear-hero-panel">
        <div className="gear-hero-stage">
          <HeroGearVisuals items={equippedItems} />
          <img src={spriteSrc} alt={character.name} className="gear-hero-sprite" loading="eager" decoding="async" />
          <span className="gear-hero-platform" aria-hidden="true" />
        </div>

        <div className="gear-hero-copy">
          <div className="gear-hero-level">LV. {stats.level} • {character.name}</div>
          <h3>{unlockedCount === 4 ? "MASTER LOADOUT" : `${unlockedCount}/4 REWARDS UNLOCKED`}</h3>
          <p>
            {nextReward
              ? `Next reward: ${nextReward.name} at Level ${nextReward.unlockLevel}.`
              : "All current evolution rewards unlocked. More tiers can be added later."}
          </p>
          <div className="gear-progress-track" aria-hidden="true">
            <span style={{ width: `${(unlockedCount / 4) * 100}%` }} />
          </div>
        </div>
      </section>

      <section className="gear-collection" aria-label="Gear collection">
        {gear.map((item) => {
          const unlocked = isGearUnlocked(item, stats);
          const equipped = equipment[item.slot] === item.id;

          return (
            <article key={item.id} className={`gear-card ${unlocked ? "unlocked" : "locked"} ${equipped ? "equipped" : ""}`}>
              <div className="gear-card-topline">
                <span className="gear-slot-label">{GEAR_SLOT_LABELS[item.slot]}</span>
                <span className={`gear-status ${equipped ? "equipped" : unlocked ? "available" : "locked"}`}>
                  {equipped ? "EQUIPPED" : unlocked ? "UNLOCKED" : `LV ${item.unlockLevel}`}
                </span>
              </div>

              <div className="gear-item-symbol" aria-hidden="true">{unlocked ? item.symbol : "?"}</div>
              <h3>{unlocked ? item.name : "LOCKED REWARD"}</h3>
              <p>{unlocked ? item.description : `Reach Level ${item.unlockLevel} to reveal this ${GEAR_SLOT_LABELS[item.slot].toLowerCase()}.`}</p>

              <button
                type="button"
                className="gear-equip-button"
                onClick={() => toggleGear(item)}
                disabled={!unlocked}
              >
                {equipped ? "UNEQUIP" : unlocked ? "EQUIP" : `LOCKED • LV ${item.unlockLevel}`}
              </button>
            </article>
          );
        })}
      </section>

      <div className="gear-explainer">
        <span>✦</span>
        <p>Gear is cosmetic in this first version. It changes your hero’s visual presentation without affecting combat balance.</p>
      </div>
    </div>
  );
}
