import React, { useEffect, useMemo, useState } from "react";

import { getGearForCharacter, isGearUnlocked } from "../../../game/gear";
import {
  DAILY_CHEST_EXP,
  GEAR_FORGE_COST,
  WEEKLY_BOSS_EXP,
  WEEKLY_QUEST_GOAL,
  localRetentionDateKey,
  nextStreakMilestone
} from "../../../game/retention";
import { trackQuestEvent } from "../../../lib/questEvents";
import { goalQuestAssets, goalQuestRegions, useGoalQuestStore } from "../../../stores/goalQuestStore";
import { useRetentionStore, type WeeklyAction } from "../../../stores/retentionStore";
import { useGoalQuestAuth } from "../auth/AuthProvider";
import BossSprite from "../combat/BossSprite";
import { percent, publicAssetPath } from "../utils";

const grantHeroExp = (reward: number) => {
  useGoalQuestStore.setState((state) => {
    let level = state.stats.level;
    let maxHp = state.stats.maxHp;
    let maxMp = state.stats.maxMp;
    let nextLevelExp = state.stats.nextLevelExp;
    const exp = state.stats.exp + reward;

    while (exp >= nextLevelExp) {
      level += 1;
      maxHp += 10;
      maxMp += 10;
      nextLevelExp = Math.floor(nextLevelExp * 1.5);
      if (level >= 100) break;
    }

    const leveled = level > state.stats.level;
    return {
      stats: {
        ...state.stats,
        exp,
        dailyExp: state.stats.dailyExp + reward,
        level,
        maxHp,
        maxMp,
        hp: leveled ? maxHp : state.stats.hp,
        mp: leveled ? maxMp : state.stats.mp,
        nextLevelExp
      }
    };
  });
};

const encounterActionLabel: Record<WeeklyAction, string> = {
  focus: "FOCUS STRIKE",
  guard: "GUARD STRIKE",
  burst: "EMBER BURST"
};

export default function RetentionJourneyPanel() {
  const auth = useGoalQuestAuth();
  const screen = useGoalQuestStore((state) => state.screen);
  const character = useGoalQuestStore((state) => state.character);
  const stats = useGoalQuestStore((state) => state.stats);
  const todayCompleted = useGoalQuestStore((state) => state.todayCompleted);

  const weekKey = useRetentionStore((state) => state.weekKey);
  const weeklyQuestProgress = useRetentionStore((state) => state.weeklyQuestProgress);
  const weeklyBossRegionId = useRetentionStore((state) => state.weeklyBossRegionId);
  const weeklyBossDefeated = useRetentionStore((state) => state.weeklyBossDefeated);
  const dailyChestClaimedDate = useRetentionStore((state) => state.dailyChestClaimedDate);
  const dailyChestXpGrantedDate = useRetentionStore((state) => state.dailyChestXpGrantedDate);
  const weeklyXpGrantedKey = useRetentionStore((state) => state.weeklyXpGrantedKey);
  const gearFragments = useRetentionStore((state) => state.gearFragments);
  const celebration = useRetentionStore((state) => state.celebration);
  const weeklyEncounterOpen = useRetentionStore((state) => state.weeklyEncounterOpen);
  const weeklyBossHp = useRetentionStore((state) => state.weeklyBossHp);
  const weeklyBossMaxHp = useRetentionStore((state) => state.weeklyBossMaxHp);
  const weeklyPlayerResolve = useRetentionStore((state) => state.weeklyPlayerResolve);
  const weeklyPlayerMaxResolve = useRetentionStore((state) => state.weeklyPlayerMaxResolve);
  const weeklyBurstUsed = useRetentionStore((state) => state.weeklyBurstUsed);
  const weeklyEncounterOutcome = useRetentionStore((state) => state.weeklyEncounterOutcome);
  const weeklyEncounterLog = useRetentionStore((state) => state.weeklyEncounterLog);

  const claimDailyChest = useRetentionStore((state) => state.claimDailyChest);
  const markDailyXpGranted = useRetentionStore((state) => state.markDailyXpGranted);
  const markWeeklyXpGranted = useRetentionStore((state) => state.markWeeklyXpGranted);
  const openWeeklyEncounter = useRetentionStore((state) => state.openWeeklyEncounter);
  const weeklyAttack = useRetentionStore((state) => state.weeklyAttack);
  const retryWeeklyEncounter = useRetentionStore((state) => state.retryWeeklyEncounter);
  const closeWeeklyEncounter = useRetentionStore((state) => state.closeWeeklyEncounter);
  const forgeGear = useRetentionStore((state) => state.forgeGear);
  const dismissCelebration = useRetentionStore((state) => state.dismissCelebration);

  const [open, setOpen] = useState(false);
  const today = localRetentionDateKey();
  const visible = Boolean(character) && ["start", "world", "daily", "gear"].includes(screen);
  const weeklyRegion = goalQuestRegions.find((region) => region.id === weeklyBossRegionId) ?? goalQuestRegions[0];
  const weeklyReady = weeklyQuestProgress >= WEEKLY_QUEST_GOAL && !weeklyBossDefeated;
  const weeklyPercent = percent(Math.min(weeklyQuestProgress, WEEKLY_QUEST_GOAL), WEEKLY_QUEST_GOAL);
  const dailyChestReady = todayCompleted && dailyChestClaimedDate !== today;
  const nextMilestone = nextStreakMilestone(stats.dailyStreak);

  const nextGear = useMemo(() => {
    if (!character) return null;
    return getGearForCharacter(character.id).find((item) => !isGearUnlocked(item, stats)) ?? null;
  }, [character, gearFragments, stats.level, celebration?.id]);

  useEffect(() => {
    if (!weekKey || !weeklyBossDefeated || weeklyXpGrantedKey === weekKey) return;
    grantHeroExp(WEEKLY_BOSS_EXP);
    markWeeklyXpGranted(weekKey);

    if (auth.session) {
      void trackQuestEvent(auth.session, {
        eventType: "weekly_boss_defeated",
        source: "retention",
        regionId: weeklyBossRegionId,
        xpAwarded: WEEKLY_BOSS_EXP,
        metadata: { localDate: today, weekKey }
      }).catch((error) => console.warn("GoalQuest weekly reward analytics failed", error));
    }
  }, [auth.session?.access_token, markWeeklyXpGranted, today, weekKey, weeklyBossDefeated, weeklyBossRegionId, weeklyXpGrantedKey]);

  if (!visible && !weeklyEncounterOpen && !celebration) return null;

  const claimChest = () => {
    if (!todayCompleted || !claimDailyChest(today)) return;
    if (dailyChestXpGrantedDate !== today) {
      grantHeroExp(DAILY_CHEST_EXP);
      markDailyXpGranted(today);
    }

    if (auth.session) {
      void trackQuestEvent(auth.session, {
        eventType: "daily_reward_claimed",
        source: "retention",
        xpAwarded: DAILY_CHEST_EXP,
        metadata: { localDate: today, reward: "gear_fragment" }
      }).catch((error) => console.warn("GoalQuest daily reward analytics failed", error));
    }
  };

  const challengeWeeklyBoss = () => {
    if (!weeklyReady) return;
    const maxBossHp = Math.max(120, Math.round(weeklyRegion.boss.hp * 0.6));
    const playerResolve = Math.max(100, stats.maxHp + stats.level * 4);
    openWeeklyEncounter(maxBossHp, playerResolve);
    setOpen(false);

    if (auth.session) {
      void trackQuestEvent(auth.session, {
        eventType: "weekly_boss_started",
        source: "retention",
        regionId: weeklyRegion.id,
        metadata: { localDate: today, weekKey }
      }).catch((error) => console.warn("GoalQuest weekly encounter analytics failed", error));
    }
  };

  const attack = (action: WeeklyAction) => {
    weeklyAttack(action, stats.level, weeklyRegion.boss.difficulty, weeklyRegion.boss.name);
  };

  const retry = () => {
    retryWeeklyEncounter(
      Math.max(120, Math.round(weeklyRegion.boss.hp * 0.6)),
      Math.max(100, stats.maxHp + stats.level * 4)
    );
  };

  const forge = () => {
    if (!character || !nextGear) return;
    if (!forgeGear(character.id, nextGear.id)) return;

    if (auth.session) {
      void trackQuestEvent(auth.session, {
        eventType: "gear_forged",
        source: "retention",
        metadata: {
          localDate: today,
          itemId: nextGear.id,
          itemName: nextGear.name,
          fragmentsSpent: GEAR_FORGE_COST
        }
      }).catch((error) => console.warn("GoalQuest gear-forge analytics failed", error));
    }
  };

  const aerilSignal = dailyChestReady
    ? "Your reward is waiting. Claim what today's discipline earned."
    : weeklyReady
      ? `The weekly gate is open. ${weeklyRegion.boss.name} is waiting.`
      : weeklyBossDefeated
        ? "This week's guardian has fallen. Keep building the next version of yourself."
        : `${Math.max(0, WEEKLY_QUEST_GOAL - weeklyQuestProgress)} quests remain before the weekly gate opens.`;

  return (
    <>
      {visible ? (
        <div className={`retention-dock ${open ? "retention-dock--open" : ""}`}>
          <button
            type="button"
            className={`retention-dock-toggle ${dailyChestReady || weeklyReady ? "has-reward" : ""}`}
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label="Open journey rewards"
          >
            <span>🔥</span>
            <b>JOURNEY</b>
            {(dailyChestReady || weeklyReady) ? <i aria-hidden="true" /> : null}
          </button>

          {open ? (
            <aside className="retention-panel" aria-label="GoalQuest retention journey">
              <div className="retention-panel-heading">
                <div>
                  <small>THE FLAME</small>
                  <strong>{stats.dailyStreak} DAY STREAK</strong>
                </div>
                <span>🔥</span>
              </div>

              <div className="retention-aeril-signal">
                <span>🔮</span>
                <p><b>AERIL</b>{aerilSignal}</p>
              </div>

              <section className="retention-card retention-card--daily">
                <div className="retention-card-title">
                  <span>🎁 DAILY CHEST</span>
                  <em>{todayCompleted ? "READY" : `${stats.dailyTasksCompleted}/${stats.dailyTasksGoal}`}</em>
                </div>
                <p>{dailyChestReady ? "Today's goal is complete. Open the chest to turn consistency into progression." : dailyChestClaimedDate === today ? "Claimed today. Return tomorrow to keep the flame alive." : "Complete your Daily Quest Goal to unlock today's reward."}</p>
                {dailyChestReady ? <button type="button" onClick={claimChest}>OPEN CHEST</button> : null}
                {dailyChestClaimedDate === today ? <div className="retention-complete-line">✓ TODAY'S REWARD CLAIMED</div> : null}
              </section>

              <section className="retention-card retention-card--weekly">
                <div className="retention-card-title">
                  <span>⚔ WEEKLY EXPEDITION</span>
                  <em>{Math.min(weeklyQuestProgress, WEEKLY_QUEST_GOAL)}/{WEEKLY_QUEST_GOAL}</em>
                </div>
                <p>{weeklyBossDefeated ? `${weeklyRegion.boss.name} defeated this week.` : weeklyReady ? `${weeklyRegion.boss.name} has appeared. The gate is open.` : "Every real-life quest moves the expedition forward."}</p>
                <div className="retention-progress"><span style={{ width: `${weeklyPercent}%` }} /></div>
                {!weeklyBossDefeated && weeklyReady ? <button type="button" className="danger" onClick={challengeWeeklyBoss}>CHALLENGE {weeklyRegion.boss.name.toUpperCase()}</button> : null}
                {weeklyBossDefeated ? <div className="retention-complete-line">👑 WEEKLY GUARDIAN CLEARED</div> : null}
              </section>

              <section className="retention-card retention-card--gear">
                <div className="retention-card-title">
                  <span>◆ GEAR FORGE</span>
                  <em>{gearFragments}/{GEAR_FORGE_COST}</em>
                </div>
                <p>{nextGear ? `Collect ${GEAR_FORGE_COST} fragments to forge ${nextGear.name} early.` : "Your current class has forged every available gear reward."}</p>
                {nextGear && gearFragments >= GEAR_FORGE_COST ? <button type="button" onClick={forge}>FORGE {nextGear.name.toUpperCase()}</button> : null}
              </section>

              <div className="retention-next-milestone">
                <span>🔥 NEXT STREAK MILESTONE</span>
                <b>{nextMilestone ? `${nextMilestone} DAYS` : "LEGENDARY"}</b>
              </div>
            </aside>
          ) : null}
        </div>
      ) : null}

      {weeklyEncounterOpen ? (
        <div className="retention-modal-backdrop" role="dialog" aria-modal="true" aria-label="Weekly boss encounter">
          <div
            className="retention-weekly-arena"
            style={{ backgroundImage: `linear-gradient(rgba(4,7,12,.38), rgba(4,7,12,.82)), url("${publicAssetPath(goalQuestAssets.acts[weeklyRegion.id])}")` }}
          >
            <div className="retention-arena-header">
              <small>WEEKLY EXPEDITION · GUARDIAN ENCOUNTER</small>
              <h2>{weeklyRegion.boss.name}</h2>
              <p>{weeklyRegion.name}</p>
            </div>

            <div className="retention-battle-stage">
              <div className="retention-boss-wrap">
                <BossSprite regionId={weeklyRegion.id} className="retention-weekly-boss-sprite" />
              </div>
              <div className="retention-battle-bars">
                <div><span>BOSS</span><div><i style={{ width: `${percent(weeklyBossHp, weeklyBossMaxHp)}%` }} /></div><b>{weeklyBossHp}/{weeklyBossMaxHp}</b></div>
                <div><span>RESOLVE</span><div><i className="resolve" style={{ width: `${percent(weeklyPlayerResolve, weeklyPlayerMaxResolve)}%` }} /></div><b>{weeklyPlayerResolve}/{weeklyPlayerMaxResolve}</b></div>
              </div>
            </div>

            {weeklyEncounterOutcome === "active" ? (
              <div className="retention-battle-actions">
                {(["focus", "guard", "burst"] as WeeklyAction[]).map((action) => (
                  <button key={action} type="button" onClick={() => attack(action)} disabled={action === "burst" && weeklyBurstUsed}>
                    {encounterActionLabel[action]}
                    <small>{action === "focus" ? "Balanced damage" : action === "guard" ? "Lower damage · reduce counter" : weeklyBurstUsed ? "USED" : "High damage · once per fight"}</small>
                  </button>
                ))}
              </div>
            ) : weeklyEncounterOutcome === "defeat" ? (
              <div className="retention-encounter-result defeat">
                <h3>THE GUARDIAN HOLDS</h3>
                <p>No streak lost. No progress removed. Adjust and try again.</p>
                <button type="button" onClick={retry}>TRY AGAIN</button>
                <button type="button" className="secondary" onClick={closeWeeklyEncounter}>LEAVE ARENA</button>
              </div>
            ) : (
              <div className="retention-encounter-result victory">
                <h3>WEEKLY GUARDIAN DEFEATED</h3>
                <p>+3 Gear Fragments · +150 XP</p>
                <button type="button" onClick={closeWeeklyEncounter}>CLAIM VICTORY</button>
              </div>
            )}

            <div className="retention-battle-log">
              {weeklyEncounterLog.slice(-3).map((entry, index) => <p key={`${entry}-${index}`}>{entry}</p>)}
            </div>
          </div>
        </div>
      ) : null}

      {celebration && !weeklyEncounterOpen ? (
        <div className="retention-celebration-backdrop" role="dialog" aria-modal="true" aria-label={celebration.title}>
          <div className={`retention-celebration retention-celebration--${celebration.kind}`}>
            <div className="retention-celebration-rune">✦</div>
            <small>PROGRESS RECORDED</small>
            <h2>{celebration.title}</h2>
            <p>{celebration.subtitle}</p>
            <strong>{celebration.reward}</strong>
            <button type="button" onClick={dismissCelebration}>CONTINUE</button>
          </div>
        </div>
      ) : null}
    </>
  );
}
