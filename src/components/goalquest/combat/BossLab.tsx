import React, { useState } from "react";

import { goalQuestAssets, goalQuestCharacters, goalQuestRegions, useGoalQuestStore } from "../../../stores/goalQuestStore";
import { publicAssetPath } from "../utils";

const bossLabEnabled = () => {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("bosslab") === "1";
};

export default function BossLab() {
  const [open, setOpen] = useState(false);
  const character = useGoalQuestStore((state) => state.character);
  const selectCharacter = useGoalQuestStore((state) => state.selectCharacter);

  if (!bossLabEnabled()) return null;

  const launchBoss = (regionId: number) => {
    const state = useGoalQuestStore.getState();
    const region = goalQuestRegions.find((entry) => entry.id === regionId);
    if (!region) return;

    if (!state.character) {
      selectCharacter(1);
    }

    const live = useGoalQuestStore.getState();
    useGoalQuestStore.setState({
      currentRegion: regionId,
      currentCombat: {
        regionId,
        enemyCurrentHp: region.boss.hp,
        playerHp: live.stats.maxHp,
        playerMp: live.stats.maxMp,
        playerEffects: [],
        bossEffects: [],
        outcome: "active",
        turn: 0,
        log: [`Boss Lab: battle begins against ${region.boss.name}`]
      },
      stats: {
        ...live.stats,
        hp: live.stats.maxHp,
        mp: live.stats.maxMp
      },
      screen: "combat"
    });
  };

  return (
    <aside className={`boss-lab ${open ? "boss-lab--open" : ""}`} aria-label="GoalQuest boss testing lab">
      <button type="button" className="boss-lab-toggle" onClick={() => setOpen((value) => !value)}>
        {open ? "×" : "⚙"} <span>BOSS LAB</span>
      </button>

      {open ? (
        <div className="boss-lab-panel">
          <div className="boss-lab-heading">
            <strong>COMBAT QA</strong>
            <small>Hidden test mode</small>
          </div>

          <div className="boss-lab-section">
            <span>HERO · EXACT IN-GAME SPRITES</span>
            <div className="boss-lab-classes">
              {goalQuestCharacters.map((entry) => (
                <button
                  key={entry.id}
                  type="button"
                  className={character?.id === entry.id ? "active" : ""}
                  onClick={() => selectCharacter(entry.id)}
                  title={entry.name}
                  aria-label={`Select ${entry.name}`}
                >
                  <img src={publicAssetPath(goalQuestAssets.classes[entry.id])} alt="" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>

          <div className="boss-lab-section">
            <span>BOSS FIGHTS</span>
            <div className="boss-lab-bosses">
              {goalQuestRegions.map((region) => (
                <button key={region.id} type="button" onClick={() => launchBoss(region.id)}>
                  <i>{region.id}</i>
                  <span><b>{region.name}</b><small>{region.boss.name}</small></span>
                  <em>FIGHT</em>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </aside>
  );
}
