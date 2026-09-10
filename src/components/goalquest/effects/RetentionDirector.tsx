import { useEffect } from "react";

import { localRetentionDateKey } from "../../../game/retention";
import { bootstrapRetentionCloud, startRetentionCloudSync } from "../../../lib/retentionCloud";
import { trackQuestEvent } from "../../../lib/questEvents";
import type { SupabaseSession } from "../../../lib/supabaseClient";
import { useGoalQuestStore } from "../../../stores/goalQuestStore";
import { useRetentionStore } from "../../../stores/retentionStore";

type RetentionDirectorProps = {
  enabled: boolean;
  session: SupabaseSession | null;
};

export default function RetentionDirector({ enabled, session }: RetentionDirectorProps) {
  const totalTasksCompleted = useGoalQuestStore((state) => state.stats.totalTasksCompleted);
  const dailyStreak = useGoalQuestStore((state) => state.stats.dailyStreak);
  const ensureWeek = useRetentionStore((state) => state.ensureWeek);
  const updateWeeklyProgress = useRetentionStore((state) => state.updateWeeklyProgress);
  const claimEligibleStreakMilestones = useRetentionStore((state) => state.claimEligibleStreakMilestones);

  useEffect(() => {
    if (!enabled) return;
    ensureWeek(totalTasksCompleted);
    updateWeeklyProgress(totalTasksCompleted);
  }, [enabled, ensureWeek, totalTasksCompleted, updateWeeklyProgress]);

  useEffect(() => {
    if (!enabled || dailyStreak <= 0) return;
    const unlocked = claimEligibleStreakMilestones(dailyStreak);
    if (!session || !unlocked.length) return;

    unlocked.forEach((milestone) => {
      void trackQuestEvent(session, {
        eventType: "streak_milestone",
        source: "retention",
        metadata: {
          localDate: localRetentionDateKey(),
          milestone
        }
      }).catch((error) => console.warn("GoalQuest streak analytics failed", error));
    });
  }, [claimEligibleStreakMilestones, dailyStreak, enabled, session?.access_token]);

  useEffect(() => {
    if (!enabled || !session) return;

    let active = true;
    let stopSync: (() => void) | null = null;

    void bootstrapRetentionCloud(session)
      .then(() => {
        if (!active) return;
        stopSync = startRetentionCloudSync(session);
      })
      .catch((error) => console.error("GoalQuest retention bootstrap failed", error));

    return () => {
      active = false;
      stopSync?.();
    };
  }, [enabled, session?.access_token, session?.user.id]);

  return null;
}
