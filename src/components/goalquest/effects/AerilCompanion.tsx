import React, { useEffect, useMemo, useState } from "react";

import { goalQuestRegions, useGoalQuestStore } from "../../../stores/goalQuestStore";
import { publicAssetPath } from "../utils";

const MESSAGE_VISIBLE_MS = 4200;

const BORDER_BY_LEVEL: Record<number, string> = {
  0: "#4dff91",
  1: "#b388ff",
  2: "#aa00ff",
  3: "#ff00ff"
};

export default function AerilCompanion() {
  const screen = useGoalQuestStore((state) => state.screen);
  const currentRegion = useGoalQuestStore((state) => state.currentRegion);
  const character = useGoalQuestStore((state) => state.character);
  const stats = useGoalQuestStore((state) => state.stats);
  const unlockedRegions = useGoalQuestStore((state) => state.unlockedRegions);
  const completedMissions = useGoalQuestStore((state) => state.completedMissions);
  const defeatedBosses = useGoalQuestStore((state) => state.defeatedBosses);
  const currentCombat = useGoalQuestStore((state) => state.currentCombat);
  const corruptionLevel = useGoalQuestStore((state) => state.corruptionLevel);
  const getNextAvailableMission = useGoalQuestStore((state) => state.getNextAvailableMission);

  const [messageVisible, setMessageVisible] = useState(true);
  const [glitch, setGlitch] = useState(false);
  const [imgError, setImgError] = useState(false);

  const dailyRemaining = Math.max(0, stats.dailyTasksGoal - stats.dailyTasksCompleted);
  const regionDoneToday = stats.lastRegionMissionDate === new Date().toDateString();

  const guidance = useMemo(() => {
    const regionComplete = (regionId: number) => {
      const quests = completedMissions[regionId] ?? [];
      return quests.length === 7 && quests.every(Boolean);
    };

    const bossDefeated = (regionId: number) => defeatedBosses.includes(regionId);
    const currentRegionData = currentRegion ? goalQuestRegions.find((region) => region.id === currentRegion) : undefined;
    const bossRegion = currentCombat ? goalQuestRegions.find((region) => region.id === currentCombat.regionId) : currentRegionData;
    const bossReadyRegion = goalQuestRegions.find(
      (region) => unlockedRegions.includes(region.id) && regionComplete(region.id) && !bossDefeated(region.id)
    );
    const recommendedRegion = [...goalQuestRegions]
      .reverse()
      .find((region) => unlockedRegions.includes(region.id) && !regionComplete(region.id) && !bossDefeated(region.id));

    if (!character) {
      return {
        message: "Your path has not been chosen yet.",
        detail: "Choose the class that represents the person you want to become."
      };
    }

    if (screen === "daily") {
      if (dailyRemaining <= 0) {
        return {
          message: "Your daily quest goal is complete.",
          detail: "Return to the world and advance your region quest."
        };
      }

      return {
        message: `Complete ${dailyRemaining} more daily quest${dailyRemaining === 1 ? "" : "s"}.`,
        detail: "Choose a suggested quest or forge one of your own."
      };
    }

    if (screen === "region") {
      if (!currentRegionData) {
        return {
          message: "The path here is unclear.",
          detail: "Return to the world map and choose an unlocked region."
        };
      }

      if (bossDefeated(currentRegionData.id)) {
        return {
          message: `${currentRegionData.name} is complete.`,
          detail: "Return to the world map and continue into the next unlocked region."
        };
      }

      if (regionComplete(currentRegionData.id)) {
        return {
          message: `${currentRegionData.boss.name} is waiting.`,
          detail: "All 7 region quests are complete. Challenge the boss."
        };
      }

      const nextQuest = getNextAvailableMission(currentRegionData.id);
      if (regionDoneToday) {
        return {
          message: "You already advanced this region today.",
          detail: nextQuest >= 0 ? `Return tomorrow for Day ${nextQuest + 1}.` : "Return tomorrow to continue your journey."
        };
      }

      if (nextQuest >= 0) {
        return {
          message: `Day ${nextQuest + 1} is your next quest.`,
          detail: currentRegionData.missions[nextQuest] ?? "Complete the highlighted region quest."
        };
      }
    }

    if (screen === "combat") {
      return {
        message: bossRegion ? `Face ${bossRegion.boss.name}.` : "The battle has begun.",
        detail: "Stay focused. Your progress brought you here."
      };
    }

    if (screen === "rest") {
      return {
        message: "Recovery is part of progress.",
        detail: "Rest, restore your strength, then return to your path."
      };
    }

    if (screen === "achievements") {
      return {
        message: "Look how far you have come.",
        detail: "Every completed quest is proof that you kept moving."
      };
    }

    if (screen === "settings") {
      return {
        message: "Shape the journey to fit you.",
        detail: "Set a daily quest goal you can sustain consistently."
      };
    }

    if (screen === "characters") {
      return {
        message: "Choose the identity you want to build.",
        detail: "Your class defines the path you will carry into the world."
      };
    }

    if (screen === "world") {
      if (dailyRemaining > 0) {
        return corruptionLevel > 0
          ? {
              message: "The system needs attention.",
              detail: `Complete ${dailyRemaining} more daily quest${dailyRemaining === 1 ? "" : "s"} to stabilize your path.`
            }
          : {
              message: "Your daily quests are waiting.",
              detail: `Complete ${dailyRemaining} more to reach today's quest goal.`
            };
      }

      if (bossReadyRegion) {
        return {
          message: `${bossReadyRegion.boss.name} is waiting.`,
          detail: `You completed all 7 quests in ${bossReadyRegion.name}. Challenge the boss.`
        };
      }

      if (regionDoneToday) {
        return {
          message: "Today's path is complete.",
          detail: "Your daily goal and region quest are done. Return tomorrow to continue."
        };
      }

      if (recommendedRegion) {
        const nextQuest = getNextAvailableMission(recommendedRegion.id);
        return {
          message: `Advance ${recommendedRegion.name}.`,
          detail: nextQuest >= 0 ? `Enter the region and complete Day ${nextQuest + 1}.` : "Enter the region to continue your journey."
        };
      }

      return {
        message: "Every available region is clear.",
        detail: "Keep your daily streak alive and review what you have achieved."
      };
    }

    if (screen === "start") {
      if (dailyRemaining > 0) {
        return corruptionLevel > 0
          ? {
              message: "The system needs attention.",
              detail: `Complete ${dailyRemaining} more daily quest${dailyRemaining === 1 ? "" : "s"} today.`
            }
          : {
              message: "Your daily quests are waiting.",
              detail: `Complete ${dailyRemaining} more to reach today's quest goal.`
            };
      }

      if (!regionDoneToday) {
        return {
          message: "Your daily goal is complete.",
          detail: "Enter the world and advance today's region quest."
        };
      }

      return {
        message: "Today's path is complete.",
        detail: "You kept your promise to yourself. Return tomorrow for the next step."
      };
    }

    if (corruptionLevel >= 3) {
      return { message: "We are losing stability.", detail: "Complete a quest and reconnect with your journey." };
    }

    if (corruptionLevel === 2) {
      return { message: "The corruption is seeping through.", detail: "Return to your path before the signal weakens." };
    }

    if (corruptionLevel === 1) {
      return { message: "The system needs attention.", detail: "Complete a quest to stabilize the portal." };
    }

    return { message: "The portal is stable.", detail: "Keep moving with intention." };
  }, [
    character,
    completedMissions,
    corruptionLevel,
    currentCombat,
    currentRegion,
    dailyRemaining,
    defeatedBosses,
    getNextAvailableMission,
    regionDoneToday,
    screen,
    unlockedRegions
  ]);

  useEffect(() => {
    setMessageVisible(true);
    const timeout = window.setTimeout(() => setMessageVisible(false), MESSAGE_VISIBLE_MS);
    return () => window.clearTimeout(timeout);
  }, [screen, guidance.message, guidance.detail]);

  useEffect(() => {
    if (corruptionLevel < 2) {
      setGlitch(false);
      return;
    }

    const interval = window.setInterval(() => {
      if (Math.random() < 0.5) {
        setGlitch(true);
        window.setTimeout(() => setGlitch(false), 130);
      }
    }, 9000);

    return () => {
      window.clearInterval(interval);
    };
  }, [corruptionLevel]);

  return (
    <>
      <div
        className={`aeril-guardian ${corruptionLevel > 0 ? `corrupt-${corruptionLevel}` : ""} ${glitch ? "glitch" : ""}`}
        aria-hidden="true"
      >
        {!imgError ? (
          <img
            src={publicAssetPath("/assets/classes/Aerial.png")}
            alt="Aeril"
            className="aeril-sprite"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="aeril-sprite" style={{ fontSize: "56px", lineHeight: "1" }}>
            🔮
          </div>
        )}
      </div>

      {messageVisible ? (
        <div
          className="aeril-message"
          style={{ borderLeftColor: BORDER_BY_LEVEL[corruptionLevel] }}
          role="status"
          aria-live="polite"
        >
          🔮 Aeril: "{guidance.message}"
          <div style={{ marginTop: "8px", color: "var(--text-muted)", fontSize: "10px", lineHeight: 1.6 }}>
            {guidance.detail}
          </div>
        </div>
      ) : null}
    </>
  );
}
