import React, { useMemo, useState } from "react";

import { isBossLabEnabled } from "../../../game/bossLabAccess";
import { BOSS_PIXEL_THEMES, type BossAssetStatus } from "../../../game/bossPixelSprites";
import { goalQuestAssets, goalQuestCharacters, goalQuestRegions, useGoalQuestStore } from "../../../stores/goalQuestStore";
import { publicAssetPath } from "../utils";

const statusLabel = (status: BossAssetStatus) => status.toUpperCase();

export default function BossLab() {
  const [open, setOpen] = useState(false);
  const character = useGoalQuestStore((state) => state.character);
  const selectCharacter = useGoalQuestStore((state) => state.selectCharacter);

  const auditCounts = useMemo(() => {
    const counts: Record<BossAssetStatus, number> = { ready: 0, pending: 0, invalid: 0 };
    goalQuestRegions.forEach((region) => {
      const status = BOSS_PIXEL_THEMES[region.id]?.assetStatus ?? "pending";
      counts[status] += 1;
    });
    return counts;
  }, []);

  if (!isBossLabEnabled()) return null;

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
            <strong>COMBAT QA · STRICT HD</strong>
            <small>PIXEL FALLBACK BLOCKED</small>
          </div>

          <div className="boss-lab-audit" aria-label="Boss HD readiness summary">
            <div className="boss-lab-audit-card is-ready"><span>READY</span><strong>{auditCounts.ready}/8</strong></div>
            <div className="boss-lab-audit-card is-pending"><span>PENDING</span><strong>{auditCounts.pending}/8</strong></div>
            <div className="boss-lab-audit-card is-invalid"><span>INVALID</span><strong>{auditCounts.invalid}/8</strong></div>
          </div>

          <p className="boss-lab-warning">
            Boss Lab never hides missing art. A non-ready boss will show an asset error inside the arena instead of the old sprite.
          </p>

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
            <span>BOSS FIGHTS · HD AUDIT</span>
            <div className="boss-lab-bosses">
              {goalQuestRegions.map((region) => {
                const theme = BOSS_PIXEL_THEMES[region.id];
                const status = theme?.assetStatus ?? "pending";
                return (
                  <button
                    key={region.id}
                    type="button"
                    className={`boss-lab-boss boss-lab-boss--${status}`}
                    onClick={() => launchBoss(region.id)}
                    title={theme?.auditNote ?? "No HD audit metadata"}
                  >
                    <i>{region.id}</i>
                    <span>
                      <b>{region.name}</b>
                      <small>{region.boss.name}</small>
                    </span>
                    <em className={`boss-lab-status boss-lab-status--${status}`}>{statusLabel(status)}</em>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </aside>
  );
}
