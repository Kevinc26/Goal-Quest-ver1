import { useEffect } from "react";

import {
  calculateVerifiedStreak,
  fetchDailyGoalCompletionDates,
  localDateKey,
  trackQuestEvent,
  type QuestEventInput
} from "../../../lib/questEvents";
import type { SupabaseSession } from "../../../lib/supabaseClient";
import { useGoalQuestStore } from "../../../stores/goalQuestStore";

type RetentionTelemetryProps = {
  enabled: boolean;
  session: SupabaseSession | null;
};

const DAILY_GOAL_DATES_PREFIX = "goalquest_verified_daily_goal_dates_v1_";
const APP_OPEN_PREFIX = "goalquest_app_open_v1_";

const readDailyGoalDates = (accountKey: string) => {
  if (typeof window === "undefined") return [] as string[];
  const raw = window.localStorage.getItem(`${DAILY_GOAL_DATES_PREFIX}${accountKey}`);
  if (!raw) return [] as string[];

  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((value): value is string => typeof value === "string") : [];
  } catch {
    return [] as string[];
  }
};

const writeDailyGoalDates = (accountKey: string, dates: string[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(`${DAILY_GOAL_DATES_PREFIX}${accountKey}`, JSON.stringify([...new Set(dates)]));
};

export default function RetentionTelemetry({ enabled, session }: RetentionTelemetryProps) {
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    let active = true;
    const accountKey = session?.user.id ?? "local";
    const today = localDateKey();
    let verifiedDates = readDailyGoalDates(accountKey);

    const applyVerifiedStreak = () => {
      const verifiedStreak = calculateVerifiedStreak(verifiedDates, localDateKey());
      const current = useGoalQuestStore.getState();
      if (current.stats.dailyStreak !== verifiedStreak) {
        useGoalQuestStore.setState({
          stats: { ...current.stats, dailyStreak: verifiedStreak }
        });
      }
    };

    const rememberDailyGoal = (dateKey: string) => {
      if (!verifiedDates.includes(dateKey)) {
        verifiedDates = [...verifiedDates, dateKey];
        writeDailyGoalDates(accountKey, verifiedDates);
      }
      applyVerifiedStreak();
    };

    const emit = (event: QuestEventInput) => {
      if (!session) return;
      void trackQuestEvent(session, event).catch((error) => {
        console.warn("GoalQuest analytics event failed", error);
      });
    };

    const currentState = useGoalQuestStore.getState();
    if (currentState.todayCompleted) {
      // Migrates an already-completed beta day into the verified streak model.
      rememberDailyGoal(today);
    } else {
      applyVerifiedStreak();
    }

    if (session) {
      const appOpenKey = `${APP_OPEN_PREFIX}${session.user.id}_${today}`;
      if (window.localStorage.getItem(appOpenKey) !== "true") {
        void trackQuestEvent(session, {
          eventType: "app_open",
          source: "system",
          metadata: { localDate: today, path: window.location.pathname }
        })
          .then(() => window.localStorage.setItem(appOpenKey, "true"))
          .catch((error) => console.warn("GoalQuest app-open analytics failed", error));
      }

      void fetchDailyGoalCompletionDates(session)
        .then((remoteDates) => {
          if (!active) return;
          verifiedDates = [...new Set([...verifiedDates, ...remoteDates])];
          writeDailyGoalDates(accountKey, verifiedDates);
          applyVerifiedStreak();
        })
        .catch((error) => console.warn("GoalQuest streak reconciliation failed", error));
    }

    const unsubscribe = useGoalQuestStore.subscribe((next, previous) => {
      const eventDate = localDateKey();

      if (!previous.currentTask && next.currentTask) {
        emit({
          eventType: "quest_started",
          source: next.currentTask.type,
          missionId: next.currentTask.missionId ?? null,
          regionId: next.currentTask.regionId ?? null,
          missionIndex: next.currentTask.missionIndex ?? null,
          metadata: {
            localDate: eventDate,
            missionType: next.currentTask.missionType,
            custom: Boolean(next.currentTask.missionId?.startsWith("custom-"))
          }
        });
      }

      const previousDaily = new Set(previous.completedDailyMissionIds);
      next.completedDailyMissionIds
        .filter((missionId) => !previousDaily.has(missionId))
        .forEach((missionId) => {
          emit({
            eventType: "quest_completed",
            source: "daily",
            missionId,
            xpAwarded: 25,
            metadata: { localDate: eventDate, custom: missionId.startsWith("custom-") }
          });
        });

      for (let regionId = 1; regionId <= 8; regionId += 1) {
        const before = previous.completedMissions[regionId] ?? [];
        const after = next.completedMissions[regionId] ?? [];
        for (let missionIndex = 0; missionIndex < 7; missionIndex += 1) {
          if (!before[missionIndex] && after[missionIndex]) {
            emit({
              eventType: "quest_completed",
              source: "region",
              missionId: `region-${regionId}-day-${missionIndex + 1}`,
              regionId,
              missionIndex,
              xpAwarded: 25,
              metadata: { localDate: eventDate }
            });
          }
        }
      }

      if (!previous.currentCombat && next.currentCombat) {
        emit({
          eventType: "boss_started",
          source: "boss",
          regionId: next.currentCombat.regionId,
          metadata: { localDate: eventDate }
        });
      }

      const previousBosses = new Set(previous.defeatedBosses);
      next.defeatedBosses
        .filter((regionId) => !previousBosses.has(regionId))
        .forEach((regionId) => {
          emit({
            eventType: "boss_defeated",
            source: "boss",
            regionId,
            xpAwarded: 100 * regionId,
            metadata: { localDate: eventDate }
          });
        });

      if (!previous.todayCompleted && next.todayCompleted) {
        rememberDailyGoal(eventDate);
        emit({
          eventType: "daily_goal_completed",
          source: "system",
          xpAwarded: 50,
          metadata: {
            localDate: eventDate,
            dailyGoal: next.stats.dailyTasksGoal,
            verifiedStreak: calculateVerifiedStreak(verifiedDates, eventDate)
          }
        });
      } else {
        // The legacy store used to increment streak merely for opening the app.
        // Re-apply the verified value after any state transition so that old
        // saves cannot inflate streaks before the migration is complete.
        applyVerifiedStreak();
      }
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, [enabled, session?.access_token, session?.user.id]);

  return null;
}
