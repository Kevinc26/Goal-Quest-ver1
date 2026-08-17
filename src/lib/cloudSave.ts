import { characterById } from "../game/data";
import { useGoalQuestStore } from "../stores/goalQuestStore";
import { supabaseFetch, type SupabaseSession } from "./supabaseClient";

type CloudState = {
  screen?: string;
  currentRegion?: number | null;
  stats?: unknown;
  unlockedRegions?: number[];
  completedMissions?: Record<number, boolean[]>;
  defeatedBosses?: number[];
  availableDailyMissions?: unknown[];
  completedDailyMissionIds?: string[];
  dailyMissionDate?: string | null;
  todayCompleted?: boolean;
  lastPlayedDate?: string | null;
  lastLoginDate?: string | null;
  corruptionLevel?: number;
};

type CloudSaveRow = {
  user_id: string;
  selected_character_id: number | null;
  save_version: number;
  revision: number;
  state: CloudState;
  equipment: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

const LOCAL_OWNER_KEY = "goalquest_local_owner_v1";
const GEAR_PREFIX = "goalquest_gear_v1_";

const collectEquipment = () => {
  if (typeof window === "undefined") {
    return {};
  }

  const result: Record<string, unknown> = {};
  for (let characterId = 1; characterId <= 8; characterId += 1) {
    const raw = window.localStorage.getItem(`${GEAR_PREFIX}${characterId}`);
    if (!raw) {
      continue;
    }

    try {
      const parsed = JSON.parse(raw) as unknown;
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        result[String(characterId)] = parsed;
      }
    } catch {
      // Ignore malformed legacy equipment data.
    }
  }

  return result;
};

const restoreEquipment = (equipment: Record<string, unknown> | null | undefined) => {
  if (typeof window === "undefined") {
    return;
  }

  const source = equipment ?? {};
  for (let characterId = 1; characterId <= 8; characterId += 1) {
    const key = `${GEAR_PREFIX}${characterId}`;
    window.localStorage.removeItem(key);

    const value = source[String(characterId)];
    if (value && typeof value === "object" && !Array.isArray(value)) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }

  window.dispatchEvent(new CustomEvent("goalquest:equipment-restored"));
};

const buildDurableState = () => {
  const state = useGoalQuestStore.getState();

  return {
    screen: "start",
    currentRegion: state.currentRegion,
    stats: state.stats,
    unlockedRegions: state.unlockedRegions,
    completedMissions: state.completedMissions,
    defeatedBosses: state.defeatedBosses,
    availableDailyMissions: state.availableDailyMissions,
    completedDailyMissionIds: state.completedDailyMissionIds,
    dailyMissionDate: state.dailyMissionDate,
    todayCompleted: state.todayCompleted,
    lastPlayedDate: state.lastPlayedDate,
    lastLoginDate: state.lastLoginDate,
    corruptionLevel: state.corruptionLevel
  };
};

const buildSavePayload = (session: SupabaseSession) => {
  const state = useGoalQuestStore.getState();

  return {
    user_id: session.user.id,
    selected_character_id: state.character?.id ?? null,
    save_version: 1,
    state: buildDurableState(),
    equipment: collectEquipment()
  };
};

export const fetchGoalQuestCloudSave = async (session: SupabaseSession) => {
  const query = new URLSearchParams({
    select: "user_id,selected_character_id,save_version,revision,state,equipment,created_at,updated_at",
    user_id: `eq.${session.user.id}`,
    limit: "1"
  });

  const rows = await supabaseFetch<CloudSaveRow[]>(`/rest/v1/player_saves?${query.toString()}`, {
    method: "GET",
    accessToken: session.access_token
  });

  return rows[0] ?? null;
};

export const saveGoalQuestCloud = async (session: SupabaseSession) => {
  const payload = buildSavePayload(session);
  await supabaseFetch("/rest/v1/player_saves?on_conflict=user_id", {
    method: "POST",
    accessToken: session.access_token,
    headers: {
      Prefer: "resolution=merge-duplicates,return=minimal"
    },
    body: JSON.stringify(payload)
  });
};

const cloudHasProgress = (row: CloudSaveRow) => {
  const stats = row.state?.stats as { exp?: number; totalTasksCompleted?: number } | undefined;
  return Boolean(
    row.selected_character_id ||
      row.revision > 0 ||
      (stats?.exp ?? 0) > 0 ||
      (stats?.totalTasksCompleted ?? 0) > 0 ||
      (row.state?.defeatedBosses?.length ?? 0) > 0
  );
};

const localHasProgress = () => {
  const state = useGoalQuestStore.getState();
  return Boolean(
    state.character ||
      state.stats.exp > 0 ||
      state.stats.totalTasksCompleted > 0 ||
      state.defeatedBosses.length > 0 ||
      Object.keys(state.completedMissions).length > 0
  );
};

const hydrateStoreFromCloud = (row: CloudSaveRow) => {
  const cloud = row.state ?? {};
  const character = row.selected_character_id ? characterById(row.selected_character_id) ?? null : null;

  useGoalQuestStore.setState((current) => ({
    ...current,
    screen: "start",
    currentRegion: typeof cloud.currentRegion === "number" ? cloud.currentRegion : null,
    character,
    stats: cloud.stats && typeof cloud.stats === "object" ? { ...current.stats, ...(cloud.stats as object) } : current.stats,
    unlockedRegions: Array.isArray(cloud.unlockedRegions) ? cloud.unlockedRegions : current.unlockedRegions,
    completedMissions:
      cloud.completedMissions && typeof cloud.completedMissions === "object"
        ? cloud.completedMissions
        : current.completedMissions,
    defeatedBosses: Array.isArray(cloud.defeatedBosses) ? cloud.defeatedBosses : current.defeatedBosses,
    availableDailyMissions: Array.isArray(cloud.availableDailyMissions)
      ? (cloud.availableDailyMissions as typeof current.availableDailyMissions)
      : current.availableDailyMissions,
    completedDailyMissionIds: Array.isArray(cloud.completedDailyMissionIds)
      ? cloud.completedDailyMissionIds
      : current.completedDailyMissionIds,
    dailyMissionDate: typeof cloud.dailyMissionDate === "string" ? cloud.dailyMissionDate : null,
    currentTask: null,
    taskTimerPaused: false,
    currentCombat: null,
    todayCompleted: Boolean(cloud.todayCompleted),
    lastPlayedDate: typeof cloud.lastPlayedDate === "string" ? cloud.lastPlayedDate : null,
    lastLoginDate: typeof cloud.lastLoginDate === "string" ? cloud.lastLoginDate : null,
    corruptionLevel: typeof cloud.corruptionLevel === "number" ? cloud.corruptionLevel : 0
  }));

  restoreEquipment(row.equipment);
};

export const bootstrapGoalQuestCloud = async (session: SupabaseSession) => {
  const row = await fetchGoalQuestCloudSave(session);
  const localOwner = typeof window !== "undefined" ? window.localStorage.getItem(LOCAL_OWNER_KEY) : null;
  const canMigrateLocal = !localOwner || localOwner === session.user.id;

  if (row && cloudHasProgress(row)) {
    hydrateStoreFromCloud(row);
  } else if (localHasProgress() && canMigrateLocal) {
    // First account on a legacy/local-only GoalQuest browser: preserve the existing hero.
    await saveGoalQuestCloud(session);
  } else if (row) {
    // A fresh or different account gets its own blank cloud state, never another user's local save.
    hydrateStoreFromCloud(row);
  } else if (!canMigrateLocal) {
    useGoalQuestStore.getState().resetGame();
    restoreEquipment({});
  }

  if (typeof window !== "undefined") {
    window.localStorage.setItem(LOCAL_OWNER_KEY, session.user.id);
  }

  // Re-run date/streak refresh after hydrating a remote save.
  useGoalQuestStore.getState().initGame();
  await saveGoalQuestCloud(session);
};

export const startGoalQuestCloudSync = (session: SupabaseSession) => {
  let timeoutId: number | null = null;
  let disposed = false;
  let lastSavedSnapshot = JSON.stringify(buildSavePayload(session));
  let lastObservedSnapshot = lastSavedSnapshot;

  const flush = async () => {
    if (disposed) {
      return;
    }

    const nextSnapshot = JSON.stringify(buildSavePayload(session));
    lastObservedSnapshot = nextSnapshot;
    if (nextSnapshot === lastSavedSnapshot) {
      return;
    }

    try {
      await saveGoalQuestCloud(session);
      lastSavedSnapshot = nextSnapshot;
    } catch (error) {
      console.error("GoalQuest cloud save failed", error);
    }
  };

  const schedule = () => {
    if (timeoutId !== null) {
      window.clearTimeout(timeoutId);
    }
    timeoutId = window.setTimeout(() => {
      timeoutId = null;
      void flush();
    }, 900);
  };

  const handleStoreChange = () => {
    const nextSnapshot = JSON.stringify(buildSavePayload(session));
    if (nextSnapshot === lastObservedSnapshot) {
      return;
    }
    lastObservedSnapshot = nextSnapshot;
    schedule();
  };

  const unsubscribe = useGoalQuestStore.subscribe(handleStoreChange);
  const equipmentChanged = () => {
    lastObservedSnapshot = JSON.stringify(buildSavePayload(session));
    schedule();
  };
  const visibilityChanged = () => {
    if (document.visibilityState === "hidden") {
      void flush();
    }
  };

  window.addEventListener("goalquest:equipment-changed", equipmentChanged);
  document.addEventListener("visibilitychange", visibilityChanged);

  return () => {
    disposed = true;
    unsubscribe();
    if (timeoutId !== null) {
      window.clearTimeout(timeoutId);
    }
    window.removeEventListener("goalquest:equipment-changed", equipmentChanged);
    document.removeEventListener("visibilitychange", visibilityChanged);
  };
};
