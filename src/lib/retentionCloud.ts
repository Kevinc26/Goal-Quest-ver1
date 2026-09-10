import { useGoalQuestStore } from "../stores/goalQuestStore";
import { getRetentionDurableState, useRetentionStore, type RetentionDurableState } from "../stores/retentionStore";
import { supabaseFetch, type SupabaseSession } from "./supabaseClient";

type RetentionProgressRow = {
  user_id: string;
  state: Partial<RetentionDurableState> | null;
  updated_at: string;
};

const RETENTION_OWNER_KEY = "goalquest_retention_owner_v1";

const blankRetentionState = (): RetentionDurableState => ({
  weekKey: null,
  weeklyBaselineTasks: useGoalQuestStore.getState().stats.totalTasksCompleted,
  weeklyQuestProgress: 0,
  weeklyBossRegionId: 1,
  weeklyBossDefeated: false,
  dailyChestClaimedDate: null,
  dailyChestXpGrantedDate: null,
  weeklyXpGrantedKey: null,
  gearFragments: 0,
  bonusGearUnlocks: {},
  claimedStreakMilestones: []
});

const hasRetentionProgress = (state: Partial<RetentionDurableState> | null | undefined) =>
  Boolean(
    state &&
      ((state.gearFragments ?? 0) > 0 ||
        (state.weeklyQuestProgress ?? 0) > 0 ||
        state.weeklyBossDefeated ||
        state.dailyChestClaimedDate ||
        (state.claimedStreakMilestones?.length ?? 0) > 0 ||
        Object.values(state.bonusGearUnlocks ?? {}).some((items) => items.length > 0))
  );

export const fetchRetentionCloud = async (session: SupabaseSession) => {
  const query = new URLSearchParams({
    select: "user_id,state,updated_at",
    user_id: `eq.${session.user.id}`,
    limit: "1"
  });

  const rows = await supabaseFetch<RetentionProgressRow[]>(`/rest/v1/retention_progress?${query.toString()}`, {
    method: "GET",
    accessToken: session.access_token
  });

  return rows[0] ?? null;
};

export const saveRetentionCloud = async (session: SupabaseSession) => {
  await supabaseFetch("/rest/v1/retention_progress?on_conflict=user_id", {
    method: "POST",
    accessToken: session.access_token,
    headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify({
      user_id: session.user.id,
      state: getRetentionDurableState(),
      updated_at: new Date().toISOString()
    })
  });
};

export const bootstrapRetentionCloud = async (session: SupabaseSession) => {
  const row = await fetchRetentionCloud(session);
  const localOwner = typeof window !== "undefined" ? window.localStorage.getItem(RETENTION_OWNER_KEY) : null;
  const canMigrateLocal = !localOwner || localOwner === session.user.id;

  if (row && hasRetentionProgress(row.state)) {
    useRetentionStore.getState().hydrateDurableState(row.state ?? {});
  } else if (!canMigrateLocal) {
    useRetentionStore.getState().hydrateDurableState(blankRetentionState());
    await saveRetentionCloud(session);
  } else {
    await saveRetentionCloud(session);
  }

  if (typeof window !== "undefined") {
    window.localStorage.setItem(RETENTION_OWNER_KEY, session.user.id);
  }

  useRetentionStore.getState().ensureWeek(useGoalQuestStore.getState().stats.totalTasksCompleted);
};

export const startRetentionCloudSync = (session: SupabaseSession) => {
  let timeoutId: number | null = null;
  let disposed = false;
  let lastSavedSnapshot = JSON.stringify(getRetentionDurableState());

  const flush = async () => {
    if (disposed) return;
    const snapshot = JSON.stringify(getRetentionDurableState());
    if (snapshot === lastSavedSnapshot) return;

    try {
      await saveRetentionCloud(session);
      lastSavedSnapshot = snapshot;
    } catch (error) {
      console.error("GoalQuest retention sync failed", error);
    }
  };

  const unsubscribe = useRetentionStore.subscribe(() => {
    const snapshot = JSON.stringify(getRetentionDurableState());
    if (snapshot === lastSavedSnapshot) return;
    if (timeoutId !== null) window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      timeoutId = null;
      void flush();
    }, 900);
  });

  const visibilityChanged = () => {
    if (document.visibilityState === "hidden") void flush();
  };
  document.addEventListener("visibilitychange", visibilityChanged);

  return () => {
    disposed = true;
    unsubscribe();
    if (timeoutId !== null) window.clearTimeout(timeoutId);
    document.removeEventListener("visibilitychange", visibilityChanged);
  };
};
