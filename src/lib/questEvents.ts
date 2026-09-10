import { supabaseFetch, type SupabaseSession } from "./supabaseClient";

export type QuestEventSource = "daily" | "region" | "boss" | "system";

export type QuestEventInput = {
  eventType: string;
  source: QuestEventSource;
  missionId?: string | null;
  regionId?: number | null;
  missionIndex?: number | null;
  xpAwarded?: number;
  metadata?: Record<string, unknown>;
};

type DailyGoalEventRow = {
  completed_at: string;
  metadata: Record<string, unknown> | null;
};

export const localDateKey = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const dateKeyValue = (value: string) => {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return Number.NaN;
  return Date.UTC(year, month - 1, day);
};

const dayDiff = (newer: string, older: string) => {
  const newerValue = dateKeyValue(newer);
  const olderValue = dateKeyValue(older);
  if (!Number.isFinite(newerValue) || !Number.isFinite(olderValue)) return Number.POSITIVE_INFINITY;
  return Math.round((newerValue - olderValue) / 86_400_000);
};

export const calculateVerifiedStreak = (dateKeys: string[], today = localDateKey()) => {
  const uniqueDates = [...new Set(dateKeys)]
    .filter((value) => Number.isFinite(dateKeyValue(value)))
    .sort((a, b) => dateKeyValue(b) - dateKeyValue(a));

  if (!uniqueDates.length) return 0;

  const latest = uniqueDates[0];
  const daysSinceLatest = dayDiff(today, latest);
  if (daysSinceLatest < 0 || daysSinceLatest > 1) return 0;

  let streak = 1;
  for (let index = 1; index < uniqueDates.length; index += 1) {
    if (dayDiff(uniqueDates[index - 1], uniqueDates[index]) !== 1) break;
    streak += 1;
  }

  return streak;
};

export const trackQuestEvent = async (session: SupabaseSession, event: QuestEventInput) => {
  await supabaseFetch("/rest/v1/quest_events", {
    method: "POST",
    accessToken: session.access_token,
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({
      user_id: session.user.id,
      event_type: event.eventType,
      source: event.source,
      mission_id: event.missionId ?? null,
      region_id: event.regionId ?? null,
      mission_index: event.missionIndex ?? null,
      xp_awarded: event.xpAwarded ?? 0,
      metadata: event.metadata ?? {}
    })
  });
};

export const fetchDailyGoalCompletionDates = async (session: SupabaseSession) => {
  const query = new URLSearchParams({
    select: "completed_at,metadata",
    user_id: `eq.${session.user.id}`,
    event_type: "eq.daily_goal_completed",
    order: "completed_at.desc",
    limit: "120"
  });

  const rows = await supabaseFetch<DailyGoalEventRow[]>(`/rest/v1/quest_events?${query.toString()}`, {
    method: "GET",
    accessToken: session.access_token
  });

  return rows.map((row) => {
    const metadataDate = row.metadata?.localDate;
    if (typeof metadataDate === "string") return metadataDate;
    return localDateKey(new Date(row.completed_at));
  });
};
